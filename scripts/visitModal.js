import Modal from './modal.js';
import ValidateCreateVisit from './validateCreateVisit.js';
import Element from './element.js';
import VisitForm from './visitForm.js';
import VisitDantistForm from './visitDantistForm.js';
import VisitCardiologistForm from './visitCardiologistForm.js';
import VisitTherapistForm from './visitTherapistForm.js';


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
    this.cheackChangesInForm();
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
    const doctor = this.formData.elements[0].value
    if (doctor === 'Стоматолог') {
      this.cardObject = this.visitDantist.createObjectForSendingDataOnServer(this.formData.elements);
    } else if (doctor === 'Кардиолог') {
      this.cardObject = this.visitCardiologist.createObjectForSendingDataOnServer(this.formData.elements);
    } else {
      this.cardObject = this.visitTherapist.createObjectForSendingDataOnServer(this.formData.elements);
    }

    const data = await this.validateCreateVisit.sendRequest(this.cardObject);
    //если объект получен и все ок, добавить его на страницу New Card().render() и добавить id в массив
    this.hide();
  }

  show() {
    super.show();
    document.body.style.paddingRight = '17px';
  }

  hide() {
    super.hide();
    this.createButton.disabled = true;
    document.body.removeAttribute('style');
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
        this.visitDantist = new VisitDantistForm();
        this.formData.append(this.visitDantist.receiveOptionsForm());
      } else if (formSelectionDoctots.value === 'Кардиолог') {
        this.visitCardiologist = new VisitCardiologistForm();
        this.formData.append(this.visitCardiologist.receiveOptionsForm());
      } else {
        this.visitTherapist = new VisitTherapistForm();
        this.formData.append(this.visitTherapist.receiveOptionsForm());
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