import Element from './element.js';
import Input from './input.js';

export default class LoginForm extends Element{
  constructor(){
    super();
  }

  createForm () {
    const form = super.createElement('form', ['form-group']);
    const loginInput = new Input('text', 'Login');
    const passwordInput = new Input('password', 'Password');
    form.append(loginInput.createInput(), passwordInput.createInput());
    return form;
  }
}