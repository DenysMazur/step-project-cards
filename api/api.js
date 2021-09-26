import {deleteCard, getCard, postData, updateCard} from './util.js'
import card from "../scripts/card.js";

export async function createCard(data) {
    const dataResponse = await postData(url.cards, JSON.stringify(data));
    const dataJson = JSON.parse(dataResponse);
    const {content} = dataJson;
    card.render(content);
}

export async function findCardById(id) {
    const dataResponse = await getCard(`${url.cards}/${id}`);
    let dataJson = JSON.parse(dataResponse);
    const {content} = dataJson;
    return await content;
}

export async function deleteCardById(id) {
    await deleteCard(`${url.cards}/${id}`);
}

export async function updateCardById(data, id) {
    const dataResponse = await updateCard(`${url.cards}/${id}`,JSON.stringify(data));
    let dataJson = JSON.parse(dataResponse);
    const oldCard = document.getElementById(id);
    const {content} = {...oldCard, ...dataJson};
    oldCard.remove();
    card.render(content);
}


async function cardFilter(searchDoctor, searchUrgency) {
    const dataRes = await getDataCards(url.cards);
    let data = JSON.parse(dataRes);
    data.filter((item) => {
        let {
            [item.receiveDoctor()]: doctor,
            [item.priority]: urgency,
        } = item.content;

        return ((doctor === searchDoctor)&&(urgency === searchUrgency));
    }).item.forEach(() => {
            card.render();
        });
}


