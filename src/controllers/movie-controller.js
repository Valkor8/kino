import FilmCards from "../components/film-card.js";
import FilmPopup from "../components/film-details-popup.js";
import {remove, render, replace} from "../utils/render.js";
import {setFilmCardsHandlers, setFilmPopupHandlers} from "../utils/handlers.js";
import {encode} from "he";

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._api = api;

    this.filmCards = null;
    this.filmPopup = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._popup = false;
  }

  render(film) {
    const oldFilm = this.filmCards;
    const oldPopup = this.filmPopup;

    this.filmCards = new FilmCards(film);
    this.filmPopup = new FilmPopup(film);

    const onShowPopup = () => {
      this._popup = true;
      this._onViewChange();
      this._container.appendChild(this.filmPopup.getElement());
      if (this._popup) {
        document.addEventListener(`keydown`, onRemovePopupEsc);
        document.addEventListener(`keydown`, addCommentHandler);
      }
      this.filmPopup.setClickHandler(onRemovePopupClick);
      this.filmPopup.emojiListHandler();
      this.filmPopup.removeCommentHandler(this.filmPopup.film, this._onDataChange);
      setFilmPopupHandlers(film, this.filmPopup, this._onDataChange);
    };

    const addCommentHandler = (evt) => {
      if ((evt.ctrlKey || evt.metaKey) && evt.key === `Enter`) {
        const form = this.filmPopup.getElement().querySelector(`.film-details__inner`);
        const notSanitazedInputValue = form.querySelector(`.film-details__comment-input`).value;
        const emotionImg = form.querySelector(`.film-details__add-emoji-label img`).getAttribute(`src`);
        const textComment = encode(notSanitazedInputValue);
        if (!notSanitazedInputValue || !emotionImg) {
          return;
        }

        const comment = {
          id: (Math.floor(1000000 * Math.random())).toString(),
          comment: textComment,
          emotion: `smile`,
          author: null,
          date: new Date().toISOString(),
        };
        this._api.createComment(film.id, comment)
          .then((data) => {
            film.comments = data.comments;
            this._onDataChange(null, film);
          });
      }
    };

    const onRemovePopupEsc = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._popup = false;
        remove(this.filmPopup);
        this.filmPopup.resetCommnets();
        document.removeEventListener(`keydown`, onRemovePopupEsc);
        document.removeEventListener(`keydown`, addCommentHandler);
      }
    };

    const onRemovePopupClick = (evt) => {
      this._popup = false;
      evt.preventDefault();
      remove(this.filmPopup);
      this.filmPopup.resetCommnets();
      document.removeEventListener(`keydown`, onRemovePopupEsc);
      document.removeEventListener(`keydown`, addCommentHandler);
    };

    if (oldFilm && oldPopup) {
      replace(this.filmCards, oldFilm);
      replace(this.filmPopup, oldPopup);

      setFilmPopupHandlers(film, this.filmPopup, this._onDataChange);
      this.filmPopup.emojiListHandler();
      this.filmPopup.setClickHandler(onRemovePopupClick);
      this.filmPopup.removeCommentHandler(this.filmPopup.film, this._onDataChange);

    } else {
      render(this._container, this.filmCards);
    }

    this.filmCards.setClickHadnler(onShowPopup);

    setFilmCardsHandlers(film, this.filmCards, this._onDataChange);
  }

  _setDefaultView() {
    remove(this.filmPopup);
  }

  destroy() {
    remove(this.filmPopup);
    remove(this.filmCards);
  }
}
