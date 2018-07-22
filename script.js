$(function() {

  const portfolio = $('.portfolio'),
        portfolioElem = portfolio.find('span, h1, h2, a'),
        portfoliolayer = $('.layer');

  function turnGray() {
    portfolioElem.toggleClass('portfolio--color-gray', 1000);
  };

  portfoliolayer.hover(turnGray, turnGray);

});
