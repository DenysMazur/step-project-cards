import Header from './header.js';
import Body from './body.js';
import RenderPage from './renderPage.js';
import cheackLocalStorage from './api/checkLocalStorage.js'

window.addEventListener('load', () => {
  const renderPage = new RenderPage();
  renderPage.render(cheackLocalStorage());
})