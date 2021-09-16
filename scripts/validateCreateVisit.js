import cheackLocalStorage from './api/checkLocalStorage.js';

export default class ValidateCreateVisit {
  constructor() {
    this.url = 'https://ajax.test-danit.com/api/v2/cards';
  }

  addAlertClassToElements(formElements) {
    this.formElements = formElements;
    for (const element of this.formElements) {
      if (element.hasAttribute('required')) {
        element.classList.add('alert-danger');         
      }
    }
  }

  getToken() {
    this.token = '';
    if (cheackLocalStorage()) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = sessionStorage.getItem('token');
    }
    return this.token;
  }

  async sendRequest(object) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }, 
      body: JSON.stringify(
        object
      )
    })
    const data = await response.json();
    return data;
  }

}