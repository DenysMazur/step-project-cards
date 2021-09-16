import VisitForm from './visitForm.js';
import Input from './input.js';

export default class VisitDantistForm extends VisitForm {
  constructor() {
    super()
  }

  createFormOptions() {
    super.createFormOptions();    
    const dateOfLastVisit = new Input('text', ['visit__date', 'form-control', 'mt-1'], 'Дата последнего визита');
    this.div.append(dateOfLastVisit.createInput());
  }

  createObjectForSendingDataOnServer(arrayOfData) {
    const [doctor, target, description, priority, pacient, lastvisit] = Array.from(arrayOfData);
    return {
      doctor: `${doctor.value}`,
      target: `${target.value}`,
      description: `${description.value}`,
      priority: `${priority.value}`,
      pacient: `${pacient.value}`,
      lastvisit: `${lastvisit.value}`,
    }
  }
}