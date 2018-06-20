/* var scrollex = require('jquery.scrollex'); */

var app = {

    init: function() {
  
        app.$body = $('body');
        app.$header = $('.header');

        // CHANGEMENT NAV
        app.$header.scrollex({
        // bottom = hauteur du menu : scrollex va exécuter sa methode enter après la hauteur du header
        bottom: app.$header.height(),
        enter: function(){
            app.$header.removeClass('color');
          },
          leave: function() {
            app.$header.addClass('color');
          }   
      })
      
        // au clic sur la nav
        $('a[href*="#"]:not([href="#"])').on('click', app.smoothscroll);
    },
  
    smoothscroll: function(evt) {
        console.log('coucou')
        evt.preventDefault();
        var target = $(this.hash);
        var targetPosition = target.offset().top - app.$header.height() + 1;

        if (target.length) {
        $('html, body').animate(
            {
            scrollTop: targetPosition
            },
        1000);
        }
    },
}
  
$(app.init);
  