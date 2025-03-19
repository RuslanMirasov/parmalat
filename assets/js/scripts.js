const refs = {
  youselfSlider: document.querySelector('.swiper--youself'),
  youselfNextBtn: document.querySelector('.youself-next'),
  youselfPrevBtn: document.querySelector('.youself-prev'),
  expertsSlider: document.querySelector('.swiper--experts'),
  productsSlider: document.querySelector('.swiper--products'),
};

// ----------------------- SECTION EXPERTS FUNCTIONS

// ----------------------- SECTION YOUSELF FUNCTIONS

function hasOpenYouselfCard() {
  return !!refs.youselfSlider.querySelector('.youself-card.open');
}

function closeYouselfCard(callback = () => {}) {
  const openCard = refs.youselfSlider.querySelector('.youself-card.open');

  if (!openCard) {
    callback();
    return;
  }

  const button = openCard.querySelector('.button');
  const picture = openCard.querySelector('picture');
  const info = openCard.querySelector('.youself-card__info');

  openCard.classList.remove('open');
  info.style.height = '0px';
  picture.style.paddingTop = '87%';
  picture.style.marginBottom = '45px';
  button.innerText = 'Подробнее';

  setTimeout(() => {
    callback();
  }, 200);
}

const youselfCardToggle = e => {
  const button = e.target;
  if (!button || button.dataset.js !== 'show_youself') return;

  const card = button.closest('.youself-card');
  const picture = card.querySelector('picture');
  const info = card.querySelector('.youself-card__info');

  if (!card.classList.contains('open')) {
    card.classList.add('open');
    info.style.height = info.scrollHeight + 'px';
    picture.style.paddingTop = '0%';
    picture.style.marginBottom = '0px';
    button.innerText = 'Свернуть';
    return;
  }

  closeYouselfCard();
};

function updateNavigation(swiper) {
  refs.youselfNextBtn.classList.toggle('swiper-button-disabled', swiper.isEnd);
  refs.youselfPrevBtn.classList.toggle('swiper-button-disabled', swiper.isBeginning);
}

refs.youselfNextBtn.addEventListener('click', e => {
  if (hasOpenYouselfCard()) {
    closeYouselfCard(() => swiperYouself.slideNext());
    return;
  }
  swiperYouself.slideNext();
});

refs.youselfPrevBtn.addEventListener('click', e => {
  if (hasOpenYouselfCard()) {
    closeYouselfCard(() => swiperYouself.slidePrev());
    return;
  }
  swiperYouself.slidePrev();
});

// ----------------------- SECTION PRODUCTS FUNCTIONS

const setSlideColor = swiper => {
  const prevCard = swiper.slides[swiper.previousIndex].querySelector('.product-card') || null;
  if (prevCard) {
    prevCard.querySelector('.product-cart__info').style.height = '0px';
    prevCard.style.backgroundColor = '';
  }

  const card = swiper.slides[swiper.activeIndex].querySelector('.product-card') || null;
  const info = card.querySelector('.product-cart__info');
  if (card) {
    card.style.backgroundColor = card.dataset.color;
    info.style.height = info.scrollHeight + 'px';
  }
};

//--- init sliders
const swiperYouself = new Swiper(refs.youselfSlider, {
  initialSlide: 1,
  slidesPerView: 3,
  touchMoveStopPropagation: false,
  allowTouchMove: true,
  centeredSlides: true,
  speed: 600,
  on: {
    init: swiper => updateNavigation(swiper),
    slideChange: swiper => {
      updateNavigation(swiper);
      closeYouselfCard();
    },
  },
});

const productsSlider = new Swiper(refs.productsSlider, {
  slidesPerView: 'auto',
  initialSlide: 1,
  centeredSlides: true,
  speed: 600,
  navigation: {
    nextEl: '.products-next',
    prevEl: '.products-prev',
  },
  on: {
    init: swiper => setSlideColor(swiper),
    slideChange: swiper => setSlideColor(swiper),
  },
});

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

refs?.youselfSlider.addEventListener('click', youselfCardToggle);
