import Element from './element.js';

export default class Body extends Element {
  constructor() {
    super();
  }

  render() {
    const cardsBody = super.createElement('section', ['cards-body'], 'Добро пожаловать в систему создания визитов. Для дайлнешей работы войдите в систему');
    const container = document.querySelector('.root');
    container.append(cardsBody);
  }
}