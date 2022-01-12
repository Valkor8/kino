import AbstractComponent from "./abstract-component.js";

const createSiteMenuAndStats = (obj, active) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${active.ALL ? `main-navigation__item--active` : ``}" data-name="all">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${active.WATCHLIST ? `main-navigation__item--active` : ``}" data-name="watchlist">Watchlist <span class="main-navigation__item-count" >${obj.watchlist}</span></a>
        <a href="#history" class="main-navigation__item ${active.HISTORY ? `main-navigation__item--active` : ``}" data-name="history">History <span class="main-navigation__item-count" >${obj.history}</span></a>
        <a href="#favorites" class="main-navigation__item ${active.FAVORITES ? `main-navigation__item--active` : ``}" data-name="favorites">Favorites <span class="main-navigation__item-count" >${obj.favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const ACTIVE = {
  ALL: true,
  WATCHLIST: false,
  HISTORY: false,
  FAVORITES: false,
};

export default class SiteMenu extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;

    this._mainNavigation = ``;
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

  changeActive(key) {
    ACTIVE.ALL = ACTIVE.WATCHLIST = ACTIVE.HISTORY = ACTIVE.FAVORITES = false;
    ACTIVE[key] = true;
  }

  getTemplate() {
    return createSiteMenuAndStats(this._getSumFlags(this._films), ACTIVE);
  }

  onFilterClick(cb) {
    this.getElement().querySelector(`.main-navigation__items`).addEventListener(`click`, cb);
  }

  onShowAndHideStats(cb) {
    this._mainNavigation = this.getElement().querySelector(`.main-navigation__additional`);
    this._mainNavigation.addEventListener(`click`, cb);
  }
}
