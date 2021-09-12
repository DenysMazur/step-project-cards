import Modal from './modal.js';
import LoginForm from './loginForm.js';

export default class LoginModal extends Modal {
  constructor(title = 'Login Form', buttonText = 'Войти') {
    super(title, buttonText);
  }
  hideModal() {
    this.modalContainer.addEventListener('click', event => {
      if (event.target === this.modalContainer || event.target.classList.contains('span-close')) {
        this.modalContainer.classList.toggle('show');
        this.modalContainer.style.display = 'none';
        const modalBackdrop = document.querySelector('.modal-backdrop');
        modalBackdrop.remove();
      }
    })
  }

  showModal() {    
    this.modalContainer.classList.toggle('show');
    this.modalContainer.style.display = 'block';    
  }


  render() {
    const modal = super.createModal();
    const root = document.querySelector('.root');
    root.insertAdjacentHTML('beforeend', modal);
    this.modalContainer = document.querySelector('.modal')
    this.modalContainer.classList.add('modal-open')
    const modalContentContainer = document.querySelector('.modal-dialog')
    modalContentContainer.classList.add('login-modal')    
    const modalBody = root.querySelector('.modal-body');
    const form = new LoginForm();
    modalBody.innerHTML = "";   
    modalBody.insertAdjacentElement('beforeend', form.createForm());
    this.hideModal();
  }
}