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
import {remove, render, renderContainer} from "../utils/render.js";
import {randomProfileRating} from "../mock/random-rating.js";
import {getRandomInt} from "../mock/random-generator.js";
import {renderSortFilms} from "../utils/render.js";


const TOTAL_FILMS = getRandomInt(1000, 100000);
const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;
const FILM_CARD_SHOW_BY_BUTTON = 5;

const header = document.querySelector(`.header`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._filmCardsSort = [];
    this._showedFilmContollers = [];
    this._newTopRatedFilms = [];
    this._newMostCommentedFilms = [];
    this._filmAmount = FILM_CARDS_AMOUNT;

    this._siteMenu = ``;
    this._sort = new Sort();
    this.filmCards = new FilmCards();
    this._buttonShowMore = new ButtonShowMore();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(films) {
    this._films = films;
    this._filmCardsSort = films;
    render(header, new ProfileRating(randomProfileRating));

    this._siteMenu = new SiteMenu(this._films);
    render(this._container, this._siteMenu);

    render(this._container, this._sort);

    renderContainer(this._container, this.filmCards);

    const filmsElement = this._container.querySelector(`.films`);
    const filmListMainContainer = this._container.querySelector(`.films-list__container-main`);
    const filmlist = this._container.querySelector(`.films-list`);

    if (this._films.length === 0 || !this._films) {
      render(this._container, new MessageNoFilm());
      return;
    }

    const newFilms = renderFilms(filmListMainContainer, this._films.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange);
    this._showedFilmContollers = this._showedFilmContollers.concat(newFilms);

    render(filmlist, this._buttonShowMore);

    renderContainer(filmsElement, this._topRated);
    const topRaitedContainer = this._container.querySelector(`#top-rated .films-list__container`);

    this._newTopRatedFilms = renderFilms(topRaitedContainer, this._films
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2), this._onDataChange, this._onViewChange);
    this._showedFilmContollers = this._showedFilmContollers.concat(this._newTopRatedFilms);

    renderContainer(filmsElement, this._mostCommented);

    const mostCommentedContainer = this._container.querySelector(`#most-commented .films-list__container`);

    this._newMostCommentedFilms = renderFilms(mostCommentedContainer, this._films
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 2), this._onDataChange, this._onViewChange);
    this._showedFilmContollers = this._showedFilmContollers.concat(this._newMostCommentedFilms);

    render(footerStatistics, new Stats(TOTAL_FILMS));
  }

  _setSortTypeChangeHadnler() {
    const filmListContainer = this._container.querySelector(`.films-list__container`);
    const filmList = this._container.querySelector(`.films-list`);
    this._sort.setSortTypeChangeHandler((sortType) => {
      filmListContainer.innerHTML = ``;
      this._filmCardsSort = renderSortFilms(this._films, sortType);

      const newFilms = renderFilms(filmListContainer, this._filmCardsSort.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange);
      this._showedFilmContollers = newFilms.concat(this._newTopRatedFilms, this._newMostCommentedFilms);
      if (!this._container.querySelector(`.films-list__show-more`)) {
        render(filmList, this._buttonShowMore);
        this._buttonShowMore.setClickHandler(this._renderOnButtonClick());
      }

      this._filmAmount = FILM_CARDS_AMOUNT;
    });
  }

  _renderOnButtonClick() {
    const filmListContainer = this._container.querySelector(`.films-list__container`);

    const renderOnButtonClick = () => {
      let prevFilmCount = this._filmAmount;
      this._filmAmount += FILM_CARD_SHOW_BY_BUTTON;

      const newFilms = renderFilms(filmListContainer, this._filmCardsSort.slice(prevFilmCount, this._filmAmount), this._onDataChange, this._onViewChange);
      this._showedFilmContollers = this._showedFilmContollers.concat(newFilms);

      if (this._filmAmount >= this._films.length) {
        remove(this._buttonShowMore);
      }
    };

    this._buttonShowMore.setClickHandler(renderOnButtonClick);
  }

  _onDataChange(oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    const filmController = this._showedFilmContollers.filter((item) => item.filmCards.film === oldData);

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    remove(this._siteMenu);
    this._siteMenu = new SiteMenu(this._films);
    render(this._container, this._siteMenu, `afterbegin`);

    filmController.forEach((item) => item.render(this._films[index]));
  }

  _onViewChange() {
    this._showedFilmContollers.forEach((item) => item._setDefaultView());
  }
}
