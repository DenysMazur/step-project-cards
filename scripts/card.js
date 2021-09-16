import Element from './element.js';
import Button from './button.js';

export default class Card extends Element {
    constructor(cardItem = '') {
        super();
        this.cardItem = cardItem;
    }

    render() {
        this.container = this.createElement('div', ['card', 'border-info'])
        this.container.style.width = '18rem';
        const html = `
        
        <div class="card-header d-flex justify-content-between">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link active disabled" href="#">Open</a>
          </li>          
        </ul>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
            <div class="card-body pb-0 pt-0">
                <h6 class="card-title">Пациент: <b>${this.receivePacient()}</b></h6>
            </div>
            
            <ul class="list-group list-group-flush">
                <li class="list-group-item pb-0 pt-0">Запись к: <b>${this.receiveDoctor()}</b></li>
            </ul>
            <div class="card-body options-button-container">
            
            </div>
        `
        this.container.insertAdjacentHTML('beforeend', html);        
        const targetRendering = document.querySelector('.cards-body');
        targetRendering.append(this.container);
        this.btnContainer = this.container.querySelector('.options-button-container');
        this.btnContainer.append(this.createLoadmoreButton(), this.createEditButton(), this.createCloseVisitButton())
        
    }

    createLoadmoreButton() {
        this.loadMoreButton = new Button(['load-more-btn', 'btn', 'btn-outline-secondary', 'btn-lg', 'btn-block', 'p-0'], 'Показать больше').createButton();
        this.loadMoreButton.addEventListener('click', () => {
                console.log('click');
                this.createOtherOptions();
                this.loadMoreButton.remove();
        })
        return this.loadMoreButton;
    }

    createEditButton() {
        this.editButton = new Button(['edit-btn', 'btn', 'btn-outline-warning', 'btn-lg', 'btn-block', 'p-0'], 'Редактировать').createButton();
        this.editButton.addEventListener('click', () => {
                console.log('click');
                //сделать что-то;
        })
        return this.editButton;
    }

    createCloseVisitButton() {
        this.closeVisitButton = new Button(['edit-btn', 'btn', 'btn-outline-success', 'btn-lg', 'btn-block', 'p-0'], 'Success').createButton();
        this.closeVisitButton.addEventListener('click', () => {
                console.log('click');
                //сделать что-то;
        })
        return this.closeVisitButton;
    }

    receiveDoctor() {
        const {doctor} = this.cardItem;
        return doctor;
    }

    receivePacient() {
        const {pacient} = this.cardItem;
        return pacient;
    }

    createOtherOptions() {
        const currentList = this.container.querySelector('.list-group')
        if (this.receiveDoctor() === 'Стоматолог') {
            const {target, description, priority, lastvisit} = this.cardItem;
            const html = `
            <li class="list-group-item pb-0 pt-0">Цель визита: <b>${target}</b></li>
            <li class="list-group-item pb-0 pt-0">Краткое описание визита: <b>${description}</b></li>
            <li class="list-group-item pb-0 pt-0">Приоритет: <b>${priority}</b></li>
            <li class="list-group-item pb-0 pt-0">Последний визит: <b>${lastvisit}</b></li>
            `
            currentList.insertAdjacentHTML('beforeend', html)
        } else if(this.receiveDoctor() === 'Кардиолог') {
            const {target, description, priority, pressure, bmi, history, age} = this.cardItem;
            const html = `
            <li class="list-group-item pb-0 pt-0">Цель визита: <b>${target}</b></li>
            <li class="list-group-item pb-0 pt-0">Краткое описание визита: <b>${description}</b></li>
            <li class="list-group-item pb-0 pt-0">Приоритет: <b>${priority}</b></li>
            <li class="list-group-item pb-0 pt-0">Обычное давление: <b>${pressure}</b></li>
            <li class="list-group-item pb-0 pt-0">Индекс массы тела: <b>${bmi}</b></li>
            <li class="list-group-item pb-0 pt-0">История болезни: <b>${history}</b></li>
            <li class="list-group-item pb-0 pt-0">Возраст: <b>${age}</b></li>
            `
            currentList.insertAdjacentHTML('beforeend', html);
        } else {
            const {target, description, priority, age} = this.cardItem;
            const html = `
            <li class="list-group-item pb-0 pt-0">Цель визита: <b>${target}</b></li>
            <li class="list-group-item pb-0 pt-0">Краткое описание визита: <b>${description}</b></li>
            <li class="list-group-item pb-0 pt-0">Приоритет: <b>${priority}</b></li>
            <li class="list-group-item pb-0 pt-0">Возраст: <b>${age}</b></li>
            `
            currentList.insertAdjacentHTML('beforeend', html);
        }
    }
    
}