import Button from './button.js';

export default class CreateVisitButton extends Button{
  constructor(classes = [], text) {
    super(classes, text);
  }

  createButton() {
    const button = super.createButton();
    // const loginModal = new LoginModal();
    // loginModal.render();
    button.addEventListener('click', () => {
      // loginModal.show();      
    })
    return button;
  }
}