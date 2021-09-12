import Button from './button.js';

export default class LoginButton extends Button {
  constructor(classes = [], text) {
    super(classes, text);
  }

  createButton() {
    const button = super.createButton();
    return button;
  }
}