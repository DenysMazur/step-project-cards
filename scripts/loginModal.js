import Modal from './modal.js';
import LoginForm from './loginForm.js';

export default class LoginModal extends Modal {
  constructor(title = 'Login Form', buttonText = 'Войти') {
    super(title, buttonText);
  }

  render() {
    const modal = super.createModal();
    const root = document.querySelector('.root');
    root.insertAdjacentHTML('beforeend', modal);
    const modalContainer = document.querySelector('.modal-dialog')
    modalContainer.classList.add('login-modal')    
    const modalBody = root.querySelector('.modal-body');
    const form = new LoginForm();
    modalBody.innerHTML = "";   
    modalBody.insertAdjacentElement('beforeend', form.createForm());
  }
}