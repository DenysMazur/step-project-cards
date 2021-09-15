import VisitForm from './visitForm.js';
import Input from './input.js';

export default class VisitCardiologistForm extends VisitForm {
  constructor() {
    super();
  }

  createFormOptions() {
    super.createFormOptions();
    const pressure = new Input('text', ['visit__client-pessure', 'form-control', 'mt-1'], 'Обычное давление');
    const BMI = new Input('text', ['visit__client-bmi', 'form-control', 'mt-1'], 'Индекс массы тела');
    const historyOfSickness = new Input('text', ['visit__client-bmi', 'form-control', 'mt-1'], 'Перенесенные заболевания сердечно-сосудистой системы');
    const ageOfClient = new Input('text', ['visit__client-age', 'form-control', 'mt-1'], 'Возраст');
    this.div.append(pressure.createInput(), BMI.createInput(), historyOfSickness.createInput(), ageOfClient.createInput());
  }

}