import Modal from './modal.js';
import LoginForm from './loginForm.js';

export default class LoginModal extends Modal {
  constructor(title = 'Login Form', buttonText = 'Войти') {
    super(title, buttonText);
  }
  renderBody() {
    const form = new LoginForm();
    return form.createForm();
  }

  render() {
    const modal = super.render();    
    const root = document.querySelector('.root');
    root.insertAdjacentElement('beforeend', modal);
    const modalContainer = document.querySelector('.modal-dialog');
    modalContainer.classList.add('login-modal');
  }
}