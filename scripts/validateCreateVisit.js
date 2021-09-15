export default class ValidateCreateVisit {
  constructor() {
    this.url = 'https://ajax.test-danit.com/api/v2/cards';
  }

  addAlertClassToElements(formElements) {
    this.formElements = formElements;
    // console.log(this.formElements);
    for (const element of this.formElements) {
      if (element.hasAttribute('required')) {
        element.classList.add('alert-danger');         
      }
    }
  }

  async sendRequest() {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }, 
      body: JSON.stringify({
        title: 'Визит к кардиологу',
        description: 'Плановый визит',
        doctor: 'Cardiologist',
        bp: '24',
        age: 23,
        weight: 70
      })
    })
    const data = await response.json();
    console.log(data);   
    return data;
  }
  async receiveRequest() {
    const response = await fetch(this.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json();
    console.log(data);   
    return data;
  }

}