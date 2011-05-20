/** 
* _______                          _______
*    |                                |
*    |  ____  ____       ____   /  |  | ___  ____  ____
*    | |    ||    ||    |      /   |  |  |  |    ||
*    | |    ||    ||    |____ /____|_ |  |  |    ||____
*    | |____||____||____ ____|     |  | _|_ |____| ____|
*                                  |        | ROCK DA TIPS
*                                           |
*
* Dynamic tooltips creator.
* 
* Now a jquery plugin.
*
* To go:
*
*   1 - Import this script after import jquery, this is important.
*
*   2 - Create in your style a styling set for the #tooltip id:
*   Note that it's a div!!
*
*   div#tooltip{
*     ... bla bla bla
*   }
*
*   3 - Put your tooltip text inside a custom attribute called "data-tooltip" 
*   (HTML5 W3C compliant) or in the title attribute (to prevent default tooltip) 
*   in any DOM elements you want.
*
*   4 - Than initialize this script inside jquery ready function:
*
*   $(function (){
*
*     $('*[title],*[data-tooltip]').tools4tips();     
*
*   });
*
*   You don't need to go any further, it's now ready and working.
*   Don't worry about AJAX or DHTML, 'cause even when new DOMElements are created,
*   the tooltips are applied!
*
* @license MIT <http://iceon.me/mit.txt>
* @license GPL <http://iceon.me/gpl.txt>
* @author Stéfano Stypulkowski <iceon.me>
* @version 1.1.1
* @require jquery 1.4+
* @compatible FF 2.0+
* @compatible Google Chrome
* @compatible IE 6+
* @compatible Opera 10+
* @compatible Safari 5+
* 
* probably works on other browsers or versions, but I don't care.
*/
(function($){
  if (!$){
    if (console && typeof console.log === 'function'){
      console.log('You don\'t have a valid version of jquery')
    }
    return false;
  }
  var jqvalid = false;
  try{
    var vp = jQuery.fn.jquery.split('.');
    if (Number(vp[0]) >= 1 && Number(vp[1]) >= 4){
      jqvalid = true;
    }
  }catch (e){}
  if (!jqvalid){
    if (console && typeof console.log === 'function'){
      console.log('You don\'t have a valid version of jquery')
    }
    return false;
  }

  var
    domTip = $('<div id="tooltip"></div>'),
    POINTER_DIST = 15,
    offset = {},
    isCoordsInOffset = function (x,y){
      return (x >= offset.left && x <= offset.right && y >= offset.top && y <= offset.bottom);
    },
    currentElement = null,
    calculatePosition = function (e){
      domTip.css('left', 
        (e.pageX + POINTER_DIST + domTip.outerWidth(true)) >= Math.max($('body').outerWidth(true),$(document).width()) ?
        Math.max($('body').outerWidth(true),$(document).width()) - domTip.outerWidth(true) :
        e.pageX + POINTER_DIST);
          
      domTip.css('top', (e.pageY + POINTER_DIST + domTip.outerHeight(true)) >= Math.max($('body').outerHeight(true),$(document).height()) ?
        Math.max($('body').outerHeight(true),$(document).height()) - domTip.outerHeight(true) :
        e.pageY + POINTER_DIST);
    }
    
  $.fn.tools4tips = function (){
    
    $(this).live({
      mouseover: function(e){
        if (!domTip.parent().size()){
          domTip.appendTo('body').css({
            position:'absolute',
            zIndex:999999,
            overflow:'visible',
            whiteSpace:'no-wrap',
            top:'0px',
            left:'0px'
          });
          offset = {
            top: $(this).offset().top,
            bottom: $(this).offset().top + $(this).outerHeight(),
            left: $(this).offset().left,
            right: $(this).offset().left + $(this).outerWidth()
          }
          $(document).bind('mousemove',function (e){
            if (!isCoordsInOffset(e.pageX,e.pageY)){
              currentElement = null;
              domTip.detach();
              $(document).unbind('mousemove');
            }else{
              calculatePosition(e);
            }
          });
        }
      },
      mouseenter: function (e){
        if (this !== currentElement){
          if ($(this).attr('data-tooltip')){
            if (domTip.html() !== $(this).attr('data-tooltip')){
              domTip.html($(this).attr('data-tooltip'));
              domTip.css('width','auto');
              domTip.css('width',domTip.width());
            }
          }else{
            var t = $(this).attr('title');
            $(this).attr('data-tooltip',t);
            $(this).removeAttr('title');
            if (domTip.html() !== t){
              domTip.html(t);
            }
          }
          currentElement = this;
          calculatePosition(e);
          e.stopPropagation();
        }
      }
    });
  }
})(jQuery);