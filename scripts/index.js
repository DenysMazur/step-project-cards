import Header from './header.js'
import Body from './body.js'

window.addEventListener('load', () => {
  const header = new Header();
  header.render();
  const cardsBody = new Body();
  cardsBody.render();

})

// window.addEventListener('click', (event) => {
//   console.log(event.target);
// })