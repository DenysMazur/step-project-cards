import Modal from './modal.js';
import ValidateLogin from './validateLogin.js';
import Element from './element.js';
import LocalStorageSaver from './localStorageSaver.js';
import RenderPage from './renderPage.js';
import VisitForm from './visitForm.js';
import VisitDantist from './visitDantist.js';
import VisitCardiologist from './visitCardiologist.js';
import VisitTherapist from './visitTherapist.js';

export default class VisitModal extends Modal {
  constructor(title = 'Create Visit Form', buttonText = 'Create') {
    super(title, buttonText);
  }  

  async submit() {
    if (this.container.querySelector('.warning-text')) {
      this.container.querySelector('.warning-text').remove();
    }
    const email = this.formData.elements[0].value;
    const password = this.formData.elements[1].value;    
    const validateLogin = new ValidateLogin(email, password);
    if (!validateLogin.checkData()) {
      this.formData.reset();
      const formContainer = document.querySelector('.modal-content');
      const warning = new Element().createElement('p', ['warning-text'], "Input email and password");
      formContainer.append(warning);
      return;
    }
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
    this.root.innerHTML = '';
    const renderPage = new RenderPage();
    renderPage.render(true);
  }

  hide() {
    super.hide();
    if (this.container.querySelector('.warning-text')) {
      this.container.querySelector('.warning-text').remove();
    }
    if (this.formData.querySelector('.additionalOptions')) {
      this.formData.querySelector('.additionalOptions').remove();
    }
  }

  renderBody() {
    this.form = new VisitForm();
    this.formData = this.form.createForm();
    return this.formData;
  }

  createAdditionalOptions() {
    this.div = new Element().createElement('div', ['additionalOptions']);
    const formSelectionDoctots = this.formData.elements[0];
    formSelectionDoctots.addEventListener('change', () => {
      if (this.formData.querySelector('.additionalOptions')) {
        this.formData.querySelector('.additionalOptions').remove();
      }
      if (formSelectionDoctots.value === 'Стоматолог') {
        const visitDantist = new VisitDantist();
        this.formData.append(visitDantist.receiveOptionsForm());
      } else if (formSelectionDoctots.value === 'Кардиолог') {
        const visitCardiologist = new VisitCardiologist();
        this.formData.append(visitCardiologist.receiveOptionsForm());
      } else {
        const visitTherapist = new VisitTherapist();
        this.formData.append(visitTherapist.receiveOptionsForm());
      }
      
    })

  }

  render() {
    const modal = super.render();    
    this.root = document.querySelector('.root');
    this.root.insertAdjacentElement('beforeend', modal);
    const modalContainer = document.querySelector('.modal-dialog');
    modalContainer.classList.add('visit-modal');
    this.createAdditionalOptions();
  }
}