import Header from './header.js'
import Body from './body.js'
import LoginModal from './loginModal.js'

window.addEventListener('load', () => {
  const header = new Header();
  header.render();
  const cardsBody = new Body();
  cardsBody.render();
  const headerModal = new LoginModal();
  headerModal.render();
  // document.querySelector('.root').insertAdjacentHTML('beforeend', headerModal.createLoginModal());
})