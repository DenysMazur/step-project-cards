import Modal from './modal.js';
import LoginForm from './loginForm.js';
import ValidateLogin from './validateLogin.js';
import Element from './element.js';
import LocalStorageSaver from './localStorageSaver.js';

export default class LoginModal extends Modal {
  constructor(title = 'Login Form', buttonText = 'Войти') {
    super(title, buttonText);
  }

  async submit() {
    if (this.container.querySelector('.warning-text')) {
      this.container.querySelector('.warning-text').remove();
    }
    const email = this.formData.elements[0].value;
    const password = this.formData.elements[1].value;    
    const validateLogin = new ValidateLogin(email, password);
    const token = await validateLogin.sendRequest();
    if (token === 'Incorrect username or password') {
      this.formData.reset();
      const formContainer = document.querySelector('.modal-content');
      const warning = new Element().createElement('p', ['warning-text'], token);
      formContainer.append(warning);
      return;
    }
    const saveFlag = this.formData.elements[2].checked;
    const localStorageSaver = new LocalStorageSaver(saveFlag, token);
    localStorageSaver.saveData();
    this.hide();
  }

  hide() {
    super.hide();
    if (this.container.querySelector('.warning-text')) {
      this.container.querySelector('.warning-text').remove();
    }
  }

  renderBody() {
    const form = new LoginForm();
    this.formData = form.createForm()
    return this.formData;
  }

  render() {
    const modal = super.render();    
    const root = document.querySelector('.root');
    root.insertAdjacentElement('beforeend', modal);
    const modalContainer = document.querySelector('.modal-dialog');
    modalContainer.classList.add('login-modal');
  }
}