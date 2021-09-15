export default class ValidateLogin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.url = 'https://ajax.test-danit.com/api/v2/cards/login';
  }

  addAlertClass() {
    this.email.classList.add('alert', 'alert-danger');
    this.password.classList.add('alert', 'alert-danger');
  }

  removeAlertClass() {
    this.email.classList.remove('alert', 'alert-danger');
    this.password.classList.remove('alert', 'alert-danger');
  }

  checkData() {
    if (this.email.value === '' || this.password.value === '') {
      this.addAlertClass();
      return false;
    }
    return true;
  }

  async sendRequest() {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: this.email.value, password: this.password.value })
    })
    const token = await response.text();    
    return token;
  }
}