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
 *   2. OPTIONAL eyebrow: a short-label <p> before the <h1> — an icon <img>
 *      inside it is optional (text-only eyebrows are supported too, since
 *      not every DA-authored image survives the AEM image pipeline)
 *   3. the <h1> headline (wrap the accent phrase in <em> for two-tone color)
 *   4. the subtext <p>
 *   5. one or two single-link button paragraphs (decorateButtons contract)
 *   6. OPTIONAL trust checklist: a <ul> of short items — an icon <img> per
 *      <li> is optional, same reasoning as the eyebrow
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  const content = block.querySelector(':scope > div') || block;

  // tag the eyebrow badge: the first <p> child that appears before the
  // <h1> and is not a button-wrapper (buttons are wrapped in strong/em) —
  // works whether or not it contains an icon <img>
  const children = [...content.children];
  const headingIndex = children.findIndex((el) => el.tagName === 'H1');
  const eyebrow = headingIndex > -1
    ? children.slice(0, headingIndex).find((el) => el.tagName === 'P' && !el.querySelector('a'))
    : null;
  if (eyebrow) eyebrow.classList.add('hero-eyebrow');

  // tag the trust checklist: the <ul> inside the hero content, if any —
  // works whether or not each <li> contains an icon <img>
  const list = content.querySelector('ul');
  if (list) {
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
