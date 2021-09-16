import Modal from './modal.js';
import LoginForm from './loginForm.js';
import ValidateLogin from './validateLogin.js';
import StorageSaver from './storageSaver.js';
import RenderPage from './renderPage.js';

export default class LoginModal extends Modal {
  constructor(title = 'Login Form', buttonText = 'Войти') {
    super(title, buttonText);
  }  

  async submit() {
    if (this.container.querySelector('.warning-text')) {
      this.container.querySelector('.warning-text').remove();
    }
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
    const saveFlag = this.formData.elements[2].checked;
    const storageSaver = new StorageSaver(saveFlag, token);
    storageSaver.saveData();
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
    if (this.container.querySelector('.alert-danger')) {
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
    const modalContainer = modal.querySelector('.modal-dialog');
    modalContainer.classList.add('login-modal');
  }
}