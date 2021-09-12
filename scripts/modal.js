import Element from './element.js';

export default class Modal {
  constructor(title = '', buttonText = 'Save changes') {
    this.title = title;
    this.buttonText = buttonText;
  }
  
  createModal() {
    return `<div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${this.title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="span-close" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">${this.buttonText}</button>
        </div>
      </div>
    </div>
  </div>`
  }
}