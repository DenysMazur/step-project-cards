import Element from './element.js';

export default class Body extends Element {
  constructor() {
    super();
  }

  render(marker) {
    this.marker = marker;
    const cardsBody = super.createElement('section', ['cards-body'], this.changeTitle());
    const container = document.querySelector('.root');
    container.append(cardsBody);
  }

  changeTitle() {
    //нужно делать фетч запрос, если есть карточки. Если нет, то выводить 'No items have been added', если есть, то показывать их
    if(this.marker) {
      return 'No items have been added'
    }
    return 'Добро пожаловать в систему создания визитов. Для дальнейшей работы войдите в систему'
  }
}