;(function ($) {
  function isRightClick (e) {
    var WHICH_RIGHT_CLICK = 3
    var BUTTON_RIGHT_CLICK = 2
    e = e || window.event
    return e.which === WHICH_RIGHT_CLICK || e.button === BUTTON_RIGHT_CLICK || false
  }

  function getSelectedText () {
    return window.getSelection().toString()
  }

  var CONST = {
    WORDS_MAX: 109, // 107 chars + 2 (qoute marks)
    DEFAULTS: {
      minimumTextSelected: 3,
      shareClass: '.tweet-selection',
      height: '300',
      width: '400',
      ellipsis: '…',
      quoteRight: '”',
      quoteLeft: '“'
    }
  }

  function getQuoteFromText (text, params) {
    if (text.length > CONST.WORDS_MAX) {
      text = text.substring(0, CONST.WORDS_MAX + params.ellipsis.length)
      text += params.ellipsis
    }

    return params.quoteLeft + text + params.quoteRight
  }

  $.fn.tweetSelection = function (params) {
    params = $.extend(CONST.DEFAULTS, params)
    var info = { mouse: {}, isVisible: false }

    function removeShare () {
      $(params.shareClass).remove()
      document.getSelection().removeAllRanges()
    }

    function addShare (text, event) {
      var boxVerticalPosition = info.mouse.top - 60
      var boxHorizontalPosition = info.mouse.left + (event.clientX - info.mouse.left) / 2

      // basic query parameters
      var tag = '<a href="https://twitter.com/share?url=' + encodeURIComponent(window.location.href)
      tag += '&text=' + encodeURIComponent(text)

      // optional query parameters
      ;['hashtags', 'via', 'related'].forEach(function (optional) {
        if (params[optional]) tag += '&' + optional + '=' + encodeURIComponent(params[optional])
      })

      tag += '" class=\'' + params.shareClass.substr(1) + " fade-in one'"
      tag += ' onclick="window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,'
      tag += 'scrollbars=yes,height=' + params.height
      tag += ',width=' + params.width + '\');return false;"></a>'

      $('body').append(tag)

      $(params.shareClass).css({
        position: 'absolute',
        top: boxVerticalPosition,
        left: boxHorizontalPosition
      })
    }

    // actions when the user starts the selection
    $(this).mousedown(function (event) {
      // take the position of the mouse where the user starts the selection
      // we need this for showing the share button in the middle of the selection
      info.mouse.top = event.clientY + window.pageYOffset
      info.mouse.left = event.clientX

      // remove share button and the old selection
      // Just if the user clicks the left button of the mouse.
      // For right click we must show the genuine browser menu.
      if (!isRightClick(event) && info.isVisible) {
        removeShare()
        info.isVisible = false
      }
    })

    // actions when the user ends the selection
    $(this).mouseup(function (event) {
      var textSelected = getSelectedText()

      // go further just if user click is left mouse click and the selection length is grater than 3 characters
      if (textSelected.length > params.minimumTextSelected && !isRightClick(event)) {
        addShare(getQuoteFromText(textSelected, params), event)
        info.isVisible = true
      }
    })
  }
})($)
