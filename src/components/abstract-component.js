import {createElement} from "../utils/render.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only cocrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstarct nethod not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show(element) {
    element.classList.remove(`visually-hidden`);
  }

  hide(element) {
    element.classList.add(`visually-hidden`);
  }
}
