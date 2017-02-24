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
