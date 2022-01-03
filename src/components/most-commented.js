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

export default class MostCommented extends AbstractComponent {
  constructor(film) {
    super();

    this.film = film;
  }

  getContainer() {
    return createElement(createMostCommentedContainer());
  }

  setClickHadnler(cb) {
    this.filmCardClick = this.getElement().querySelectorAll(`.film-card__click`);
    this.filmCardClick.forEach((item) => item.addEventListener(`click`, cb));
  }
}
