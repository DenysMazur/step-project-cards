import Element from './element.js';
import Input from './input.js';

export default class LoginForm extends Element{
  constructor(){
    super();
  }

  createForm () {
    const form = super.createElement('form', ['form-group']);
    const loginInput = new Input('email', ['form__email', 'mt-1'], 'email');
    const passwordInput = new Input('password', ['form__password', 'mt-1'], 'password');
    form.append(loginInput.createInput(), passwordInput.createInput());
    const html = `
    <div class="form-check mt-1">
        <input class="form-check-input" type="checkbox">
        <label class="form-check-label">
          Запомнить меня
        </label>
    </div>
    `
    form.insertAdjacentHTML('beforeend', html);
    return form;
  }
}