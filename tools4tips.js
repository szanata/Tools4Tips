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
* version 1.4.2
*
* It's jQuery plugin.
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
*   (HTML5 W3C compliant) or in the title attribute in any DOM elements you want.
*   
*   4 - Than initialize this script inside jquery ready function:
*
*   $(function (){
*
*     $('*').tools4tips();     
*
*   });
*
*   5 - OK! You don't need to go any further, it's now ready and working.
*   Any element that have the 'data-tooltip' attribute or the 'title' attrbute will have tooltip text.
*   For this elements the browser's default tooltip text will be disabled.
*   Don't worry about AJAX or DHTML, 'cause even when new DOMElements are created,
*   the tooltips are applied!
*
* @license MIT <http://iceon.me/mit.txt>
* @license GPL <http://iceon.me/gpl.txt>
* @author Stéfano Stypulkowski <http://iceon.me>
* @version 1.4.1
* @require jquery 1.4+
* @compatible FF 2.0+
* @compatible Google Chrome
* @compatible IE 6+
* @compatible Opera 10+
* @compatible Safari 5+
* 
* probably works on other browsers or versions, but I don't care.
*
*/
(function($){

  var
    domTip = $('<div id="tooltip"></div>').css({
      position:'absolute',
      zIndex:999999,
      whiteSpace:'no-wrap',
      top:'0px',
      left:'0px',
      overflow:'hidden'
    }),
    currentElement = null,
    POINTER_DIST = 15,
    offset = {
      left:0,
      right:0,
      top:0,
      bottom:0,
      setOffset: function setOffset(el){
        this.top = el.offset().top;
        this.bottom = el.offset().top + el.outerHeight();
        this.left = el.offset().left;
        this.right = el.offset().left + el.outerWidth();
      },
      isCoordsInOffset: function isCoordsInOffset(x, y){
        return (x >= this.left && x <= this.right && y >= this.top && y <= this.bottom);
      }
    };
    
  function calculatePosition(e){
    domTip.css('left', 
      (e.pageX + POINTER_DIST + domTip.outerWidth(true)) >= Math.max($('body').outerWidth(true),$(document).width()) ?
      Math.max($('body').outerWidth(true),$(document).width()) - domTip.outerWidth(true) :
      e.pageX + POINTER_DIST);
        
    domTip.css('top', (e.pageY + POINTER_DIST + domTip.outerHeight(true)) >= Math.max($('body').outerHeight(true),$(document).height()) ?
      Math.max($('body').outerHeight(true),$(document).height()) - domTip.outerHeight(true) :
      e.pageY + POINTER_DIST);
  }
  
  function makeTip(){
    domTip.appendTo('body').css({
      top:'0px',
      left:'0px'
    });
  }
  
  function restoreTitle(){
    $('[data-title-backup]').each(function (){
      if ($(this).attr('data-title-backup')){
        $(this).attr('title',$(this).attr('data-title-backup'));
        $(this).removeAttr('data-title-backup');
      }
    });
  }
  
  function backupTitle(el){
    if (el.attr('title')){
      el.attr({
        'data-title-backup': el.attr('title'),
        'title': ''
      });
    }
  }
    
  $.fn.tools4tips = function (){
    
    $(this).live({
    
      mouseover: function (e){
        if (!$(this).attr('data-tooltip') && !$(this).attr('title')){
          domTip.detach();
          return;
        }else{
          if (!$(this).attr('data-tooltip')){
            $(this).attr('data-tooltip',$(this).attr('title'));
          }
        }
        
        if (!domTip.parent().size()){
        
          makeTip();
          
          offset.setOffset($(this))
          
          $(document).bind('mousemove',function (e){
            if (!offset.isCoordsInOffset(e.pageX,e.pageY)){
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
      
          restoreTitle();
          
          backupTitle($(this));
          
          if (domTip.html() !== $(this).attr('data-tooltip')){
            domTip.html($(this).attr('data-tooltip'));
          }
          
          domTip.attr('style',domTip.attr('style').replace('width: 300px;',''));
          if (domTip.outerWidth(true) > 300){
            domTip.attr('style',domTip.attr('style') + 'width: 300px;');
          }
          
          currentElement = this;
          
          calculatePosition(e);
          
          e.stopPropagation();
        }
      }
    });
    return this;
  }
})(jQuery);