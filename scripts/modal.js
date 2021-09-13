import Element from './element.js';
import ModalBackdrop from './modalBackdrop.js';

export default class Modal extends Element{
  constructor(title = '', buttonText = 'Save changes') {
    super();
    this.title = title;
    this.buttonText = buttonText;
  }

  show() {
    this.container.classList.add('show');
    this.container.style.display = 'block';
    document.body.classList.add('modal-open');
    this.modalBackdrop = new ModalBackdrop();
    this.modalBackdrop.render();
  }

  hide() {
    this.container.classList.remove('show');
    this.container.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.modalBackdrop.removeModalBackdrop();
  }

  renderBody() {
    return '...'
  }
  
  render() {
    this.container = this.createElement('div', ['modal', 'fade']);


    const html = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${this.title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="btn__close" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">${this.buttonText}</button>
          </div>
        </div>
      </div>    
    `
    this.container.insertAdjacentHTML('beforeend', html);
    const modalBody = this.container.querySelector('.modal-body');
    modalBody.append(this.renderBody());
    this.close = this.container.querySelector('.btn__close');
    this.container.addEventListener('click', (event) => {
      if (event.target === this.container || event.target === this.close) {
        this.hide();
      }          
    })    
    return this.container
  }
}