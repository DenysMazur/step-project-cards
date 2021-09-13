import Element from './element.js';

export default class Input extends Element {
  constructor(type, classes = [], placeholder) {
    super();
    this.type = type;
    this.placeholder = placeholder;
    this.classes = classes
  }

  createInput() {
    const input = super.createElement('input', this.classes);
    input.setAttribute('type', this.type);
    input.setAttribute('placeholder', this.placeholder);
    return input;
  }
}