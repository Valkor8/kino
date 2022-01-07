import FilmCards from "../components/film-card.js";
import ProfileRating from "../components/profile-rating.js";
import Sort from "../components/sort.js";
import Stats from "../components/footer-statistic.js";
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

export const renderFilms = (container, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container, filmModel) {
    this._container = container;
    this._filmModel = filmModel;

    this._films = [];
    this._filmCardsSort = [];
    this._showedFilmControllers = [];
    this._newTopRatedFilms = [];
    this._newMostCommentedFilms = [];
    this._filmListMainContainer = ``;
    this._filmAmount = FILM_CARDS_AMOUNT;

    this._sort = new Sort();

    this.filmCards = new FilmCards();
    this._buttonShowMore = new ButtonShowMore();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmModel.getFilms();
    this._filmCardsSort = this._filmModel.getFilms();

    render(header, new ProfileRating(randomProfileRating));

    render(this._container, this._sort);

    renderContainer(this._container, this.filmCards);

    const filmsElement = this._container.querySelector(`.films`);
    this._filmListMainContainer = this._container.querySelector(`.films-list__container-main`);
    const filmlist = this._container.querySelector(`.films-list`);

    if (this._films.length === 0 || !this._films) {
      render(this._container, new MessageNoFilm());
      return;
    }

    const newFilms = renderFilms(this._filmListMainContainer, this._films.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

    render(filmlist, this._buttonShowMore);

    renderContainer(filmsElement, this._topRated);
    const topRaitedContainer = this._container.querySelector(`#top-rated .films-list__container`);

    this._newTopRatedFilms = renderFilms(topRaitedContainer, this._films
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newTopRatedFilms);

    renderContainer(filmsElement, this._mostCommented);

    const mostCommentedContainer = this._container.querySelector(`#most-commented .films-list__container`);

    this._newMostCommentedFilms = renderFilms(mostCommentedContainer, this._films
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 2), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newMostCommentedFilms);

    render(footerStatistics, new Stats(TOTAL_FILMS));
  }

  _setSortTypeChangeHadnler() {
    this._sort.setSortTypeChangeHandler((sortType) => {
      this._filmListMainContainer.innerHTML = ``;
      this._filmCardsSort = renderSortFilms(this._filmModel.getFilms(), sortType);

      const newFilms = renderFilms(this._filmListMainContainer, this._filmCardsSort.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = newFilms.concat(this._newTopRatedFilms, this._newMostCommentedFilms);

      this._renderButtonClick();
    });
  }

  _renderOnButtonClick() {
    const renderOnButtonClick = () => {
      let prevFilmCount = this._filmAmount;
      this._filmAmount += FILM_CARD_SHOW_BY_BUTTON;

      const newFilms = renderFilms(this._filmListMainContainer, this._filmCardsSort.slice(prevFilmCount, this._filmAmount), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._filmAmount >= this._filmCardsSort.length) {
        remove(this._buttonShowMore);
      }
    };
    this._buttonShowMore.setClickHandler(renderOnButtonClick);
  }

  _renderButtonClick() {
    const filmListShowMore = this._container.querySelector(`.films-list__show-more`);
    const filmList = this._container.querySelector(`.films-list`);

    if (!filmListShowMore) {
      render(filmList, this._buttonShowMore);
      this._buttonShowMore.setClickHandler(this._renderOnButtonClick());
    }
    this._filmAmount = FILM_CARDS_AMOUNT;
  }

  _updateFilms(count) {
    this._removeFilms();
    renderFilms(this._container.querySelector(`.films-list__container-main`), this._filmCardsSort.slice(0, count));
  }

  _onDataChange(oldData, newData) {
    const isSucces = this._filmModel.updateFilm(oldData.id, newData);

    if (isSucces) {
      const filmController = this._showedFilmControllers.filter((item) => item.filmCards.film.id === oldData.id);
      filmController.forEach((item) => item.render(newData));
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((item) => item._setDefaultView());
  }

  _onFilterChange() {
    this._filmListMainContainer.innerHTML = ``;
    this._filmCardsSort = this._filmModel.getFilms();
    const newFilms = renderFilms(this._filmListMainContainer, this._filmCardsSort.slice(0, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms.concat(this._newTopRatedFilms, this._newMostCommentedFilms);

    this._renderButtonClick();
  }

  _removeFilms() {
    //
  }
}
