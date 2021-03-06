import FilmCards from "../components/film-card.js";
import ProfileRating from "../components/profile-rating.js";
import Sort from "../components/sort.js";
import Stats from "../components/footer-statistic.js";
import TopRated from "../components/top-rated.js";
import MostCommented from "../components/most-commented.js";
import MessageNoFilm from "../components/no-films.js";
import ButtonShowMore from "../components/button-show-more.js";
import MovieController from "./movie-controller.js";
import {remove, render, renderContainer, replace} from "../utils/render.js";
import {randomProfileRating} from "../mock/random-rating.js";
import {getRandomInt} from "../mock/random-generator.js";
import {renderSortFilms} from "../utils/render.js";
import Movie from "../models/movie.js";


const TOTAL_FILMS = getRandomInt(1000, 100000);
const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;
const FILM_CARD_SHOW_BY_BUTTON = 5;

const header = document.querySelector(`.header`);
const footerStatistics = document.querySelector(`.footer__statistics`);

export const renderFilms = (container, films, onDataChange, onViewChange, api) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange, api);

    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container, filmsModel, siteMenuController, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._siteMenuController = siteMenuController;

    this._films = [];
    this._filmCardsSort = [];
    this._showedFilmControllers = [];
    this._showedMainFilmControllers = [];
    this._newTopRatedFilms = [];
    this._newMostCommentedFilms = [];
    this._filmListMainContainer = ``;
    this._filmsElement = ``;
    this._filmAmount = FILM_CARDS_AMOUNT;

    this._api = api;

    this._sort = new Sort();
    this.filmCards = new FilmCards();
    this._buttonShowMore = new ButtonShowMore();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._films = this._filmsModel.getFilms();
    this._filmCardsSort = this._filmsModel.getFilms();

    render(header, new ProfileRating(randomProfileRating));

    renderContainer(this._container, this.filmCards);

    this._filmsElement = this._container.querySelector(`.films`);
    this._filmListMainContainer = this._container.querySelector(`.films-list__container-main`);
    const filmlist = this._container.querySelector(`.films-list`);

    render(this._filmsElement, this._sort, `afterbegin`);

    if (this._films.length === 0 || !this._films) {
      render(this._container, new MessageNoFilm());
      return;
    }

    const newFilms = renderFilms(this._filmListMainContainer, this._films.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange, this._api);
    this._showedFilmControllers = this._showedMainFilmControllers = this._showedFilmControllers.concat(newFilms);

    render(filmlist, this._buttonShowMore);

    this._renderTopRaited();

    renderContainer(this._filmsElement, this._mostCommented);
    this._renderMostCommented();

    render(footerStatistics, new Stats(TOTAL_FILMS));
  }

  _renderTopRaited() {
    const sumRating = this._films.reduce((acc, item) => acc + item.rating, 0);
    if (sumRating === 0) {
      return;
    }
    renderContainer(this._filmsElement, this._topRated);

    const topRaitedContainer = this._container.querySelector(`#top-rated .films-list__container`);

    this._newTopRatedFilms = renderFilms(topRaitedContainer, this._films
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 2), this._onDataChange, this._onViewChange, this._api);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newTopRatedFilms);
  }

  _renderMostCommented() {
    const mostCommentedContainer = this._container.querySelector(`#most-commented .films-list__container`);

    if (this._newMostCommentedFilms[0]) {
      this._newMostCommentedFilms.forEach((filmController) => filmController.destroy());
      this._showedFilmControllers = this._showedMainFilmControllers.concat(this._newTopRatedFilms);
    }

    this._newMostCommentedFilms = renderFilms(mostCommentedContainer, this._films
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, 2), this._onDataChange, this._onViewChange, this._api);
    this._showedFilmControllers = this._showedFilmControllers.concat(this._newMostCommentedFilms);
    console.log(this._showedFilmControllers);
  }

  _setSortTypeChangeHadnler() {
    this._sort.setSortTypeChangeHandler((sortType) => {
      this._removeFilms();
      this._filmCardsSort = renderSortFilms(this._filmsModel.getFilms(), sortType);

      const newFilms = renderFilms(this._filmListMainContainer, this._filmCardsSort.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange, this._api);
      this._showedMainFilmControllers = newFilms;
      this._showedFilmControllers = newFilms.concat(this._newTopRatedFilms, this._newMostCommentedFilms);

      this._renderButtonClick();
    });
  }

  _renderOnButtonClick() {
    const renderOnButtonClick = () => {
      let prevFilmCount = this._filmAmount;
      this._filmAmount += FILM_CARD_SHOW_BY_BUTTON;

      const newFilms = renderFilms(this._filmListMainContainer, this._filmCardsSort.slice(prevFilmCount, this._filmAmount), this._onDataChange, this._onViewChange, this._api);
      this._showedMainFilmControllers = this._showedMainFilmControllers.concat(newFilms);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._filmAmount >= this._filmCardsSort.length) {
        remove(this._buttonShowMore);
      }
    };
    this._buttonShowMore.setClickHandler(renderOnButtonClick);
  }

  _renderButtonClick() {
    this._filmAmount = FILM_CARDS_AMOUNT;

    const filmListShowMore = this._container.querySelector(`.films-list__show-more`);
    const filmList = this._container.querySelector(`.films-list`);

    if (!filmListShowMore) {
      render(filmList, this._buttonShowMore);
      this._buttonShowMore.setClickHandler(this._renderOnButtonClick());
    }

    if (this._filmAmount >= this._filmCardsSort.length) {
      remove(this._buttonShowMore);
    }
  }

  _updateFilms(count) {
    this._removeFilms();
    renderFilms(this._container.querySelector(`.films-list__container-main`), this._filmCardsSort.slice(0, count));
  }

  _onDataChange(oldData, newData, comment) {
    if (newData === null) {
      const isRemove = this._filmsModel.removeComments(oldData, comment.id);

      if (isRemove) {
        const delCommentFilmController = this._showedFilmControllers.filter((item) => item.filmCards.film.id === oldData.id);
        delCommentFilmController.forEach((item) => item.render(oldData));

        this._renderMostCommented();
      }
    } else if (oldData === null) {
      if (newData) {
        const isAdd = this._filmsModel.addComments(newData);

        if (isAdd) {
          const addCommentController = this._showedFilmControllers.filter((item) => item.filmCards.film.id === newData.id);
          addCommentController.forEach((item) => item.render(newData));
        }
      }
    } else {
      this._api.updateFilms(oldData.id, newData)
        .then((filmModel) => {
          const isSucces = this._filmsModel.updateFilm(oldData.id, filmModel);
          if (isSucces) {
            const filmController = this._showedFilmControllers.filter((item) => item.filmCards.film.id === oldData.id);
            filmController.forEach((item) => item.render(filmModel));
          }
        });
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((item) => item._setDefaultView());
  }

  _replaceSort() {
    const oldSort = this._sort;
    this._sort = new Sort();
    replace(this._sort, oldSort);
    this._setSortTypeChangeHadnler();
  }

  _onFilterChange() {
    this._removeFilms();
    this._filmCardsSort = this._filmsModel.getFilms();
    const newFilms = renderFilms(this._filmListMainContainer, this._filmCardsSort.slice(0, FILM_CARDS_AMOUNT), this._onDataChange, this._onViewChange, this._api);

    this._replaceSort();

    this._showedMainFilmControllers = newFilms;
    this._showedFilmControllers = newFilms.concat(this._newTopRatedFilms, this._newMostCommentedFilms);

    this._renderButtonClick();
  }

  _removeFilms() {
    this._showedMainFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedMainFilmControllers = [];
  }

  show() {
    this._filmsElement.classList.remove(`visually-hidden`);
  }

  hide() {
    this._filmsElement.classList.add(`visually-hidden`);
  }
}
