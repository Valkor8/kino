import FilmCards from "../components/film-card.js";
import FilmPopup from "../components/film-details-popup.js";
import {render, replace} from "../utils/render.js";
import {setEventPopupHandlers} from "../utils/handlers.js";


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this.filmCards = null;
    this.filmPopup = null;

    this._onDataChange = onDataChange;
  }

  render(film) {
    this.filmCards = new FilmCards(film);
    this.filmPopup = new FilmPopup(film);

    setEventPopupHandlers(this._container, this.filmCards, this.filmPopup);
    render(this._container, this.filmCards);

    this.filmCards.recoveryListeners();

    this.filmCards.buttonAddToWatchlistHandler((evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`.film-card__controls-item--active`)) {
        evt.target.classList.add(`.film-card__controls-item--active`);
      } else {
        evt.target.classList.remove(`.film-card__controls-item--active`);
      }

      this._onDataChange(this, film, Object.assign({}, film, {
        filter: {
          watchlist: film.filter.watchlist ? false : true,
          history: film.filter.history,
          favorites: film.filter.favorites,
        }
      }));
    });

    this.filmCards.buttonMarkAsWatchedHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        filter: {
          watchlist: film.filter.watchlist,
          history: film.filter.history ? false : true,
          favorites: film.filter.favorites,
        }
      }));
    });

    this.filmCards.buttonAddToFavoriteHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        filter: {
          watchlist: film.filter.watchlist,
          history: film.filter.history,
          favorites: film.filter.favorites ? false : true,
        }
      }));
    });
  }

  replace(film) {
    this.filmCards = new FilmCards(film);
    this.filmPopup = new FilmPopup(film);

    setEventPopupHandlers(this._container, this.filmCards, this.filmPopup);
    replace(this._container, this.filmCards);
  }
}


// renderTopRated(film) {
//   const renderTopRated = (place, oneFilm) => {
//     const topRated = new TopRated(oneFilm);
//     const filmPopup = new FilmPopup(oneFilm);

//     setEventHandlers(place, topRated, filmPopup);
//     render(place, topRated);
//   };

//   renderTopRated(`#top-rated .films-list__container`, film);
// }

// renderMostCommented(film) {
//   const renderMostCommented = (place, oneFilm) => {
//     const mostCommented = new MostCommented(oneFilm);
//     const filmPopup = new FilmPopup(oneFilm);

//     setEventHandlers(place, mostCommented, filmPopup);
//     render(place, mostCommented);
//   };

//   renderMostCommented(`#most-commented .films-list__container`, film);
// }
