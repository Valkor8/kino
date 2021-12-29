import FilmCards from "../components/film-card.js";
import FilmPopup from "../components/film-details-popup.js";
import ProfileRating from "../components/profile-rating.js";
import Sort from "../components/sort.js";
import Stats from "../components/footer-statistic.js";
import SiteMenu from "../components/site-menu-and-stats.js";
import TopRated from "../components/top-rated.js";
import MostCommented from "../components/most-commented.js";
import MessageNoFilm from "../components/no-films.js";
import ButtonShowMore from "../components/button-show-more.js";
import {filter} from "../mock/filter.js";
import {render, renderContainer} from "../utils/render.js";
import {randomProfileRating} from "../mock/random-rating.js";
import {setEventHandlers} from "../utils/handlers.js";
import {getRandomInt} from "../mock/random-generator.js";
import {renderSortFilms} from "../utils/render.js";


const TOTAL_FILMS = getRandomInt(1000, 100000);
const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;

export default class PageController {
  constructor(container) {
    this._container = container;

    this._sort = new Sort();
    this.filmCards = new FilmCards();
    this._buttonShowMore = new ButtonShowMore();
    this._topRated = new TopRated();
    this._mostCommented = new MostCommented();
  }

  render(films) {
    render(`.header`, new ProfileRating(randomProfileRating));

    render(this._container, new SiteMenu(filter));

    render(this._container, this._sort);

    renderContainer(this._container, this.filmCards);

    const renderFilms = (place, film) => {
      const filmCards = new FilmCards(film);
      const filmPopup = new FilmPopup(film);

      setEventHandlers(place, filmCards, filmPopup);

      render(place, filmCards);
    };

    if (films.length === 0 || !films) {
      render(this._container, new MessageNoFilm());

    } else {

      films.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
        renderFilms(`.films-list__container`, item);
      });

      render(`.films-list`, this._buttonShowMore);

      renderContainer(`.films`, this._topRated);

      const renderTopRated = (place, film) => {
        const topRated = new TopRated(film);
        const filmPopup = new FilmPopup(film);

        setEventHandlers(place, topRated, filmPopup);

        render(place, topRated);
      };

      films
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 2)
        .forEach((item) => renderTopRated(`#top-rated .films-list__container`, item));

      renderContainer(`.films`, this._mostCommented);

      const renderMostCommented = (place, film) => {
        const mostCommented = new MostCommented(film);
        const filmPopup = new FilmPopup(film);

        setEventHandlers(place, mostCommented, filmPopup);

        render(place, mostCommented);
      };

      films
        .slice()
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, 2)
        .forEach((item) => renderMostCommented(`#most-commented .films-list__container`, item));
    }

    render(`.footer__statistics`, new Stats(TOTAL_FILMS));


    let filmCardsSort = films;
    const FILM_CARD_SHOW_BY_BUTTON = 5;
    let filmAmount = FILM_CARDS_AMOUNT;

    const filmListContainer = document.querySelector(`.films-list__container`);

    this._sort.setSortTypeChangeHandler((sortType) => {
      filmListContainer.innerHTML = ``;

      filmCardsSort = renderSortFilms(films, sortType);
      filmCardsSort.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
        renderFilms(`.films-list__container`, item);
      });

      if (!document.querySelector(`.films-list__show-more`)) {
        render(`.films-list`, this._buttonShowMore);
      }

      filmAmount = FILM_CARDS_AMOUNT;
    });

    const renderOnButtonClick = (filmsSort) => {
      let prevFilmCount = filmAmount;
      filmAmount += FILM_CARD_SHOW_BY_BUTTON;
      filmsSort.slice(prevFilmCount, filmAmount).forEach((item) => {
        renderFilms(`.films-list__container`, item);
        if (filmAmount >= films.length) {
          this._buttonShowMore.getElement().remove();
        }
      });
    };

    const onButtonClick = () => {
      renderOnButtonClick(filmCardsSort);
    };

    this._buttonShowMore.setClickHandler(onButtonClick);
  }
}
