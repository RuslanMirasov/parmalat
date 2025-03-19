console.log('Hello');

const swiperYouself = new Swiper('.swiper--youself', {
  loop: false,
  initialSlide: 1,
  slidesPerView: 3,
  touchMoveStopPropagation: false,
  allowTouchMove: true,
  centeredSlides: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
