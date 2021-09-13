import Element from "./element.js";

export default class Image extends Element {
  constructor(link, alt) {
    super();
    this.link = link;
    this.alt = alt;
  }

  createImage() {
    const image = super.createElement('img', ['header__image']);
    image.setAttribute('alt', this.alt);
    image.setAttribute('src', this.link);
    return image;
  }
}