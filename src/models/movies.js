import {getFilmsByFilter} from "../utils/site-menu-filter.js";
import {FilterType} from "../const.js";

export default class Movies {
  constructor() {
    this._films = [];
    this._activeFilterType = FilterType.ALL;

    this._dataChangeHadlers = [];
    this._filterChangeHandlers = [];
    this._filterCountChangeHandlers = [];
  }

  getFilms() {
    return getFilmsByFilter(this._films, this._activeFilterType);
  }

  getFilmsAll() {
    return this._films;
  }

  setFilms(films) {
    this._films = Array.from(films);
    this._callHandlers(this._dataChangeHadlers);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeComments(id) {
    let filmIndex = null;
    let commentIndex = null;

    this._films.forEach((film, filmInd) => {
      film.comments.forEach((it, comIndex) => {
        if (it.id === id) {
          filmIndex = filmInd;
          commentIndex = comIndex;
          return;
        }
      });
    });

    if (!commentIndex && commentIndex !== 0) {
      return false;
    }

    this._films[filmIndex].comments.splice(commentIndex, 1);


    this._callHandlers(this._dataChangeHadlers);
    console.log(this._films);
    return true;
  }

  updateFilm(id, newData) {
    const index = this._films.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    this._callHandlers(this._dataChangeHadlers);
    this._callHandlers(this._filterCountChangeHandlers);

    return true;
  }

  addComments() {

  }

  setDataChangeHandler(handler) {
    this._dataChangeHadlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilterCountChangeHandler(handler) {
    this._filterCountChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
