import FilmCards from "../components/film-card.js";
import FilmPopup from "../components/film-details-popup.js";
import {render} from "../utils/render.js";
import {setEventPopupHandlers} from "../utils/handlers.js";


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this.filmCards = null;
    this.filmPopup = null;

    this._onDataChange = onDataChange;
  }

  render(container, film) {
    this.filmCards = new FilmCards(film);
    this.filmPopup = new FilmPopup(film);

    setEventPopupHandlers(container, this.filmCards, this.filmPopup);
    render(container, this.filmCards);

    this.filmCards.buttonAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      alert(evt.target.textContent)
      this._onDataChange();
    });

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
