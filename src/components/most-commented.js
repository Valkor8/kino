import AbstractComponent from "./abstract-component.js";
import {createElement} from "../utils/render.js";

const createMostCommentedContainer = () => {
  return (
    `<section class="films-list--extra" id="most-commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

const createMostCommented = (film) => {
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

export default class MostCommented extends AbstractComponent {
  constructor(film) {
    super();

    this.film = film;
  }

  getContainer() {
    return createElement(createMostCommentedContainer());
  }

  getTemplate() {
    return createMostCommented(this.film);
  }

  setClickHadnler(cb) {
    this.filmCardClick = this.getElement().querySelectorAll(`.film-card__click`);
    this.filmCardClick.forEach((item) => item.addEventListener(`click`, cb));
  }
}
