import cheackLocalStorage from './api/checkLocalStorage.js';

export default class EditVisit {
  constructor(id) {
    this.url = 'https://ajax.test-danit.com/api/v2/cards';
    this.id = id
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

  async editVisitRequest(object) {
    const response = await fetch(`${this.url}/${this.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify(
        object
      )
    })

    return response;
  }
}