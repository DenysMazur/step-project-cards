import cheackLocalStorage from './api/checkLocalStorage.js';


export default class CollectionCards {
  constructor() {
    this.url = 'https://ajax.test-danit.com/api/v2/cards';
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

  async receiveCollection() {
      const response = await fetch(this.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`
        }
      })
      const data = await response.json();
      return data;
    }
}