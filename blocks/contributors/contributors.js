// === blocks/contributors/contributors.js ===

import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((slice) => {
    const li = document.createElement('li');
    const fragment = document.createElement('div');
    fragment.append(...slice.children);

    const card = document.createElement('div');
    card.className = 'contributor';

    const img = fragment.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '164' }]);
      const picture = pic.querySelector('picture');
      if (picture) picture.removeAttribute('style');

      const wrap = document.createElement('div');
      wrap.className = 'cmp-image';
      wrap.append(pic);
      card.append(wrap);
    }

    const name = fragment.querySelector('h1,h2,h3');
    if (name) {
      const tw = document.createElement('div');
      tw.className = 'cmp-title';
      name.classList.add('cmp-title__text');
      tw.append(name.cloneNode(true));
      card.append(tw);
    }

    const role = fragment.querySelector('h4,h5,h6');
    if (role) {
      const rw = document.createElement('div');
      rw.className = 'cmp-title cmp-title--black';
      role.classList.add('cmp-title__text');
      rw.append(role.cloneNode(true));
      card.append(rw);
    }

    // === SOCIAL LINKS ===
    const links = Array.from(fragment.querySelectorAll('a'));
    if (links.length) {
      const container = document.createElement('div');
      container.className = 'social-buttons';

      links.forEach((link) => {
        const label = link.textContent.trim();
        const key = label.toLowerCase().replace(/\s+/g, '-');
        const { href } = link;

        const button = document.createElement('a');
        button.className = 'button icon-only';
        button.href = href;
        button.setAttribute('aria-label', label);

        const icon = document.createElement('span');
        icon.className = `icon icon--${key}`;
        icon.setAttribute('aria-hidden', 'true');

        button.append(icon);
        container.append(button);
      });

      card.append(container);
    }

    li.append(card);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
