(function($){
  $(window).on("load",function(){

    // Navigation
    const menuButton = $('button'),
          docToHideAndShow = $('nav, button, header, section, address'),
          navLinks = $('nav a'),
          doc = $('html, body'),
          sectionPortfolio = $('#portfolio-0'),
          linkToPortfolio = $('#about a');

    function showMenu() {
      docToHideAndShow.fadeToggle(700, 'linear');
    }

    function scrollFlow(section, margin) {
      margin = margin || 0;
      doc.animate({
        scrollTop: section.offset().top - margin
        }, 700, 'linear');
    }

    linkToPortfolio.click(function() {
      c = $(this).data('page-number');
      scrollFlow(sectionPortfolio);
    });

    menuButton.click(function() {
      showMenu();
      doc.scrollTop('#header');
    });


    // Scroll fix for touch devices
    function isMobile() {
      try { document.createEvent("TouchEvent"); return true; }
      catch(e) { return false; }
    }

    let touchDevice = isMobile(),
        // windowHeight = $(window).height(),
        // // navLinkToAbout = $('#nav-link-to-About'),
        // // navLinkToPortfolio = $('#nav-link-to-Portfolio'),
        sectionAbout = $('#about');
        // heightSectionAbout = 700,
        // heightSectionPortfolio = 550;

    navLinks.click(function() {
      c = $(this).data('page-number');
      if (touchDevice) {

        let id = $(this).attr('id');
            // offsetAbout = windowHeight - heightSectionAbout,
            // offsetPortfolio = windowHeight - heightSectionPortfolio;

        switch (id) {
          case 'nav-link-to-About':
            scrollFlow(sectionAbout);
            break;
          case 'nav-link-to-Portfolio':
            scrollFlow(sectionPortfolio, 300);
            break;
        }
      }

      showMenu();
    });

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