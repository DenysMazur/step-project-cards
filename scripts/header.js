import Element from "./element.js";
import LoginButton from "./loginButton.js";
import VisitButton from "./visitButton.js";
import Image from "./image.js";

export default class Header extends Element {
  constructor() {
    super();
  }

  render(marker) {
    this.marker = marker;
    const header = super.createElement('header', ['header']);
    const logoContainer = super.createElement('div', ['header__logo']);
    const image = new Image('./img/medical-symbol.svg', 'Logo of the company');
    logoContainer.append(image.createImage());
    const button = this.createButton();    
    header.append(logoContainer, button.createButton());
    const container = document.querySelector('.root');
    container.prepend(header);
  }

  createButton() {
    if (this.marker) {
      return new VisitButton(['btn', 'btn-success', 'header__visit-btn'], 'Создать визит')
    }
    return new LoginButton(['btn', 'btn-primary', 'header__login-btn'], 'Вход');
  }

}