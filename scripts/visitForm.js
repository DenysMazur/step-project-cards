import Element from './element.js';
import Input from './input.js';
import Select from './select.js';

export default class VisitForm extends Element{
  constructor(){
    super();
    this.doctorsSelect = ['Кардиолог', 'Стоматолог', 'Терапевт'];
  }

  createForm() {
    this.form = super.createElement('form', ['form-group']);
    const doctorsChoise = new Select('doctors', ['form__doctors', 'form-control', 'select', 'mt-1'], 'Выбрать врача', this.doctorsSelect, false);
    this.form.append(doctorsChoise.createSelect());    
    return this.form;
  }

  receiveOptionsForm() {
    this.div = new Element().createElement('div', ['additionalOptions']);
    this.createFormOptions();
    return this.div;
  }

  createFormOptions() {
    const targetVisit = new Input('text', ['visit__target', 'form-control', 'mt-1'], 'Цель визита');
    const descriptionVisit = new Input('text', ['visit__description', 'form-control', 'mt-1'], 'Краткое описание визита', false);
    const priorityVisit = new Select('priority', ['form__priority', 'form-control', 'select', 'mt-1'], 'Выбрать приоритет визита', ['Обычная', 'Приоритетная', 'Неотложная']);
    const pacient = new Input('text', ['visit__pacient', 'form-control', 'mt-1'], 'ФИО');
    this.div.append(targetVisit.createInput(), descriptionVisit.createInput(), priorityVisit.createSelect(), pacient.createInput());
  }
}