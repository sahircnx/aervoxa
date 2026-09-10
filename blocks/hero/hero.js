import { createOptimizedPicture } from '../../scripts/aem.js';
import { customDecoreateIcons } from '../../scripts/decorate-icon-helper.js';
import { getTextLabel } from '../../scripts/scripts.js';

const addPauseButton = (block) => {
  const pauseButton = document.createElement('button');
  pauseButton.classList.add('hero-pause-button');
  pauseButton.setAttribute('aria-label', getTextLabel('pause'));
  pauseButton.innerHTML = `
    <span class="icon icon-pause"></span>
    <span class="icon icon-play hidden"></span>
  `;

  pauseButton.addEventListener('click', () => {
    const video = block.querySelector('video');
    const [pauseIcon, playIcon] = pauseButton.querySelectorAll('span');

    if (video.paused) {
      video.play();
      pauseIcon.classList.remove('hidden');
      playIcon.classList.add('hidden');
      pauseButton.setAttribute('aria-label', getTextLabel('pause'));
    } else {
      video.pause();
      pauseIcon.classList.add('hidden');
      playIcon.classList.remove('hidden');
      pauseButton.setAttribute('aria-label', getTextLabel('play'));
    }
  });

  customDecoreateIcons(pauseButton);
  block.append(pauseButton);
};

const addScrollIcon = (block) => {
  const scrollEl = document.createElement('span');
  scrollEl.classList.add('hero-scroll-icon');
  scrollEl.innerHTML = '<span class="icon icon-arrow-down"></span>';

  customDecoreateIcons(scrollEl);
  block.append(scrollEl);
};

const addLogoFlag = (block) => {
  const flagEl = document.createElement('span');
  flagEl.classList.add('hero-flag');
  flagEl.innerHTML = `
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.351562" width="14.2857" height="80" fill="#ED1C24"/>
      <rect x="28.5714" y="0.351562" width="14.2857" height="80" fill="#ED1C24"/>
      <rect x="57.1429" y="0.351562" width="14.2857" height="80" fill="white"/>
      <rect x="85.7143" y="0.351562" width="14.2857" height="80" fill="white"/>
    </svg>
  `;
  customDecoreateIcons(flagEl);
  block.append(flagEl);
};

const calcTimeLeft = (eventDate) => {
  const currentDate = new Date();
  const timeDiff = eventDate - currentDate;
  const DAY = 24 * 60 * 60 * 1000; // day in miliseconds
  const HOUR = 60 * 60 * 1000; // hour in miliseconds
  const MINUTE = 60 * 1000; // minute in miliseconds

  if (timeDiff < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
    };
  }

  const days = Math.floor(timeDiff / DAY);
  const hours = Math.floor((timeDiff % DAY) / HOUR);
  const minutes = Math.floor((timeDiff % HOUR) / MINUTE);

  return {
    days,
    hours,
    minutes,
  };
};

const generateTimeElements = (block) => {
  const timeElements = document.createRange().createContextualFragment(`
    <div class="hero-countdown">
        <div class="hero-time">
          <div class="hero-days"></div>
          <div class="hero-days-label"></div>
        </div>
        <div>:</div>
        <div class="hero-time">
          <div class="hero-hours"></div>
          <div class="hero-hours-label"></div>
        </div>
        <div>:</div>
        <div class="hero-time">
          <div class="hero-minutes"></div>
          <div class="hero-minutes-label"></div>
        </div>
      </div>
    </div>
  `);
  const mountPoint = [...block.querySelectorAll('p')].find((el) => el.textContent.toUpperCase() === '%TIME%');

  if (!mountPoint) {
    // eslint-disable-next-line no-console
    console.error('Hero block: The mount point for countdown not found. Plase make sure you put %TIME% in the separate paragraph!!!');
  }

  mountPoint.replaceWith(timeElements.children[0]);
};

const startCountdown = (block, eventDate) => {
  const MINUTE_IN_MILISECONDS = 60000;
  const daysEl = block.querySelector('.hero-days');
  const hoursEl = block.querySelector('.hero-hours');
  const minutesEl = block.querySelector('.hero-minutes');
  const daysLabel = block.querySelector('.hero-days-label');
  const hoursLabel = block.querySelector('.hero-hours-label');
  const minutesLabel = block.querySelector('.hero-minutes-label');

  const updateCountdow = () => {
    const { days, hours, minutes } = calcTimeLeft(eventDate);

    daysEl.textContent = days < 10 ? `0${days}` : days;
    hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    daysLabel.textContent = getTextLabel(days > 1 ? 'days' : 'day');
    hoursLabel.textContent = getTextLabel(hours > 1 ? 'hours' : 'hour');
    minutesLabel.textContent = getTextLabel(minutes > 1 ? 'minutes' : 'minute');
  };

  setInterval(updateCountdow, MINUTE_IN_MILISECONDS);
  updateCountdow();
};

