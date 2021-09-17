import Element from './element.js';
import Button from './button.js';
import DeleteCard from './deleteCard.js';
import EditVisit from './editVisit.js';

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
                    
                </li>          
            </ul>
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
        this.targetRendering = document.querySelector('.cards-body');
        this.targetRendering.append(this.container);
        this.btnContainer = this.container.querySelector('.options-button-container');
        this.loadMoreButton = this.createLoadmoreButton();
        this.editButton = this.createEditButton();
        this.closeVisitButton = this.createCloseVisitButton();
        this.btnContainer.append(this.loadMoreButton, this.editButton, this.closeVisitButton);
        this.headerCardContainer = this.container.querySelector('.card-header');
        this.headerCardContainer.append(this.createDeleteCardButton());
        this.createSatusOfVisit();
        
    }

    createLoadmoreButton() {
        const loadMoreButton = new Button(['load-more-btn', 'btn', 'btn-outline-secondary', 'btn-lg', 'btn-block', 'p-0'], 'Показать больше').createButton();
        loadMoreButton.addEventListener('click', () => {
                this.createOtherOptions();
                loadMoreButton.remove();
                this.btnContainer.prepend(this.createHideButton());
        })
        return loadMoreButton;
    }

    createHideButton() {
        const hideButton = new Button(['load-more-btn', 'btn', 'btn-outline-secondary', 'btn-lg', 'btn-block', 'p-0'], 'Показать меньше').createButton();
        hideButton.addEventListener('click', () => {
            this.currentList.innerHTML = '';
            this.currentList.innerHTML = `<li class="list-group-item pb-0 pt-0">Запись к: <b>${this.receiveDoctor()}</b></li>`;            
            hideButton.remove();
            this.btnContainer.prepend(this.createLoadmoreButton());
        })
        return hideButton;
    }

    createEditButton() {
        const editButton = new Button(['edit-btn', 'btn', 'btn-outline-warning', 'btn-lg', 'btn-block', 'p-0'], 'Редактировать').createButton();
        editButton.addEventListener('click', () => {
                console.log('click');
                //сделать что-то;
        })
        return editButton;
    }

    createCloseVisitButton() {
        const closeVisitButton = new Button(['edit-btn', 'btn', 'btn-outline-success', 'btn-lg', 'btn-block', 'p-0'], 'Success').createButton();
        closeVisitButton.addEventListener('click', async () => {
                this.cardItem.close = true;
                const {id} = this.cardItem;
                console.log(id);
                const editVisit = new EditVisit(id);
                const response = await editVisit.editVisitRequest(this.cardItem);
                if (response.ok) {
                    this.createSatusOfVisit();
                } else {
                    throw new Error("Can't close visit");
                }   
        })
        return closeVisitButton;
    }

    createDeleteCardButton() {
        this.span = this.createElement('span', []);
        this.span.innerHTML = '&times;';
        this.span.setAttribute('aria-hidden', 'true');
        const deleteButton = new Button(['close']).createButton();
        deleteButton.setAttribute('aria-label', 'Close');
        deleteButton.append(this.span);
        
        deleteButton.addEventListener('click', async () => {
            const {id} = this.cardItem;
            const deleteCard = new DeleteCard(id);
            const response = await deleteCard.deleteRequest();
            if (response.ok) {
                this.container.remove();
            } else {
                throw new Error("Can't remove");
            }          
            if(!this.targetRendering.querySelector('.card')) {
                const paragrath = super.createElement('p', ['cards-body__title'], 'No items have been added');
                this.targetRendering.append(paragrath);
            }
            
        })
        return deleteButton;
    }


    receiveDoctor() {
        const {doctor} = this.cardItem;
        return doctor;
    }

    receivePacient() {
        const {pacient} = this.cardItem;
        return pacient;
    }

    createSatusOfVisit() {
        const listItem = this.container.querySelector('.nav-item');
        listItem.innerHTML = '';
        const {close} = this.cardItem;
        if (close) {
            const html = `
            <a class="nav-link bg-success text-white disabled" href="#">Close</a>
            `
            listItem.insertAdjacentHTML('beforeend', html);
            this.closeVisitButton.remove();
            this.editButton.remove();
        } else {
            const html = `
            <a class="nav-link active disabled" href="#">Open</a>
            `
            listItem.insertAdjacentHTML('beforeend', html)
        }
    }

    createOtherOptions() {
        this.currentList = this.container.querySelector('.list-group');
        if (this.receiveDoctor() === 'Стоматолог') {
            const {target, description, priority, lastvisit} = this.cardItem;
            const html = `
            <li class="list-group-item pb-0 pt-0">Цель визита: <b>${target}</b></li>
            <li class="list-group-item pb-0 pt-0">Краткое описание визита: <b>${description}</b></li>
            <li class="list-group-item pb-0 pt-0">Приоритет: <b>${priority}</b></li>
            <li class="list-group-item pb-0 pt-0">Последний визит: <b>${lastvisit}</b></li>
            `
            this.currentList.insertAdjacentHTML('beforeend', html)
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
            this.currentList.insertAdjacentHTML('beforeend', html);
        } else {
            const {target, description, priority, age} = this.cardItem;
            const html = `
            <li class="list-group-item pb-0 pt-0">Цель визита: <b>${target}</b></li>
            <li class="list-group-item pb-0 pt-0">Краткое описание визита: <b>${description}</b></li>
            <li class="list-group-item pb-0 pt-0">Приоритет: <b>${priority}</b></li>
            <li class="list-group-item pb-0 pt-0">Возраст: <b>${age}</b></li>
            `
            this.currentList.insertAdjacentHTML('beforeend', html);
        }
    }

    
}