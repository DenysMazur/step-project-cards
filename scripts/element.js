export default class Element {
  createElement(elemType, classNames = [], text) {
    const element = document.createElement(elemType);
    if (text) { element.textContent = text; }
    element.classList.add(...classNames);
    return element;
  }

  removeClass(element, classes = []) {
    element.classList.remove(...classes);
  }
  addClass(element, classes = []) {
    console.log(classes);
    element.classList.add(...classes);
  }
  toggleClass(element, classToggle) {
    element.classList.toggle(classToggle);
  }  
}