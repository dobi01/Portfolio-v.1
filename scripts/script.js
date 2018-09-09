'use strict';

// SMOOTH SCROLL
/* Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 Licensed under the MIT License (LICENSE.txt).

 Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 Thanks to: Seamus Leahy for adding deltaX and deltaY
 
 Version: 3.0.6
 
 Requires: 1.2.2+
 */

// Modified by Dobi Okrasa

var activePageNum = 0;

(function($) {

  var types = ['DOMMouseScroll', 'mousewheel'];
  
  if ($.event.fixHooks) {
    for ( var i = types.length; i; ) {
      $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
  }
  
  $.event.special.mousewheel = {
    setup: function() {
      if ( this.addEventListener ) {
        for ( var i = types.length; i; ) {
          this.addEventListener( types[--i], handler, false );
        }
      } else {
        this.onmousewheel = handler;
      }
    },
    
    teardown: function() {
      if ( this.removeEventListener ) {
        for ( var i = types.length; i; ) {
          this.removeEventListener( types[--i], handler, false );
        }
      } else {
        this.onmousewheel = null;
      }
    }
  };
  
  $.fn.extend({
    mousewheel: function(fn) {
      return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
      return this.unbind("mousewheel", fn);
    }
  });
  
  
  function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
      deltaY = 0;
      deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
  }
  
  })(jQuery);
    
  var pagesN = $('.page').length;
  
  function adjustCurrent(){
    if (activePageNum === -1) {
      activePageNum = 0;
    } else if (activePageNum === pagesN) {
      activePageNum = pagesN - 1;
    }    
  }
  
  var pauseWheel = false; // ADDED THIS 'FLAG' TO PREVENT SCROLLS WHILE ANIMATING
  
  function scrollPage() {
    adjustCurrent(); 
    var pagePos = $('.page').eq(activePageNum).position().top;    
    $('html, body').stop().animate({scrollTop: pagePos}, {
      easing: 'easeOutSine',
      duration: 800,
      complete: function() {
        pauseWheel = false; // WHEN ANIMATION IS OVER RESET TO false
      }
    });
  }

  $(document).bind('mousewheel', function(ev, delta) {
    if (pauseWheel === false) { // ONLY IF FLAG IS FALSE
      pauseWheel = true;    // SET MOMENTALLY TO TRUE
      if (delta > 0) {
        activePageNum--;
      } else {
        activePageNum++;
      }

      scrollPage();       // LOOK WHAT HAPPENS WITH OUR FLAG IN THIS fn
      return false;
    }        
  });
  
  // Modified by Dobi Okrasa
  $(document).bind('keyup', function(event) {
    var key = event.which;

    switch (key) {
      case 40:
        activePageNum++;
        scrollPage();
        break;
      case 38:
        activePageNum--;
        scrollPage();
        break;
    }

    return false;
  });


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
      try { document.createEvent('TouchEvent'); return true; }
      catch(e) { return false; }
    }
    
    var touchDevice = isMobile();
    if (touchDevice) {
      var img = $('.layer img');
      img.css('opacity', .5);
      img.on('touchstart', function(e) {
        $(this).css('opacity', 1);
      });
    }

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