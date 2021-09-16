import RenderPage from './renderPage.js';
import cheackLocalStorage from './api/checkLocalStorage.js';

window.addEventListener('load', () => {
  const renderPage = new RenderPage(cheackLocalStorage());
  renderPage.render();
})