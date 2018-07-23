$(function() {

  const portfolio = $('.portfolio'),
        portfolioElem = portfolio.find('span, h1, h2, a'),
        portfolioLayer = portfolio.find('.layer');

  function turnGray() {
    portfolioElem.stop(true, true).toggleClass('portfolio--color-gray', 500);
  };

  portfolioLayer.hover(turnGray, turnGray);

});
