
 _______                          _______
    |                                |
    |  ____  ____       ____   /  |  | ___  ____  ____
    | |    ||    ||    |      /   |  |  |  |    ||
    | |    ||    ||    |____ /____|_ |  |  |    ||____
    | |____||____||____ ____|     |  | _|_ |____| ____|
                                  |        | ROCK DA TIPS
                                           |
                                           |

Tools4Tips
==========
                                           
Dynamic tooltips creator.
**licenses:**
MIT <http://iceon.me/mit.txt>
GPL <http://iceon.me/gpl.txt>
**author:** Stéfano Stypulkowski <http://iceon.me>
**version:** 1.4
**require:** jquery 1.4+
**compatibility:** 
FF 2.0+
Google Chrome 2+
IE 6+
Opera 10+
Safari 5+

It's jQuery plugin.

To go:
------

1 - Import this script after import jquery, this is important.

2 - Create in your style a styling set for the #tooltip id:
Note that it's a div!!

>div#tooltip{
>... bla bla bla
>}

3 - Put your tooltip text inside a custom attribute called "data-tooltip" 
(HTML5 W3C compliant) or in the title attribute in any DOM elements you want.
   
4 - Than initialize this script inside jquery ready function:

>$(function (){
>  $('').tools4tips();     
>});

5 - OK! You don't need to go any further, it's now ready and working.
Any element that have the 'data-tooltip' attribute or the 'title' attrbute 
will have tooltip text when the mouse is over it.
For this elements the browser's default tooltip text will be disabled.
Don't worry about AJAX or DHTML, 'cause even when new DOMElements are created,
the tooltips are applied!