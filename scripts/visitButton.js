import Button from './button.js';
import VisitModal from './visitModal.js'

export default class VisitButton extends Button{
  constructor(classes = [], text) {
    super(classes, text);
  }

  createButton() {
    const button = super.createButton();
    const createVisitModal = new VisitModal();
    createVisitModal.render();
    button.addEventListener('click', () => {
      createVisitModal.show();      
    })
    return button;
  }
}