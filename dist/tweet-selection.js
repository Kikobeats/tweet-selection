/**
 * tweet-selection - Tweet selected text. Like Medium but out of the box.
 * @version 0.3.1
 * @link    https://github.com/kikobeats/tweet-selection
 * @author  Kiko Beats (https://github.com/kikobeats)
 * @license MIT
 */
!function(e){function t(e){var t=3,n=2;return e=e||window.event,e.which===t||e.button===n||!1}function n(){return window.getSelection().toString()}function o(e){return e.length>s.WORDS.MAX+2&&(e=e.substring(0,s.WORDS.MAX+5),e+="..."),'"'+e+'"'}function i(e){return e=e||{},e.selector=e.selector||"body",e.minimumTextSelected=e.minimumTextSelected||s.WORDS.MIN,e.shareClass=e.shareClass||".tweet-selection",e.height=(e.height||300).toString(),e.width=(e.width||600).toString(),e}var s={WORDS:{MAX:107,MIN:3}};e.tweetSelection=function(s){function r(){e(s.shareClass).remove(),document.getSelection().removeAllRanges()}function l(t,n){var o=c.mouse.top-60,i=c.mouse.left+(n.clientX-c.mouse.left)/2,r='<a href="https://twitter.com/share?url='+encodeURIComponent(window.location.href);r+="&text="+encodeURIComponent(t),["hashtags","via","related"].forEach(function(e){s[e]&&(r+="&"+e+"="+encodeURIComponent(s[e]))}),r+="\" class='"+s.shareClass.substr(1)+" fade-in one'",r+=" onclick=\"window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,",r+="scrollbars=yes,height="+s.height,r+=",width="+s.width+"');return false;\"></a>",e("body").append(r),e(s.shareClass).css({position:"absolute",top:o,left:i})}s=i(s);var c={mouse:{},isVisible:!1};e(s.selector).mousedown(function(e){c.mouse.top=e.clientY+window.pageYOffset,c.mouse.left=e.clientX,!t(e)&&c.isVisible&&(r(),c.isVisible=!1)}),e(s.selector).mouseup(function(e){var i=n();i.length>s.minimumTextSelected&&!t(e)&&(l(o(i),e),c.isVisible=!0)})}}($);