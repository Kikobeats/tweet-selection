/**
 * tweet-selection - 
 * @version 0.0.0
 * @link    https://github.com/kikobeats/tweet-selection
 * @author  Kiko Beats (https://github.com/kikobeats)
 * @license MIT
 */
!function(e){function t(e){var t=3,n=2;return e=e||window.event,e.which===t||e.button===n||!1}function n(){return window.getSelection().toString()}function o(e){return e.length>i.WORDS.MAX+2&&(e=e.substring(0,i.WORDS.MAX+5),e+="..."),'"'+e+'"'}function s(e){return e=e||{},e.selector=e.selector||"body",e.mininumTextSelected=e.mininumTextSelected||i.WORDS.MIN,e.shareClass=e.shareClass||".tweetSelection",e}var i={WORDS:{MAX:107,MIN:3}};e.tweetSelection=function(i){function l(){e(i.shareClass).remove(),document.getSelection().removeAllRanges()}function r(t,n){var o=u.mouse.top-60,s=u.mouse.left+(n.clientX-u.mouse.left)/2,l='<a href="https://twitter.com/share?url='+encodeURIComponent(window.location.href);l+="&text="+encodeURIComponent(t),l+="\" class='"+i.shareClass.substr(1)+"'",l+=" onclick=\"window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,",l+="scrollbars=yes,height=300,width=600');return false;\"></a>",e("body").append(l),e(i.shareClass).css({position:"absolute",top:o,left:s})}function c(){e(i.selector).mousedown(function(e){u.mouse.top=e.clientY+window.pageYOffset,u.mouse.left=e.clientX,!t(e)&&u.isVisible&&(l(),u.isVisible=!1)}),e(i.selector).mouseup(function(e){var s=n();s.length>i.mininumTextSelected&&!t(e)&&(r(o(s),e),u.isVisible=!0)})}i=s(i);var u={mouse:{},isVisible:!1};e(c)}}($);