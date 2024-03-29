import Header from './header.js';
import Body from './body.js';
import Search from "../select/search.js";
// import FilterForm from './filterForm.js';

export default class RenderPage {
  constructor(marker) {      
    this.marker = marker;
  }
  render() {
    this.header = new Header(this.marker);
    this.body = new Body(this.marker);
    this.search = new Search();
    // this.filterForm = new FilterForm();
    this.header.render();    
    this.body.render();   
    this.search.render();
  }

  cheackRendering() {
    if (this.marker) {
      this.body.checkCards();
    }
  }
}