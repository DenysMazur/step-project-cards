import Element from './element.js';

export default class Select extends Element {
  constructor(name, classes = [], defaultValue, options = [], required = true) {
    super();
    this.name = name;
    this.defaultValue = defaultValue;
    this.classes = classes;
    this.options = options;
    this.required = required;
  }

  createSelect() {
    const select = super.createElement('select', this.classes);    
    select.setAttribute('name', this.name);
    if (this.required) {
      select.setAttribute('required', this.required);
    } 
    select.append(this.createDefaultValue());
    this.options.forEach(option => {
      const element = this.createOption(option);
      select.append(element);
    });
    this.checkAlertClass(select)
    return select;
  }

  createDefaultValue() {
    const defaultValue = this.createOption(this.defaultValue);
    defaultValue.setAttribute('selected', 'true')
    defaultValue.disabled = true;
    return defaultValue;
  }

  createOption(value) {
    const option = super.createElement('option', [], value);
    option.setAttribute('value', value);
    return option;
  }

  checkAlertClass(select) {
    select.addEventListener('change', () => {      
      select.classList.remove('alert-danger');      
    })
  }
}