(function($){
  $(window).on("load",function(){

    // Add a class when the target(s) is in the viewport
    // Based on https://gist.github.com/eltonmesquita/96065060e7be48b5ca6546454cb9d1be
    function onViewport(el, elClass, offset) {
      /*** Based on http://ejohn.org/blog/learning-from-twitter/ ***/
      let didScroll = false,
          this_top,
          top;
        
      $(window).scroll(function() {
        didScroll = true;
      });
     
      setInterval(function() {
        if (didScroll) {
          didScroll = false;
          top = $(this).scrollTop();
     
          $(el).each(function(i) {
            if (!offset) { offset = $(this).height(); }
            this_top = $(this).offset().top - offset;
     
            // Scrolled within current section
            if (top >= this_top && !$(this).hasClass(elClass)) {
              $(this).addClass(elClass);
            }
          });
        }
      }, 100);
    }

    let viewportHeight = $(window).height(),
        figures = $('figure');
    const windowMaxHeight500pxLandscape = window.matchMedia("(max-height: 500px) and (orientation: landscape)");

    $('header').addClass('animated fadeIn slow');
    onViewport('.fade-in-section', 'visible animated fadeIn slow', 500);

    function mediaQuery500px(x) {
      if (x.matches) {
        figures.addClass('visible');
      } else {
        onViewport('.figure--left', 'visible animated fadeInLeft', viewportHeight);
        onViewport('.figure--right', 'visible animated fadeInRight', viewportHeight);
        onViewport('.figure--center', 'visible animated fadeIn', viewportHeight);
      }
    }

    windowMaxHeight500pxLandscape.addListener(mediaQuery500px);
    mediaQuery500px(windowMaxHeight500pxLandscape);

    // Touch device detection
    function isMobile() {
      try { document.createEvent("TouchEvent"); return true; }
      catch(e) { return false; }
    }
    
    let touchDevice = isMobile();

    // Navigation
    const menuButton = $('button'),
          docToHideAndShow = $('nav, button, header, section, address'),
          bodyWithoutNav = $('button, header, section, address'),
          nav = $('nav'),
          navLinks = nav.find('a'),
          doc = $('html, body'),
          sectionPortfolio = $('#portfolio-0'),
          linkToPortfolio = $('#about a');

    function showMenu(section) {
      section.fadeToggle(700, 'linear');
    }

    function scrollFlow(section, margin) {
      margin = margin || 0;
      doc.animate({
        scrollTop: section.offset().top - margin
        }, 700, 'linear');
    }

    linkToPortfolio.on('click touch', function () {
      c = $(this).data('page-number');
      scrollFlow(sectionPortfolio);
    });

    menuButton.click(function() {
      showMenu(docToHideAndShow);
      doc.scrollTop('#header');
    });

    navLinks.on('click touch', function () {
      c = $(this).data('page-number');
      showMenu(nav);
      showMenu(bodyWithoutNav);
      // if (touchDevice) {
      //   showMenu(nav);
      //   showMenu(bodyWithoutNav);
      // } else {
      //   showMenu(docToHideAndShow);
      // }
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