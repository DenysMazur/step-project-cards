import Element from '../scripts/element.js';
import CollectionCards from "../scripts/collectionCards.js";
import Card from "../scripts/card.js";

class Search extends Element {
    constructor() {
        super();
    }

    render() {
        const searchContainer = document.createElement('div', ['searchCont']);
        const search = super.createElement('div', ['search']);
        const container = document.querySelector('.root');
        container.prepend(search);
        search.append(searchContainer);

        const selectListDoc = document.createElement("select", ['doc']);
        selectListDoc.id = "selectDoc";
        const arrayDoc = ['--Все врачи--', 'cardiologist', 'dentist', 'therapist'];
        for (let i = 0; i < arrayDoc.length; i++) {
            const option = document.createElement("option");
            option.value = arrayDoc[i];
            option.text = arrayDoc[i];
            selectListDoc.appendChild(option);
        }

        const selectListUrg = document.createElement("select", ['urgent']);
        selectListUrg.id = "selectUrg";
        const arrayUrg = ['--Любая срочность--', 'Normal', 'High', 'Low'];
        for (let i = 0; i < arrayUrg.length; i++) {
            const option = document.createElement("option");
            option.value = arrayUrg[i];
            option.text = arrayUrg[i];
            selectListUrg.appendChild(option);
        }
        search.append(selectListDoc, selectListUrg);

        const cardSel = document.querySelector('.searchCont');

        const docSelect = document.querySelector('#selectDoc');
        docSelect.addEventListener('change', event => {
            const docType = event.target.value;
            this.collectionCards = new CollectionCards();
            this.collectionCards.receiveCollection()
                .then(data => {
                        const arr = Array.from(data);
                        console.log(arr);
                        const selectArr = [];
                        const selectCard = [];
                        for (let i = 0; i < arr.length; i++) {
                            for (const [key, value] of Object.entries(arr[i])) {
                                console.log(`${key}: ${value}`);
                                if (key == 'Doctor' && value == docType) {
                                    
                                    selectArr.push(arr[i]);
                                    const card = new Card(arr[i]);
                                    selectCard.push(card);
                                }

                            }
                            // console.log(selectArr);
                            // console.log(selectArr.length);
                            // console.log(selectCard);
                        }

                    }
                );
        });

        const urgentSelect = document.querySelector('#selectUrg');
        urgentSelect.addEventListener('change', event => {
            const docType = event.target.value;
            this.collectionCards = new CollectionCards();
            this.collectionCards.receiveCollection()
                .then(data => {
                        const arr = Array.from(data);
                        console.log(arr);
                        const selectArr = [];
                        const selectCard = [];
                        for (let i = 0; i < arr.length; i++) {
                            for (const [key, value] of Object.entries(arr[i])) {
                                // console.log(`${key}: ${value}`);
                                if (key == 'Urgency' && value == docType) {
                                    selectArr.push(arr[i]);
                                    const card = new Card(arr[i]);
                                    selectCard.push(card);

                                }

                            }
                            // console.log(selectArr);
                            // console.log(selectArr.length);
                            console.log(selectCard);

                        }

                    }
                );
        });


    }


}

export default Search;