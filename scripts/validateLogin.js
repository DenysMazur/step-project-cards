export default class ValidateLogin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.url = 'https://ajax.test-danit.com/api/v2/cards/login';
  }

  async sendRequest() {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: this.email, password: this.password })
    })
    const token = await response.text();    
    return token;
  }
}