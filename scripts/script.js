(function($){
  $(window).on("load",function(){

    // Navigation
    const menuButton = $('button'),
          docToHide = $('button, header, section, address'),
          nav = $('nav'),
          navLinks = nav.find('a'),
          doc = $('html, body'),
          linkToPortfolio = $('#about a');

    linkToPortfolio.click(function() {
      doc.animate({
        scrollTop: $('#portfolio-0').offset().top
        }, 500, 'linear');
    });

    menuButton.click(function() {
      docToHide.fadeToggle(1000, 'linear');
      doc.scrollTop('#header')
          .toggleClass('overflow-hidden');
      nav.fadeToggle(1000, 'linear');
    });

    navLinks.click(function() {
      docToHide.fadeToggle(1000, 'linear');
      doc.toggleClass('overflow-hidden');
      nav.fadeToggle(1000, 'linear');
    });

    // Portfolio section animate
    const portfolio = $('.portfolio'),
          portfolioElem = portfolio.find('span, h1, h2, a'),
          portfolioLayer = portfolio.find('.layer');

    function turnGray() {
    portfolioElem.stop(true, true).toggleClass('portfolio--color-gray', 500);
    };

    portfolioLayer.hover(turnGray, turnGray);

  });
})(jQuery);