//tests

import Button from './button.js'
const t = document.querySelector('.root')
const button = new Button(['btn', 'btn-primary'], 'Вход')
t.append(button.createButton(['btn', 'btn-primary'], 'Вход'))
button.addClass(['mt-3', 'mt-4', 'mt-5', 'mt-6'])