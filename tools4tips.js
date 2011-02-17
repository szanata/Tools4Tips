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
* to go:
*
*   Import this script after import jquery, this is important.
*
*   Create in your style a styling set for the #tooltip id:
*   Note that it's a div!!
*   div#tooltip{
*     ... bla bla bla       
*   }
*
*   Put your tooltip text inside a custom attribute called "data-tooltip" 
*   (HTML5 W3C compliant) or the title attribute (to prevent default tooltip) 
*   in any element you want.
*
*   You don't need to go any further, it's now ready and working.
*   Don't worry about AJAX or DHTML, 'cause even when new DOMElements are created,
*   the tooltips are applied!
*
* @license MIT <http://iceon.me/mit.txt>
* @license GPL <http://iceon.me/gpl.txt>
* @author Stéfano Stypulkowski <iceon.me>
* @require jquery 1.4+
* @compatible FF 2.0+
* @compatible Google Chrome
* @compatible IE 6+
* @compatible Opera 10+
* @compatible Safari 5+
* 
* probably works on other browsers or versions, but I don't care.
*/
(function (){
  var jqvalid = false;
  try{
    var vp = jQuery.fn.jquery.split('.');
    if (Number(vp[1]) >= 1 && Number(vp[1]) >= 4){
      jqvalid = true;
    }
  }catch (e){}
  if (jqvalid){
    var
      WRP_SEL = '#tooltip',
      POINTER_DIST = 15,
      offset = {},
      isCoordsInOffset = function (x,y){
        return (x >= offset.left && x <= offset.right && y >= offset.top && y <= offset.bottom);
      },
      currentElement = null;
      
    $(function (){
      
      $('*[title!=""],*[data-tooltip]').live({
      
        mouseover: function(e){
          if (!$(WRP_SEL).size()){
            $('<div id="tooltip"></div>').appendTo('body').css({
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
                $(WRP_SEL).remove();
                currentElement = null;
              }else{
                onMouseMove(e);
              }
            });
          }
        },
        mouseenter: function (e){
          if (this !== currentElement){
            if ($(this).attr('data-tooltip')){
              if ($(WRP_SEL).html !== $(this).attr('data-tooltip')){
                $(WRP_SEL).html($(this).attr('data-tooltip'));
                $(WRP_SEL).css('width','auto');
                $(WRP_SEL).css('width',$(WRP_SEL).width());
              }
            }else{
              var t = $(this).attr('title');
              $(this).attr('data-tooltip',t);
              $(this).removeAttr('title');
              if ($(WRP_SEL).html !== t){
                $(WRP_SEL).html(t);
              }
            }
            currentElement = this;
            onMouseMove(e);
            e.stopPropagation();
          }
        },
      });
    }); 
    var onMouseMove = function (e){
      if ( (e.pageX + POINTER_DIST + $(WRP_SEL).outerWidth(true)) >= Math.max($('body').outerWidth(true),$(document).width())){
        $(WRP_SEL).css('left', (Math.max($('body').outerWidth(true),$(document).width()) - $(WRP_SEL).outerWidth(true)) + 'px');
      }else{
        $(WRP_SEL).css('left', String(e.pageX + POINTER_DIST) + 'px');
      }
      if ( (e.pageY + POINTER_DIST + $(WRP_SEL).outerHeight(true)) >= Math.max($('body').outerHeight(true),$(document).height())){
        $(WRP_SEL).css('top',(Math.max($('body').outerHeight(true),$(document).height()) - $(WRP_SEL).outerHeight(true)) + 'px');
      }else{
        $(WRP_SEL).css('top', String(e.pageY + POINTER_DIST) + 'px');
      }
    }
  }
})();