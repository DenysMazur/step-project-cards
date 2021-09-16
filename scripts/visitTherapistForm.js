import VisitForm from "./visitForm.js";
import Input from './input.js';

export default class VisitTherapistForm extends VisitForm {
  constructor() {
    super();
  }

  createFormOptions() {
    super.createFormOptions();    
    const ageOfClient = new Input('text', ['visit__client-age', 'form-control', 'mt-1'], 'Возраст');
    this.div.append(ageOfClient.createInput());
  }

  createObjectForSendingDataOnServer(arrayOfData) {
    const [doctor, target, description, priority, pacient, age] = Array.from(arrayOfData);
    return {
      doctor: `${doctor.value}`,
      target: `${target.value}`,
      description: `${description.value}`,
      priority: `${priority.value}`,
      pacient: `${pacient.value}`,
      age: `${age.value}`,
    }
  }
}