(function($){
  $(window).on("load",function(){

    // Navigation
    const menuButton = $('button'),
          docToHideAndShow = $('nav, button, header, section, address'),
          navLinks = $('nav a'),
          doc = $('html, body'),
          linkToPortfolio = $('#about a');

    function showMenu() {
      docToHideAndShow.fadeToggle(1000, 'linear');
      doc.toggleClass('overflow-hidden');
    }

    linkToPortfolio.click(function() {
      doc.animate({
        scrollTop: $('#portfolio-0').offset().top
        }, 800, 'linear');
    });

    menuButton.click(function() {
      showMenu();
      doc.scrollTop('#header');
    });

    navLinks.click(function() {
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

  });
})(jQuery);