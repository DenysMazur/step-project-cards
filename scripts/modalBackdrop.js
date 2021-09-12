import Element from './element.js'

export default class ModalBackdrop extends Element {
  constructor() {
    super();
  }

  render() {
     this.currentDiv = super.createElement('div', ['modal-backdrop', 'fade', 'show']);
     document.body.insertAdjacentElement('afterend', this.currentDiv);
  }
}