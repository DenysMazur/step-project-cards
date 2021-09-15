import Modal from './modal.js';
import ValidateCreateVisit from './validateCreateVisit.js';
import Element from './element.js';
import RenderPage from './renderPage.js';
import VisitForm from './visitForm.js';
import VisitDantist from './visitDantist.js';
import VisitCardiologist from './visitCardiologist.js';
import VisitTherapist from './visitTherapist.js';


export default class VisitModal extends Modal {
  constructor(title = 'Create Visit Form', buttonText = 'Create') {
    super(title, buttonText);
  }
  
  setWarningData() {
    this.createButton = this.modal.querySelector('.btn');
    this.createButton.disabled = true;
    this.createWarningMessage('For continue to select one of the doctor');    
  }

  validateData(formElements) {
    this.validateCreateVisit = new ValidateCreateVisit();
    this.validateCreateVisit.addAlertClassToElements(formElements);
    this.cheackChangesInForm()
  }

  cheackChangesInForm() {
    const form = document.querySelector('.form-group');
    form.addEventListener('change', () => {      
      if (!form.querySelector('.alert-danger')) {
        this.createButton.disabled = false;
      }
    })
  }
  
  async submit() {
    
    

    

    // const [email, password] = this.formData.elements;    
    // this.validateLogin = new ValidateLogin(email, password);
    // if (!this.validateLogin.checkData()) {
    //   this.formData.reset();      
    //   this.createWarningMessage('Input email and password');
    //   return;
    // }
    // const token = await this.validateLogin.sendRequest();

    // if (token === 'Incorrect username or password') {
    //   this.formData.reset();
    //   this.validateLogin.addAlertClass();
    //   this.createWarningMessage(token);      
    //   return;
    // }
    // tokenSaver(token);
    // const saveFlag = this.formData.elements[2].checked;
    // const localStorageSaver = new LocalStorageSaver(saveFlag, token);
    // localStorageSaver.saveData();
    // this.hide();
    // this.root.innerHTML = '';
    // const renderPage = new RenderPage();
    // renderPage.render(true);
  }

  hide() {
    super.hide();
    this.createButton.disabled = true;
    if (this.container.querySelector('.warning-text')) {
      this.changeWarningMessage("For continue to select one of the doctor");
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
      this.createButton.disabled = true;
      this.changeWarningMessage("Fill all required fields indicated in red background");
      this.validateData(this.formData.elements);
    })

  }

  render() {
    this.modal = super.render();    
    this.root = document.querySelector('.root');
    this.root.insertAdjacentElement('beforeend', this.modal);
    const modalContainer = this.modal.querySelector('.modal-dialog');
    modalContainer.classList.add('visit-modal');
    this.setWarningData();
    this.createAdditionalOptions();
  }
}