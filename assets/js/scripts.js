const refs = {
  youselfSlider: document.querySelector('.swiper--youself'),
  expertsSlider: document.querySelector('.swiper--experts'),
};

// ----------------------- SECTION EXPERTS FUNCTIONS
//--- init slider
const swiperExperts = new Swiper(refs.expertsSlider, {
  loop: false,
  autoHeight: true,
  slidesPerView: 1,
  touchMoveStopPropagation: false,
  allowTouchMove: true,
  centeredSlides: true,
  speed: 600,
  navigation: {
    nextEl: '.experts-next',
    prevEl: '.experts-prev',
  },
});
// ----------------------- SECTION YOUSELF FUNCTIONS

//--- close card
const youselfCardClose = card => {
  if (!card) return;
  const button = card.querySelector('.button');
  const picture = card.querySelector('picture');
  const info = card.querySelector('.youself-card__info');
  info.style.height = '0px';
  picture.style.paddingTop = '87%';
  picture.style.marginBottom = '45px';
  button.innerText = 'Подробнее';
};

//--- toggle card
const youselfCardToggle = e => {
  const button = e.target;
  if (!button || button.dataset.js !== 'show_youself') return;

  const card = button.closest('.youself-card');
  const picture = card.querySelector('picture');
  const info = card.querySelector('.youself-card__info');

  if (button.innerText !== 'Свернуть') {
    info.style.height = info.scrollHeight + 'px';
    picture.style.paddingTop = '0%';
    picture.style.marginBottom = '0px';
    button.innerText = 'Свернуть';
    return;
  }

  youselfCardClose(card);
};

//--- init slider
const swiperYouself = new Swiper(refs.youselfSlider, {
  loop: false,
  initialSlide: 1,
  slidesPerView: 3,
  touchMoveStopPropagation: false,
  allowTouchMove: true,
  centeredSlides: true,
  speed: 600,
  navigation: {
    nextEl: '.youself-next',
    prevEl: '.youself-prev',
  },
  on: {
    slideChange: function () {
      const swiper = this;
      const prevSlide = swiper.slides[swiper.previousIndex];
      const deactivatedCard = prevSlide.querySelector('.youself-card');
      youselfCardClose(deactivatedCard);
    },
  },
});

refs?.youselfSlider.addEventListener('click', youselfCardToggle);
