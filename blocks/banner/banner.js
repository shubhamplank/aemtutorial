/**
 * Wraps each <a> in a <div class="button-container"> and adds class="button" to the link,
 * only if not already wrapped.
 * @param {HTMLElement} block
 */
export default function decorate(block) {
  block.querySelectorAll('a[href]').forEach((link) => {
    if (!link.closest('.button-container')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'button-container';
      link.classList.add('button');

      // Insert the wrapper before the link and move the link inside it
      link.parentElement.insertBefore(wrapper, link);
      wrapper.appendChild(link);
    }
  });
}
