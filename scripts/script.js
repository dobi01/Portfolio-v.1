'use strict';

/*jshint esversion: 6 */
(function($){
  $(window).on("load",function(){

    $('body').removeClass('fade-out');

    // Add a class when the target is in the viewport
    // Based on https://gist.github.com/eltonmesquita/96065060e7be48b5ca6546454cb9d1be
    function onViewport(el, elClass, offset) {
      /*** Based on http://ejohn.org/blog/learning-from-twitter/ ***/
      var this_top,
          top;
     
      setInterval(function() {
        top = $(this).scrollTop();
    
        $(el).each(function(i) {
          if (!offset) { offset = $(this).height(); }
          this_top = $(this).offset().top - offset;
    
          // Scrolled within current section
          if (top >= this_top && !$(this).hasClass(elClass)) {
            $(this).addClass(elClass);
          }
        });
      }, 100);
    }

    var viewportHeight = $(window).height(),
        figures = $('figure'),
        windowMaxHeight500pxLandscape = window.matchMedia("(max-height: 500px) and (orientation: landscape)");

    onViewport('.fade-in-section', 'visible animated fadeIn slow', 500);

    function mediaQueryMaxHeight500pxLandscape(x) {
      if (x.matches) {
        figures.addClass('visible');
      } else {
        onViewport('.figure--left', 'visible animated fadeInLeft', viewportHeight);
        onViewport('.figure--right', 'visible animated fadeInRight', viewportHeight);
        onViewport('.figure--center', 'visible animated fadeIn', viewportHeight);
      }
    }

    windowMaxHeight500pxLandscape.addListener(mediaQueryMaxHeight500pxLandscape);
    mediaQueryMaxHeight500pxLandscape(windowMaxHeight500pxLandscape);

    // Touch device detection
    function isMobile() {
      try { document.createEvent("TouchEvent"); return true; }
      catch(e) { return false; }
    }
    
    var touchDevice = isMobile();

    // Navigation
    var menuButton = $('button'),
        docToHideAndShow = $('nav, button, header, section, address'),
        nav = $('nav'),
        navLinks = nav.find('a'),
        doc = $('html, body'),
        sectionPortfolio = $('#portfolio-0'),
        sectionAbout = $('#about'),
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

    linkToPortfolio.on('click', function() {
      activePageNum = $(this).data('page-number'); // to get smooth scroll by mousewheel and keyboard
      scrollFlow(sectionPortfolio);     
    });

    menuButton.on('click', function() {
      showMenu(docToHideAndShow);
      doc.scrollTop('#header'); // to get nice fadein effect of nav section
    });

    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
      isChrome = !!window.chrome && !!window.chrome.webstore,
      isFirefox = typeof InstallTrigger !== 'undefined',
      isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
      isIE = /*@cc_on!@*/false || !!document.documentMode,
      isEdge = !isIE && !!window.StyleMedia;

    navLinks.on('click', function() {
      activePageNum = $(this).data('page-number');

      if (activePageNum == 12 || isChrome || isOpera) { // if user clicked on link to Contact section
        showMenu(docToHideAndShow);
      } else {
        if (isFirefox || isSafari || isIE || isEdge) {              
          showMenu(docToHideAndShow);
          if (activePageNum == 1) { // if user clicked on link to About section
            scrollFlow(sectionAbout, viewportHeight);
          } else if (activePageNum == 3) { // if user clicked on link to Portfolio section
            scrollFlow(sectionPortfolio, viewportHeight);
          }
        } else {
          showMenu(docToHideAndShow);
        }
      }
    });

    // Portfolio section animate
    var portfolio = $('.portfolio'),
        portfolioElem = portfolio.find('span, h1, h2, a'),
        portfolioLayer = portfolio.find('.layer');

    function turnGray() {
      portfolioElem.stop(true, true)
                   .toggleClass('portfolio--color-gray', 500);
    }

    portfolioLayer.hover(turnGray, turnGray);

    // Reload after orientation change
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener(orientationEvent, function() {
      window.location.reload();
    }, false); 

  });
})(jQuery);