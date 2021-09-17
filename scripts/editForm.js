import Input from './input.js';
import Element from './element.js';
import Select from './select.js';
import Button from './button.js';

export default class EditForm extends Element {
  constructor(currentCard) {
    super();
    this.currentCard = currentCard;
    this.placeholder = {
      target: 'Цель визита',
      description: 'Краткое описание визита',
      pacient: 'ФИО',
      age: 'Возраст',
      lastvisit: 'Дата последнего визита',
      pressure: 'Обычное давление',
      bmi: 'Индекс массы тела',
      history: 'Перенесенные заболевания сердечно-сосудистой системы'
    }
    this.doctorsOptions = ['Кардиолог', 'Стоматолог', 'Терапевт'];
    this.priorityOptions = ['Обычная', 'Приоритетная', 'Неотложная'];
  }

  render() {
    this.container = this.createElement('div', ['card', 'border-info', 'position-absolute'])
    this.container.style.width = '100%';
    this.container.style.minHeight = '100%';

    const html = `
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link bg-secondary text-white disabled" href="#">Edit Mode Form</a>          
          </li>          
        </ul>
      </div>
      <div class="card-body pb-0 pt-0">
        <form class="edit-form">          
               
        </form>
        <div class="card-body options-button-container">
        </div> 
    `
    this.container.insertAdjacentHTML('beforeend', html);
    this.targetRendering = this.currentCard.container;
    this.targetRendering.append(this.container);
    this.createFormElements();
    // this.btnContainer = this.container.querySelector('.options-button-container');
    // this.btnContainer.append(this.createSubmitButton(), this.createResetButton())
  }

  createSubmitButton() {
    const submitBtnObj = new Button(['btn', 'btn-primary'], 'Save');
    const submitBtn = submitBtnObj.createButton();
    submitBtn.type = 'submit';
    return submitBtn;
  }

  removeCurrentForm() {
    this.container.remove()
  }

  createResetButton() {
    const resetBtnObj = new Button(['btn', 'btn-secondary'], "Don't Save");
    const resetBtn = resetBtnObj.createButton();
    resetBtn.type = 'button';
    resetBtn.addEventListener('click', () => {      
      this.container.remove();
    })
    return resetBtn;
  }

  createObject() {
    if (this.form.elements[0].value === "Кардиолог") {
      const [doctor, target, description, priority, pacient, pressure, bmi, history, age] = Array.from(this.form.elements);
    return {
      doctor: `${doctor.value}`,
      target: `${target.value}`,
      description: `${description.value}`,
      priority: `${priority.value}`,
      pacient: `${pacient.value}`,
      pressure: `${pressure.value}`,
      bmi: `${bmi.value}`,
      history: `${history.value}`,
      age: `${age.value}`,
      close: false,
      id: `${this.currentCard.cardItem.id}`
    }
    } else if (this.form.elements[0].value === "Стоматолог") {
      const [doctor, target, description, priority, pacient, lastvisit] = Array.from(this.form.elements);
    return {
      doctor: `${doctor.value}`,
      target: `${target.value}`,
      description: `${description.value}`,
      priority: `${priority.value}`,
      pacient: `${pacient.value}`,
      lastvisit: `${lastvisit.value}`,
      close: false,
      id: `${this.currentCard.cardItem.id}`
    }
    } else {
      const [doctor, target, description, priority, pacient, age] = Array.from(this.form.elements);
    return {
      doctor: `${doctor.value}`,
      target: `${target.value}`,
      description: `${description.value}`,
      priority: `${priority.value}`,
      pacient: `${pacient.value}`,
      age: `${age.value}`,
      close: false,
      id: `${this.currentCard.cardItem.id}`
    }
    }
  }

  createFormElements() {
    this.form = this.targetRendering.querySelector('.edit-form'); 
    this.optionalContainer = this.createElement('div', ['form-optional', 'form-group', 'row']);
    for (const key in this.currentCard.cardItem) {     
        const div = this.createFormElementContainer();        
        if (key === 'doctor') {          
          const select = this.createElementSelect(key, [], 'Выбрать врача', this.doctorsOptions);
          select.value = this.currentCard.cardItem[key];
          this.selectChange(select)
          div.append(select);
        } else if (key === 'priority') {
          const select = this.createElementSelect(key, [], 'Выбрать приоритет визита', this.priorityOptions);
          select.value = this.currentCard.cardItem[key];
          div.append(select);
        } else if (key === 'close' || key === 'id') {
          return;
        } else if (key === 'target' || key === 'description' || key === 'pacient') {
          const input = this.createElementInput(this.placeholder[key]);
          input.value = this.currentCard.cardItem[key];
          div.append(input)
        } else {
          const input = this.createElementInput(this.placeholder[key]);
          input.value = this.currentCard.cardItem[key];
          this.optionalContainer.insertAdjacentElement('beforeend', input);
        }
        
        this.form.append(div, this.optionalContainer);
        if (div.innerHTML === '') {
          div.remove();
        }      
    }
  }

  selectChange(select) {
    select.addEventListener('change', () => {
      const value = select.value
      this.form.reset()
      select.value = value;
      this.deleteOptionalElements()
      if (value === 'Кардиолог') {
        this.optionalContainer.append(this.createElementInput(this.placeholder.pressure), this.createElementInput(this.placeholder.bmi), this.createElementInput(this.placeholder.history), this.createElementInput(this.placeholder.age))
      } else if (value === 'Стоматолог') {
        this.optionalContainer.append(this.createElementInput(this.placeholder.lastvisit))
      } else {
        this.optionalContainer.append(this.createElementInput(this.placeholder.age))
      }
    })
  }

  deleteOptionalElements() {
    this.optionalContainer.innerHTML = '';
  }

  createFormElementContainer() {
    const div = this.createElement('div', ['form-group', 'row']);
    return div;
  }

  createElementInput(placeholder) {
    const inputObj = new Input('text', [], placeholder);
    const input = inputObj.createInput();
    return input;
  }

  createElementSelect(name, [], defaultValue, options) {
    const selectObj = new Select(name, [], defaultValue, options);
    const select = selectObj.createSelect();
    return select;
  }
}