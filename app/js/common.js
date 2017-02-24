// SLIDER
(function() {
  'use strict';
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    slidesPerView: 1,
    speed: 2000,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    loop: true,
    effect: 'fade',
    fade: {
      crossFade: true
    }
  });
})();

// CAROUSEL
(function() {
  'use strict';
  var carousel = new Swiper('.carousel__container', {
    containerModifierClass: 'carousel__container-',
    wrapperClass: 'carousel__wrapper',
    slideClass: 'carousel__item',
    slidesPerView: 4,
    paginationClickable: true,
    spaceBetween: 0,
    nextButton: '.carousel__button-next',
    prevButton: '.carousel__button-prev'
  });
})();

//SPRITE
(function(window, document) {
  'use strict';
  var file = '../img/sprites/sprite.svg',
      revision = 1;
  if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
  var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
    request,
    data,
    insertIT = function() {
      document.body.insertAdjacentHTML('afterbegin', data);
    },
    insert = function() {
      if (document.body) insertIT();
      else document.addEventListener'DOMContentLoaded', insertIT;
    };
  if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
    data = localStorage.getItem('inlineSVGdata');
    if (data) {
      insert();
      return true;
    }
  }
  try {
    request = new XMLHttpRequest();
    request.open('GET', file, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        data = request.responseText;
        insert();
        if (isLocalStorage) {
          localStorage.setItem('inlineSVGdata', data);
          localStorage.setItem('inlineSVGrev', revision);
        }
      }
    }
    request.send();
  } catch (e) {}
}(window, document));
