import FilmCards from "../components/film-card.js";
import ProfileRating from "../components/profile-rating.js";
import Sort from "../components/sort.js";
import Stats from "../components/footer-statistic.js";
import SiteMenu from "../components/site-menu-and-stats.js";
import TopRated from "../components/top-rated.js";
import MostCommented from "../components/most-commented.js";
import MessageNoFilm from "../components/no-films.js";
import ButtonShowMore from "../components/button-show-more.js";
import MovieController from "./movie-controller.js";
import {filter} from "../mock/filter.js";
import {render, renderContainer} from "../utils/render.js";
import {randomProfileRating} from "../mock/random-rating.js";
import {getRandomInt} from "../mock/random-generator.js";
import {renderSortFilms} from "../utils/render.js";
import {randomFilms} from "../main.js";


const TOTAL_FILMS = getRandomInt(1000, 100000);
const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;
const FILM_CARD_SHOW_BY_BUTTON = 5;

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = randomFilms;
    this._filmCardsSort = this._films;
    this._filmAmount = FILM_CARDS_AMOUNT;

    this._sort = new Sort();
    this.filmCards = new FilmCards();
    this._buttonShowMore = new ButtonShowMore();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();
    this.movieController = new MovieController(`.films-list__container`);
  }

  render(films) {
    render(`.header`, new ProfileRating(randomProfileRating));

    render(this._container, new SiteMenu(filter));

    render(this._container, this._sort);

    renderContainer(this._container, this.filmCards);

    if (films.length === 0 || !films) {
      render(this._container, new MessageNoFilm());

    } else {
      films.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
        this.movieController.render(`.films-list__container`, item);
      });

      render(`.films-list`, this._buttonShowMore);

      renderContainer(`.films`, this._topRated);

      films
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 2)
        .forEach((item) => this.movieController.render(`#top-rated .films-list__container`, item));

      renderContainer(`.films`, this._mostCommented);

      films
        .slice()
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, 2)
        .forEach((item) => this.movieController.render(`#most-commented .films-list__container`, item));
    }

    render(`.footer__statistics`, new Stats(TOTAL_FILMS));
  }

  _setSortTypeChangeHadnler() {
    const filmListContainer = document.querySelector(`.films-list__container`);
    this._sort.setSortTypeChangeHandler((sortType) => {
      filmListContainer.innerHTML = ``;
      this._filmCardsSort = renderSortFilms(this._films, sortType);
      this._filmCardsSort.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
        this.movieController.render(`.films-list__container`, item);
      });

      if (!document.querySelector(`.films-list__show-more`)) {
        render(`.films-list`, this._buttonShowMore);
      }

      this._filmAmount = FILM_CARDS_AMOUNT;
    });
  }

  _renderOnButtonClick() {
    const renderOnButtonClick = (filmsSort) => {
      let prevFilmCount = this._filmAmount;
      this._filmAmount += FILM_CARD_SHOW_BY_BUTTON;
      filmsSort.slice(prevFilmCount, this._filmAmount).forEach((item) => {
        this.movieController.render(`.films-list__container`, item);
        if (this._filmAmount >= this._films.length) {
          this._buttonShowMore.getElement().remove();
        }
      });
    };
    const onButtonClick = () => {
      renderOnButtonClick(this._filmCardsSort);
    };
    this._buttonShowMore.setClickHandler(onButtonClick);
  }
}
