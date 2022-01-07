import AbstractComponent from "./abstract-component.js";

const createSiteMenuAndStats = (obj) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active" data-name="all">All movies</a>
        <a href="#watchlist" class="main-navigation__item" data-name="watchlist">Watchlist <span class="main-navigation__item-count" >${obj.watchlist}</span></a>
        <a href="#history" class="main-navigation__item" data-name="history">History <span class="main-navigation__item-count" >${obj.history}</span></a>
        <a href="#favorites" class="main-navigation__item" data-name="favorites">Favorites <span class="main-navigation__item-count" >${obj.favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  _getSumFlags(films) {
    const obj = {
      watchlist: 0,
      history: 0,
      favorites: 0
    };
    films.forEach((film) => {
      if (film.filter.watchlist === true) {
        obj.watchlist += 1;
      }
      if (film.filter.history === true) {
        obj.history += 1;
      }
      if (film.filter.favorites === true) {
        obj.favorites += 1;
      }
    });
    return obj;
  }

  getTemplate() {
    return createSiteMenuAndStats(this._getSumFlags(this._films));
  }

  onFilterClick(cb) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, cb);
  }

}
