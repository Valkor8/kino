import AbstractComponent from "./abstract-component.js";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createSort = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-id="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-id="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-id="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSort();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.id;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      Array.from(this.getElement().querySelectorAll(`.sort__button`)).forEach((btn) => {
        if (btn.classList.contains(`sort__button--active`)) {
          btn.classList.remove(`sort__button--active`);
        }
        evt.target.classList.add(`sort__button--active`);
      });

      handler(this._currentSortType);
    });
  }
}
