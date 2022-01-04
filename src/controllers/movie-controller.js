import FilmCards from "../components/film-card.js";
import FilmPopup from "../components/film-details-popup.js";
import {remove, render, replace} from "../utils/render.js";
import {setFilmCardsHandlers, setFilmPopupHandlers} from "../utils/handlers.js";


export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this.filmCards = null;
    this.filmPopup = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
  }

  render(film) {
    const oldFilm = this.filmCards;
    const oldPopup = this.filmPopup;

    this.filmCards = new FilmCards(film);
    this.filmPopup = new FilmPopup(film);

    const onShowPopup = () => {
      this._onViewChange();
      this._container.appendChild(this.filmPopup.getElement());
      this.filmPopup.setClickHandler(onRemovePopupClick);
      document.addEventListener(`keydown`, onRemovePopupEsc);
      this.filmPopup.emojiListHandler();
      setFilmPopupHandlers(film, this.filmPopup, this._onDataChange);
    };

    const onRemovePopupClick = () => {
      remove(this.filmPopup);
      document.removeEventListener(`keydown`, onRemovePopupEsc);
    };

    const onRemovePopupEsc = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        remove(this.filmPopup);
        document.removeEventListener(`keydown`, onRemovePopupEsc);
      }
    };

    if (oldFilm) {
      replace(this.filmCards, oldFilm);
      replace(this.filmPopup, oldPopup);
      setFilmPopupHandlers(film, this.filmPopup, this._onDataChange);
      this.filmPopup.recoveryListeners();
      this.filmPopup.setClickHandler(onRemovePopupClick);

    } else {
      render(this._container, this.filmCards);
    }

    this.filmCards.setClickHadnler(onShowPopup);

    setFilmCardsHandlers(film, this.filmCards, this._onDataChange);
  }

  _setDefaultView() {
    remove(this.filmPopup);
  }
}
