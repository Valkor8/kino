import {createElement} from "../utils/render.js";
import AbstractSmartComponent from "./abstract-smart-component.js";

const createSectionFilms = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
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
          <span class="film-card__year">${film.filmYear.year}</span>
          <span class="film-card__duration">${film.filmDuration}</span>
          <span class="film-card__genre">${film.filmGenre.join(`, `)}</span>
        </p>
        <img src="${film.poster}" alt="" class="film-card__poster film-card__click" data-id="${film.id}">
        <p class="film-card__description">${film.description}</p>
        <a class="film-card__comments film-card__click" data-id="${film.id}">${film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" data-id="${film.id}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" data-id="${film.id}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" data-id="${film.id}">Mark as favorite</button>
        </form>
    </article>`
  );
};

export default class FilmCards extends AbstractSmartComponent {
  constructor(film) {
    super();
    this.film = film;

    this._setClickHadler = null;
  }

  getTemplate() {
    return createFilmCard(this.film);
  }

  getContainer() {
    return createElement(createSectionFilms());
  }

  recoveryListeners() {
    this.setClickHadnler(this._setClickHadler = null);
    this.buttonAddToWatchlistHandler();
    this.buttonMarkAsWatchedHandler();
    this.buttonAddToFavoriteHandler();
  }

  rerender() {
    super.rerender();
  }

  setClickHadnler(cb) {
    this._setClickHadler = cb;
    this.filmCardClick = this.getElement().querySelectorAll(`.film-card__click`);
    this.filmCardClick.forEach((item) => item.addEventListener(`click`, this._setClickHadler));
  }

  buttonAddToWatchlistHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, cb);
  }

  buttonMarkAsWatchedHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, cb);
  }

  buttonAddToFavoriteHandler(cb) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, cb);
  }
}
