/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

  var types = ['DOMMouseScroll', 'mousewheel'];
  
  if ($.event.fixHooks) {
      for ( var i=types.length; i; ) {
          $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
      }
  }
  
  $.event.special.mousewheel = {
      setup: function() {
          if ( this.addEventListener ) {
              for ( var i=types.length; i; ) {
                  this.addEventListener( types[--i], handler, false );
              }
          } else {
              this.onmousewheel = handler;
          }
      },
      
      teardown: function() {
          if ( this.removeEventListener ) {
              for ( var i=types.length; i; ) {
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
  
  
  
  
  
  // OUR CODE
  
  
  
  
  
  var winH = $(window).height();
  $('.page').height(winH);
  
  var c = 0;
  var pagesN = $('.page').length;
  
  // CREATE NAVIGATION BUTTONS depending on pages number
  for(i=0;i<pagesN;i++){
     $('#nav_2').append('<div class="btn">'+(i+1)+'</div>');
  }
  $('#nav_2 .btn').eq(c).addClass('active');
  
  
  function adjustCurrent(){
      if(c===-1){
          c=0;
      }else if(c===pagesN){
          c=pagesN-1;
      }
      $('#nav_2 .btn').eq(c).addClass('active').siblings('.btn').removeClass('active');    
  }
  
  
  
  var pauseWheel = false; // ADDED THIS 'FLAG' TO PREVENT SCROLLS WHILE ANIMATING
  function scrollPage(){
      adjustCurrent(); 
      var pagePos = $('.page').eq(c).position().top;       
      $('html, body').stop().animate({scrollTop: pagePos},{
          easing: 'easeInCirc',
          duration: 1200,
          complete: function(){
              pauseWheel=false; // WHEN ANIMATION IS OVER RESET TO false
          }
      });
  }
  var activePage=0;
  $(document).bind('mousewheel', function(ev, delta) {
      if(pauseWheel===false){ // ONLY IF FLAG IS FALSE
          pauseWheel=true;    // SET MOMENTALLY TO TRUE
          delta>0 ? c-- : c++ ;
          activePage=c;
          scrollPage();       // LOOK WHAT HAPPENS WITH OUR FLAG IN THIS fn
          return false;
      }        
  });
  
  $(document).bind('keyup', function(event){
      if(event.which == 40) {
          activePage = activePage+1;
          var pagePos = $('.page').eq(activePage).position().top;       
          $('html, body').stop().animate({scrollTop: pagePos},{easing: 'easeInCirc', duration: 1200});
      } else if(event.which == 38) {
          activePage = activePage-1;
          var pagePos = $('.page').eq(activePage).position().top;       
          $('html, body').stop().animate({scrollTop: pagePos},{easing: 'easeInCirc', duration: 1200});
      }
  
      return false;
  });