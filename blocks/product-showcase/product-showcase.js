/**
 * Product Showcase block.
 * Authored shape: one row (child div of the block) per product, containing
 * two child divs — an image-only div (a <picture>/<img> with no other
 * content) and a content div with an <h3> product name, a <ul> of benefit
 * bullets, and a <p> containing a "Learn More" link. decorate() tags the
 * image column (same detection idea as the columns block) and alternates
 * a row class based on index so CSS can flip the visual order at desktop
 * widths without any left/right authoring.
 * @param {Element} block The product-showcase block element
 */
export default function decorate(block) {
  [...block.children].forEach((row, index) => {
    row.classList.add(
      index % 2 === 1 ? 'product-showcase-row-reverse' : 'product-showcase-row-forward',
    );

    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is the only content in this column
          picWrapper.classList.add('product-showcase-img-col');
        }
      } else {
        col.classList.add('product-showcase-content-col');
      }
    });
  });
}
