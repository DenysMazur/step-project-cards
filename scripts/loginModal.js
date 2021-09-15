import Modal from './modal.js';
import LoginForm from './loginForm.js';
import ValidateLogin from './validateLogin.js';
import Element from './element.js';
import LocalStorageSaver from './localStorageSaver.js';
import RenderPage from './renderPage.js';
import tokenSaver from './tokenSaver.js';

export default class LoginModal extends Modal {
  constructor(title = 'Login Form', buttonText = 'Войти') {
    super(title, buttonText);
  }

  createWarningMessage(text) {
    const formContainer = document.querySelector('.modal-content');
    const warning = new Element().createElement('p', ['warning-text'], text);
    formContainer.append(warning);
  }

  async submit() {
    if (this.container.querySelector('.warning-text')) {
      this.container.querySelector('.warning-text').remove();    }
    const [email, password] = this.formData.elements;    
    this.validateLogin = new ValidateLogin(email, password);
    if (!this.validateLogin.checkData()) {
      this.formData.reset();      
      this.createWarningMessage('Input email and password');
      return;
    }
    const token = await this.validateLogin.sendRequest();

    if (token === 'Incorrect username or password') {
      this.formData.reset();
      this.validateLogin.addAlertClass();
      this.createWarningMessage(token);      
      return;
    }
    tokenSaver(token);
    const saveFlag = this.formData.elements[2].checked;
    const localStorageSaver = new LocalStorageSaver(saveFlag, token);
    localStorageSaver.saveData();
    this.hide();
    this.root.innerHTML = '';
    const renderPage = new RenderPage();
    renderPage.render(true);
  }



  hide() {
    super.hide();
    if (this.container.querySelector('.warning-text')) {
      this.container.querySelector('.warning-text').remove();
    }
    if (this.container.querySelector('.alert')) {
      this.validateLogin.removeAlertClass();
    }       
    
  }

  renderBody() {
    const form = new LoginForm();
    this.formData = form.createForm()
    return this.formData;
  }

  render() {
    const modal = super.render();    
    this.root = document.querySelector('.root');
    this.root.insertAdjacentElement('beforeend', modal);
    const modalContainer = document.querySelector('.modal-dialog');
    modalContainer.classList.add('login-modal');
  }
}