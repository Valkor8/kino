import {createElement} from "../util.js";

const createFooterStatistic = (stats) => {
  return (
    `<p>${stats} movies inside</p>`
  );
};

export default class Stats {
  constructor(stats) {
    this.stats = stats;

    this._element = null;
  }

  getTemplate() {
    return createFooterStatistic(this.stats);
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
}

