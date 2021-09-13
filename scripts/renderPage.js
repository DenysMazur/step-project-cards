import Header from './header.js';
import Body from './body.js';
// import FilterForm from './filterForm.js';

export default class RenderPage {
  constructor() {
    this.header = new Header();
    this.body = new Body();
    // this.filterForm = new FilterForm();
  }

  render(marker) {
    this.marker = marker;
    this.header.render(this.marker);
    // this.filterForm.render(this.mark);
    this.body.render(this.marker);
    
  }

}