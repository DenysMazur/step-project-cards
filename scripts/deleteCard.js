import cheackLocalStorage from './api/checkLocalStorage.js';

export default class DeleteCard {
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

  async deleteRequest() {
    const response = await fetch(`${this.url}/${this.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      },
    })
    
    return response;
  }
}