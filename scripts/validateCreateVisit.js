export default class ValidateCreateVisit {
  constructor() {
  }

  addAlertClassToElements(formElements) {
    this.formElements = formElements;
    for (const element of this.formElements) {
      if (element.hasAttribute('required')) {
        element.classList.add('alert-danger');         
      }
    }
  }
}