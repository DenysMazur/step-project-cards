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
}