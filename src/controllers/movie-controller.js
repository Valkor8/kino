import FilmCards from "../components/film-card.js";
import FilmPopup from "../components/film-details-popup.js";
import {remove, render, replace} from "../utils/render.js";
import {setFilmCardsHandlers, setFilmPopupHandlers} from "../utils/handlers.js";


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this.filmCards = null;
    this.filmPopup = null;

    this._onDataChange = onDataChange;
  }

  render(film) {
    const oldFilm = this.filmCards;
    const oldPopup = this.filmPopup;

    this.filmCards = new FilmCards(film);
    this.filmPopup = new FilmPopup(film);

    if (oldFilm) {
      replace(this.filmCards, oldFilm);
      replace(this.filmPopup, oldPopup);
      setFilmPopupHandlers(film, this.filmPopup, this._onDataChange);
    } else {
      render(this._container, this.filmCards);
    }

    const setEventPopupOpenAndCloseHandlers = (container, filmInstance, popupInstance) => {
      const filmDetails = document.querySelector(`#film-details`);
      const onShowPopup = () => {
        if (filmDetails) {
          filmDetails.remove();
        }
        container.appendChild(popupInstance.getElement());
        popupInstance.setClickHandler(onRemovePopupClick);
        document.addEventListener(`keydown`, onRemovePopupEsc);
        popupInstance.emojiListHandler();
        setFilmPopupHandlers(film, this.filmPopup, this._onDataChange);
      };

      const onRemovePopupEsc = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          remove(popupInstance);
          document.removeEventListener(`keydown`, onRemovePopupEsc);
        }
      };

      const onRemovePopupClick = () => {
        remove(popupInstance);
        document.removeEventListener(`keydown`, onRemovePopupEsc);
      };

      popupInstance.setClickHandler(onRemovePopupClick);
      document.addEventListener(`keydown`, onRemovePopupEsc);

      filmInstance.setClickHadnler(onShowPopup);
    };

    setEventPopupOpenAndCloseHandlers(this._container, this.filmCards, this.filmPopup);

    setFilmCardsHandlers(film, this.filmCards, this._onDataChange);


  }
}
