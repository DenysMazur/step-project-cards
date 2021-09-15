import Element from './element.js';

export default class Input extends Element {
  constructor(type, classes = [], placeholder, required = 'true') {
    super();
    this.type = type;
    this.placeholder = placeholder;
    this.classes = classes;
    this.required = required;
  }

  createInput() {
    const input = super.createElement('input', this.classes);
    input.setAttribute('type', this.type);
    input.setAttribute('placeholder', this.placeholder);
    input.setAttribute('required', true);
    this.checkAlertClass(input);
    return input;
  }

  checkAlertClass(input) {
    input.addEventListener('change', () => {
      if (input.value !== '') {
        input.classList.remove('alert', 'alert-danger');
      }
    })
  }
}