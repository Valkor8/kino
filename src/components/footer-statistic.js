import AbstractComponent from "./abstract-component.js";

const createFooterStatistic = (stats) => {
  return (
    `<p>${stats} movies inside</p>`
  );
};

export default class Stats extends AbstractComponent {
  constructor(stats) {
    super();

    this.stats = stats;
  }

  getTemplate() {
    return createFooterStatistic(this.stats);
  }
}

