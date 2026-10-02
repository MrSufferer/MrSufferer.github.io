const dialog = document.getElementById('screenshot-dialog');
const preview = document.getElementById('dialog-image');
let trigger;
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    trigger = button;
    preview.src = button.dataset.image;
    preview.alt = button.querySelector('img').alt;
    dialog.classList.toggle('sequence-dialog', button.dataset.image.endsWith('.svg'));
    document.getElementById('dialog-title').textContent = button.dataset.name;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.getElementById('close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  trigger?.focus();
});
document.getElementById('year').textContent = new Date().getFullYear();
