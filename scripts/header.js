import Element from "./element.js";
import Button from "./button.js";
import Image from "./image.js"

export default class Header extends Element {
  constructor() {
    super()
  }

  render() {
    const header = super.createElement('header', ['header']);
    const logoContainer = super.createElement('div', ['header__logo']);
    const image = new Image('./img/medical-symbol.svg', 'Logo of the company');
    logoContainer.append(image.createImage())
    const button = new Button(['btn', 'btn-primary'], 'Вход');    
    header.append(logoContainer, button.createButton());
    const container = document.querySelector('.root');
    container.prepend(header);
  }
}