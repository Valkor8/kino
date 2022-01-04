import {createElement} from "../utils/render.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {getDuration, getDateForMoment} from "../utils/moment.js";

const createSectionFilms = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container films-list__container-main"></div>
      </section>
    </section>`
  );
};

const createFilmCard = (film) => {
  return (
    `<article class="film-card">
        <h3 class="film-card__title film-card__click" data-id="${film.id}">${film.film}</h3>
        <p class="film-card__rating">${film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${getDateForMoment(film.filmYear, `YYYY`)}</span>
          <span class="film-card__duration">${getDuration(film)}</span>
          <span class="film-card__genre">${film.filmGenre.join(`, `)}</span>
        </p>
        <img src="${film.poster}" alt="" class="film-card__poster film-card__click" data-id="${film.id}">
        <p class="film-card__description">${film.description}</p>
        <a class="film-card__comments film-card__click" data-id="${film.id}">${film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button ${film.filter.watchlist ? `film-card__controls-item--active` : ``} film-card__controls-item--add-to-watchlist" data-id="${film.id}">Add to watchlist</button>
          <button class="film-card__controls-item button ${film.filter.history ? `film-card__controls-item--active` : ``} film-card__controls-item--mark-as-watched" data-id="${film.id}">Mark as watched</button>
          <button class="film-card__controls-item button ${film.filter.favorites ? `film-card__controls-item--active` : ``} film-card__controls-item--favorite" data-id="${film.id}">Mark as favorite</button>
        </form>
    </article>`
  );
};


export default class FilmCards extends AbstractSmartComponent {
  constructor(film) {
    super();
    this.film = film;

    this._setClickHadler = null;
    this._cbWatchlist = null;
    this._cbWatched = null;
    this._cbFavorites = null;
  }

  getTemplate() {
    return createFilmCard(this.film);
  }

  getContainer() {
    return createElement(createSectionFilms());
  }

  setClickHadnler(cb) {
    this._setClickHadler = cb;
    this.filmCardClick = this.getElement().querySelectorAll(`.film-card__click`);
    this.filmCardClick.forEach((item) => item.addEventListener(`click`, this._setClickHadler));
  }

  buttonAddToWatchlistHandler(cb) {
    this._cbWatchlist = cb;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._cbWatchlist);
  }

  buttonMarkAsWatchedHandler(cb) {
    this._cbWatched = cb;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._cbWatched);
  }

  buttonAddToFavoriteHandler(cb) {
    this._cbFavorites = cb;
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, this._cbFavorites);
  }
}
