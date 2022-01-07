import {FilterType} from "../const.js";

export const getFilmsByFilter = (films, filterType) => {
  if (filterType === FilterType.WATCHLIST) {
    return films.filter((film) => film.filter.watchlist === true);
  } else if (filterType === FilterType.HISTORY) {
    return films.filter((film) => film.filter.history === true);
  } else if (filterType === FilterType.FAVORITES) {
    return films.filter((film) => film.filter.favorites === true);
  } else {
    return films;
  }
};
