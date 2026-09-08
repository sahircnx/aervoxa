/**
 * Hero block decoration.
 * Tags structural sub-elements that DA's authoring sanitizer does not
 * reliably preserve custom classes on (the eyebrow badge and the trust
 * checklist), then fades/slides in the headline, subtext, and CTA row
 * with a short stagger once the hero enters the viewport. Respects
 * prefers-reduced-motion by showing the content immediately with no
 * animation.
 *
 * Authoring contract (single row, single content cell), in order:
 *   1. a <picture> background image
 *   2. OPTIONAL eyebrow: a <p> whose only content is a small icon <img>
 *      followed by short label text — must be the first non-picture
 *      paragraph and must contain an <img>
 *   3. the <h1> headline (wrap the accent phrase in <em> for two-tone color)
 *   4. the subtext <p>
 *   5. one or two single-link button paragraphs (decorateButtons contract)
 *   6. OPTIONAL trust checklist: a <ul> of short items, each <li> starting
 *      with an icon <img> followed by text
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const content = block.querySelector(':scope > div') || block;

  // tag the eyebrow badge: the first <p> that contains an <img> and is not
  // a button-wrapper (buttons are wrapped in strong/em, no bare <img>)
  const firstParagraphs = [...content.querySelectorAll('p')];
  const eyebrow = firstParagraphs.find((p) => p.querySelector('img') && !p.querySelector('a'));
  if (eyebrow) eyebrow.classList.add('hero-eyebrow');

  // tag the trust checklist: a <ul> whose items each start with an <img>
  const list = content.querySelector('ul');
  if (list && list.querySelector('li img')) {
    list.classList.add('hero-trust-list');
  }

  const revealTargets = [...block.querySelectorAll('h1, p')];
  if (revealTargets.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add('hero-reveal', 'hero-reveal-visible'));
    return;
  }

  revealTargets.forEach((el, i) => {
    el.classList.add('hero-reveal');
    el.style.transitionDelay = `${i * 120}ms`;
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealTargets.forEach((el) => el.classList.add('hero-reveal-visible'));
        obs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(block);
}
