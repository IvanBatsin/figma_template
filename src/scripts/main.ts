import '../styles/main.scss';

// Swiper
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';

document.querySelector('.faq-accordion')!.addEventListener('click', event => {
  const closestElem: HTMLLIElement | null = (event.target as HTMLDivElement).closest('.faq-accordion_item');
  
  if (closestElem) {
    closestElem.classList.toggle('faq-accordion_item_active');
  }
});

document.querySelector('.btn-burger')!.addEventListener('click', () => {
  const sectionHeader: HTMLDivElement = document.querySelector('.section-header')!;
  sectionHeader.classList.toggle('section-header_active-nav');

  if (sectionHeader.classList.contains('section-header_active-nav')) {
    hideScroll();
  } else {
    showScroll();
  }
}); 

const hideScroll = (): void => {
  const scrollWidth: string = `${getScrollBarWidth()}px`;
  document.body.style.paddingRight = scrollWidth;
  document.body.style.overflow = 'hidden';

  (document.querySelector('#main-navigation') as HTMLDivElement).style.paddingRight = scrollWidth;
}

const showScroll = (): void => {
  document.body.style.paddingRight = ``;
  document.body.style.overflow = 'visible';

  (document.querySelector('#main-navigation') as HTMLDivElement).style.paddingRight = '';
}

const getScrollBarWidth = (): number => {
  const outer: HTMLDivElement = document.createElement('div');

  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  outer.style.width = '50px';
  outer.style.height = '50px';
  outer.style.overflow = 'scroll';
  outer.style.visibility = 'hidden';

  document.body.appendChild(outer);
  let scrollWidth: number = outer.offsetWidth - outer.clientWidth;
  document.body.removeChild(outer);

  return scrollWidth;
}

const resetNav = (): void => {
  document.querySelector('.section-header')!.classList.remove('section-header_active-nav');
  showScroll();
}


const swiperHeroImage = new Swiper('.section-hero-image', {
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.dots',
    clickable: true,
    dynamicBullets: true
  }
});

const swiperBlog = new Swiper('.slider-blog-wrapper', {
  direction: 'horizontal',
  loop: true,
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
});


window.addEventListener('resize', resetNav);