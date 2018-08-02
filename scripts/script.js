(function($){
  $(window).on("load",function(){

    // Navigation
    const menuButton = $('button'),
          docToHideAndShow = $('nav, button, header, section, address'),
          navLinks = $('nav a'),
          doc = $('html, body'),
          linkToPortfolio = $('#about a');

    function showMenu() {
      docToHideAndShow.fadeToggle(700, 'linear');
    }

    linkToPortfolio.click(function() {
      c = $(this).data('page-number');
      doc.animate({
        scrollTop: $('#portfolio-0').offset().top
        }, 700, 'linear');
    });

    menuButton.click(function() {
      showMenu();
      doc.scrollTop('#header');
    });

    navLinks.click(function() {
      showMenu();
      c = $(this).data('page-number');
    });

    // SCROLL FIX FOR TOUCH DEVICES

    function isMobile() {
      try{ document.createEvent("TouchEvent"); return true; }
      catch(e){ return false; }
    }

    console.log(isMobile());

    // if ( isMobile() ) {
    //   function scrollFlow(x) {
    //     $(document).on('click', 'a[href^="#"]', function(event) {
    //       $('body, html').animate({
    //         scrollTop: $($.attr(this, 'href')).offset().top - x
    //       }, 700);
    //     });
    //   }

    //   scrollFlow(600);
    // }

    // Portfolio section animate
    const portfolio = $('.portfolio'),
          portfolioElem = portfolio.find('span, h1, h2, a'),
          portfolioLayer = portfolio.find('.layer');

    function turnGray() {
      portfolioElem.stop(true, true)
                   .toggleClass('portfolio--color-gray', 500);
    };

    portfolioLayer.hover(turnGray, turnGray);

    // Reload after orientation change
    let supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener(orientationEvent, function() {
      window.location.reload()
    }, false); 

  });
})(jQuery);