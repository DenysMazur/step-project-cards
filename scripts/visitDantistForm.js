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
}