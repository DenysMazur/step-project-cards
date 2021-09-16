import Element from './element.js';
import CollectionCards from './collectionCards.js';
import Card from './card.js';

export default class Body extends Element {
  constructor(marker = 'false') {
    super();
    this.marker = marker;
  }

  createBody() {
    this.cardsBody = super.createElement('section', ['cards-body']);    
    const container = document.querySelector('.root');
    container.append(this.cardsBody);
  }

  render() {
    if (!this.marker) {
      this.createBody();
      this.createParagrath();
    } else {
      this.createBody();
      this.checkCards();
    }
  }

  createParagrath() {
    this.paragrath = super.createElement('p', ['cards-body__title'], this.createBodyTitle());
    this.cardsBody.append(this.paragrath);
  }

  createBodyTitle() {
    if (!this.marker) {
      return 'Добро пожаловать в систему создания визитов. Для дальнейшей работы войдите в систему';
    }
    
    return 'No items have been added';
  }

  async receiveDataCards() {
    this.collectionCards = new CollectionCards();
    const data = await this.collectionCards.receiveCollection();    
    return data;
  }

  async checkCards() {
    this.data = await this.receiveDataCards();    
    if (this.data.length === 0) {
      this.createParagrath();
      return;
    } else {
      this.data.forEach(element => {
        const card = new Card(element).render();
      })      
      return;
    }
  }
}