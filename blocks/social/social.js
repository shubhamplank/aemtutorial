export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'social-buttons';

  [...block.querySelectorAll('a')].forEach((link) => {
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

  block.innerHTML = '';
  block.append(container);
}
