import Button from './button.js';
import LoginModal from './loginModal.js';
import ModalBackdrop from './modalBackdrop.js';

export default class LoginButton extends Button {
  constructor(classes = [], text) {
    super(classes, text);
  }

  createButton() {
    const button = super.createButton();
    const loginModal = new LoginModal();
    loginModal.render();
    button.addEventListener('click', () => {
      loginModal.showModal();
      const modalBackdrop = new ModalBackdrop();
      modalBackdrop.render();
    })
    return button;
  }
}