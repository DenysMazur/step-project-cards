import Element from './element.js';

export default class Button extends Element {
  constructor(classes = [], text) {
    super();
    this.classes = classes;
    this.text = text;
  }

  createButton() {
    this.btn = super.createElement('button', this.classes, this.text);
    return this.btn;
  }

  addClass(classes = []) {
    super.addClass(this.btn, classes);
  }

}