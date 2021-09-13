import Element from './element.js';

export default class Input extends Element {
  constructor(type, placeholder) {
    super();
    this.type = type;
    this.placeholder = placeholder;
  }

  createInput() {
    const input = super.createElement('input', ['input__login']);
    input.setAttribute('type', this.type);
    input.setAttribute('placeholder', this.placeholder);
    return input;
  }
}