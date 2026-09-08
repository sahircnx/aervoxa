/**
 * Features Grid block.
 * Authored shape: one row (child div of the block) per feature, containing
 * exactly two child divs — the first holds the icon/media, the second holds
 * the title (as text, any heading/paragraph) followed by the description
 * paragraph. decorate() reshapes the row-divs into a semantic <ul>/<li>
 * grid with proper heading levels and wires up an optional stagger-reveal
 * animation on scroll.
 * @param {Element} block The features-grid block element
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'features-grid-list';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.className = 'features-grid-item';
    while (row.firstElementChild) li.append(row.firstElementChild);

    [...li.children].forEach((div, i) => {
      if (i === 0) {
        div.className = 'features-grid-icon';
        div.setAttribute('aria-hidden', 'true');
      } else {
        div.className = 'features-grid-body';
        const heading = div.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          const h3 = document.createElement('h3');
          h3.append(...heading.childNodes);
          heading.replaceWith(h3);
        }
      }
    });

    ul.append(li);
  });

  block.replaceChildren(ul);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [...ul.children];

  if (prefersReducedMotion || items.length === 0) {
    items.forEach((item) => item.classList.add('features-grid-visible'));
    return;
  }

  items.forEach((item, i) => {
    item.classList.add('features-grid-reveal');
    item.style.transitionDelay = `${i * 90}ms`;
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('features-grid-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach((item) => observer.observe(item));
}
