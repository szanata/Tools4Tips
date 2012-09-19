Tools4Tips
==========
                                          
>It's a dynamic tooltip text generator.
>
>**licenses:**
>MIT <http://szanata.com/mit.txt>
>GPL <http://szanata.com/gpl.txt>
>
>**author:** Stéfano Stypulkowski <http://sanata.me>,
>
>**version:** 2
>
>**require:** jquery 1.7+
>
>**compatibility:**
>FF 2.0+
>Google Chrome 2+
>IE 6+
>Opera 10+
>Safari 5+

To go:
------

1 - Import this script after import jquery, this is important.

2 - Create in your style a styling set for the #tooltip id:
Note that it's a div!!

    div#tooltip{
      ... bla bla bla
    }

Use 'max-width' to set the maximum width for the tip.
The is a 'tools4tips.css' example among the project.

3 - Put your tooltip text inside a custom attribute called "data-tooltip" 
(HTML5 W3C compliant) or in the "title" attribute on any DOM elements you want.
   
4 - Than initialize this script inside jquery ready function:

    $(function (){
      $('').tools4tips();     
    });

5 - OK! You don't need to go any further, it's now ready and working.
Any element that have the 'data-tooltip' attribute or the 'title' attrbute 
will have tooltip text when the mouse is over it.
For this elements the browser's default tooltip text will be disabled.
Don't worry about AJAX or DHTML, 'cause even when new DOMElements are created,
the tooltips are applied!