const SLIDE_INTERVAL = 5000; // ms between auto-advances

/**
 * Build an auto-advancing background carousel from the hero's pictures.
 * Slides are stacked and cross-faded; the hero text stays overlaid on top.
 * Adds dot controls, pauses on hover/focus, and honours reduced-motion.
 * @param {Element} block the .hero.carousel block
 * @param {Element} firstCell the hero's first content cell
 */
function buildCarousel(block, firstCell) {
  const pictures = [...firstCell.querySelectorAll('picture')];
  if (pictures.length === 0) return;

  const track = document.createElement('div');
  track.className = 'hero-carousel';

  pictures.forEach((picture, i) => {
    const img = picture.querySelector('img');
    const optimized = createOptimizedPicture(img.src, img.alt || '', i === 0, [{ width: '2000' }]);
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    if (i === 0) slide.classList.add('active');
    slide.append(optimized);
    track.append(slide);
    // remove the original authored picture (and its wrapping <p> if empty)
    const wrap = picture.closest('p');
    picture.remove();
    if (wrap && !wrap.textContent.trim() && !wrap.querySelector('picture, img')) wrap.remove();
  });

  firstCell.prepend(track);

  const slides = [...track.children];
  if (slides.length < 2) return; // nothing to rotate

  const dots = document.createElement('div');
  dots.className = 'hero-dots';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dots.append(dot);
  });
  block.append(dots);

  let current = 0;
  const dotEls = [...dots.children];
  const show = (next) => {
    slides[current].classList.remove('active');
    dotEls[current].classList.remove('active');
    current = (next + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotEls[current].classList.add('active');
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    dotEls.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    return;
  }

  let timer = setInterval(() => show(current + 1), SLIDE_INTERVAL);
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), SLIDE_INTERVAL);
  };

  dotEls.forEach((dot, i) => dot.addEventListener('click', () => { show(i); restart(); }));
  block.addEventListener('mouseenter', () => clearInterval(timer));
  block.addEventListener('mouseleave', restart);
  block.addEventListener('focusin', () => clearInterval(timer));
  block.addEventListener('focusout', restart);
}

export default function decorate(block) {
  const firstCell = block.querySelector(':scope > div > div');
  const video = firstCell.querySelector('video');
  const headings = firstCell.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const links = firstCell.querySelectorAll('a');
  const dateEl = block.querySelector(':scope > div:nth-child(2) > div');
  const isCarousel = block.classList.contains('carousel');

  if (isCarousel) {
    buildCarousel(block, firstCell);
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('hero-text-wrapper', 'dark');
    textWrapper.append(...firstCell.querySelectorAll(':scope > *:not(.hero-carousel)'));
    firstCell.append(textWrapper);
    headings.forEach((h) => { h.classList.add('h1'); });
    links.forEach((link, index) => { link.classList.add(index ? 'secondary' : 'primary'); });
    return;
  }

  const picturesArr = firstCell.querySelectorAll('picture');

  picturesArr.forEach((picture, i) => {
    const img = picture.querySelector('img');
    const pictureEl = createOptimizedPicture(img.src, '', false, [{ width: window.innerWidth }]);
    firstCell.append(pictureEl);

    if (i > 0) {
      block.classList.add('hero-multiple-images');
    }

    if (i === (picturesArr.length - 1) && picture.parentElement.tagName === 'P') {
      picture.parentElement.remove();
    }
  });

  if (video) {
    video.parentElement.classList.add('video-wrapper');
    addPauseButton(block);
  }

  const textWrapper = document.createElement('div');
  textWrapper.classList.add('hero-text-wrapper', 'dark');
  textWrapper.append(...firstCell.querySelectorAll(':scope > *:not(picture, video)'));

  firstCell.append(textWrapper);
  headings.forEach((h) => { h.classList.add('h1'); });
  links.forEach((link, index) => { link.classList.add(index ? 'secondary' : 'primary'); });

  addScrollIcon(block);
  addLogoFlag(block);

  if (dateEl) {
    let date;
    try {
      date = new Date(dateEl.textContent);
      dateEl.remove();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('The 2nd row of data for the hero block should be a date.');
      return;
    }

    block.classList.add('countdown');
    generateTimeElements(block);
    startCountdown(block, date);
  }
}
