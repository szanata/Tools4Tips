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
* @license MIT <http://szanata.com/mit.txt>
* @license GPL <http://szanata.com/gpl.txt>
* @author Stéfano Stypulkowski <http://szanata.me>
* @version 2.0
* @require jquery 1.7+
* @compatible FF 3.5+
* @compatible Google Chrome 3+
* @compatible IE 6+
* @compatible Opera 10+
* @compatible Safari 5+
* 
* probably works on other browsers or versions, but I don't care.
*
*/
(function($){

  var
    $tip = $('<div id="tooltip"></div>').css({
      position:'absolute',
      zIndex:999999,
      whiteSpace:'no-wrap',
      top:'0px',
      left:'0px',
      overflow:'hidden'
    }),
    MOUSE_DIST = 15;
    
  function calculatePosition(e){
    $tip.css('left', 
      (e.pageX + MOUSE_DIST + $tip.outerWidth(true)) >= Math.max($('body').outerWidth(true),$(document).width()) ?
      Math.max($('body').outerWidth(true),$(document).width()) - $tip.outerWidth(true) :
      e.pageX + MOUSE_DIST);
        
    $tip.css('top', (e.pageY + MOUSE_DIST + $tip.outerHeight(true)) >= Math.max($('body').outerHeight(true),$(document).height()) ?
      Math.max($('body').outerHeight(true),$(document).height()) - $tip.outerHeight(true) :
      e.pageY + MOUSE_DIST);
  }
  
  function makeTip(content){
    $tip.appendTo('body').css({
      top:'0px',left:'0px'
    }).html(content);
  }
  
  function restorePrevTitle(){
    $('[data-title-backup]').each(function (){
      $(this).attr('title',$(this).attr('data-title-backup')).removeAttr('data-title-backup');
    });
  }
    
  $.fn.tools4tips = function (){
    
    $(document).on({
      'mouseover.tools4tip':function (e){
        e.stopPropagation();
        var self = $(e.target);
        if (!self.is('[data-tooltip],[title],[data-title-backup]')){
          $tip.detach();
          return;
        }else if (self.attr('title')){
          self.attr('data-title-backup', self.attr('title')).removeAttr('title');
        }
        makeTip(self.attr('data-tooltip') || self.attr('data-title-backup'));
        $(document).on('mousemove.tools4tip', calculatePosition).trigger('mousemove');
      },
      'mouseleave.tools4tip': function (e){
        $(document).off('mousemove.tools4tip');
        $tip.detach();
        restorePrevTitle();
      }
    },$(this).selector);
    return this;
  }
})(jQuery);