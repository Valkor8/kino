import {createElement} from "../utils/render.js";
import AbstractComponent from "./abstract-component.js";

const createTopRatedContainer = () => {
  return (
    `<section class="films-list--extra" id="top-rated">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class TopRated extends AbstractComponent {
  constructor(film) {
    super();
    this.film = film;
  }

  getContainer() {
    return createElement(createTopRatedContainer());
  }

  setClickHadnler(cb) {
    this.filmCardClick = this.getElement().querySelectorAll(`.film-card__click`);
    this.filmCardClick.forEach((item) => item.addEventListener(`click`, cb));
  }
}
