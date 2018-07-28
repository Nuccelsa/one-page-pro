

var app = {

    init: function() {

        function checkScroll(){
            var startY = $('.navbar').height() * 1; //The point where the navbar changes in px
            if($(window).scrollTop() > startY){
                $('.navbar').addClass("scrolled");
            }else{
                $('.navbar').removeClass("scrolled");
            }

            $('#about').css('padding-top', '10px');
        }
        
        if($('.navbar').length > 0){
            $(window).on("scroll load resize", function(){
                checkScroll();
            });
        }
        
    },

}
  
$(app.init);