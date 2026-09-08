/**
 * Hero block scroll-reveal.
 * Fades/slides in the headline, subtext, and CTA row with a short stagger
 * once the hero enters the viewport. Respects prefers-reduced-motion by
 * showing the content immediately with no animation.
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
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
