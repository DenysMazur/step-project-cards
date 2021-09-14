import Element from './element.js';

export default class Select extends Element {
  constructor(name, classes = [], defaultValue, options = []) {
    super();
    this.name = name;
    this.defaultValue = defaultValue;
    this.classes = classes;
    this.options = options;
  }

  createSelect() {
    const select = super.createElement('select', this.classes);    
    select.setAttribute('name', this.name);
    select.append(this.createDefaultValue());
    this.options.forEach(option => {
      const element = this.createOption(option);
      select.append(element);
    });

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
}