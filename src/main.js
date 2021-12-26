import FilmCards from "./components/film-card.js";
import FilmPopup from "./components/film-details-popup.js";
import ProfileRating from "./components/profile-rating.js";
import Sort from "./components/sort.js";
import Stats from "./components/footer-statistic.js";
import {createMostCommented, createMostCommentedContainer} from "./components/most-commented.js";
import {SiteMenu} from "./components/site-menu-and-stats.js";
import {createTopRated, createTopRatedContainer} from "./components/top-rated.js";
import {filter} from "./mock/filter.js";
import "./mock/random-films.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
import {render} from "./util.js";
import {randomProfileRating} from "./mock/random-rating.js";
import {getRandomInt} from "./mock/random-generator.js";


const TOTAL_FILMS = getRandomInt(1000, 100000);
console.log(TOTAL_FILMS)
const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;
const FILM_CARD_SHOW_BY_BUTTON = 5;

const randomFilms = getRandomFilmsArray();
console.log(randomFilms);

const renderHTMLElemens = (container, html, position = `beforeend`) => {
  const place = document.querySelector(container);
  place.insertAdjacentHTML(position, html);
};

render(`.header`, new ProfileRating(randomProfileRating).getElement());

render(`.main`, new SiteMenu(filter).getElement());

render(`.main`, new Sort().getElement());

render(`.main`, new FilmCards().getSectionFilms());

const renderFilms = (container, film) => {
  const containerNode = document.querySelector(container);
  const onShowPopup = () => {
    containerNode.appendChild(filmPopup.getElement());
  };

  const onRemovePopup = () => {
    containerNode.removeChild(filmPopup.getElement());
  };

  const filmCards = new FilmCards(film);
  const filmCardClik = filmCards.getElement().querySelectorAll(`.film-card__click`);
  filmCardClik.forEach((item) => item.addEventListener(`click`, onShowPopup));

  const filmPopup = new FilmPopup(film);
  const popupCloseButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);
  popupCloseButton.addEventListener(`click`, onRemovePopup);
  render(container, filmCards.getElement());
};

randomFilms.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
  renderFilms(`.films-list__container`, item);
});

renderHTMLElemens(`.films`, createTopRatedContainer());
randomFilms
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 2)
  .forEach((item) => renderHTMLElemens(`#top-rated .films-list__container`, createTopRated(item)));

renderHTMLElemens(`.films`, createMostCommentedContainer());

randomFilms
  .slice()
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, 2)
  .forEach((item) => renderHTMLElemens(`#most-commented .films-list__container`, createMostCommented(item)));

render(`.footer__statistics`, new Stats(TOTAL_FILMS).getElement());


let filmAmount = FILM_CARDS_AMOUNT;

// const buttonShowMore = document.querySelector(`.films-list__show-more`);
// buttonShowMore.addEventListener(`click`, () => {
//   removeButtonAddToWatchlistHandlerFn();
//   let prevFilmCount = filmAmount;
//   filmAmount += FILM_CARD_SHOW_BY_BUTTON;
//   randomFilms.slice(prevFilmCount, filmAmount).forEach((item) => {
//     renderHTMLElemens(`.films-list__container`, createFilmCard(item));
//     if (filmAmount >= randomFilms.length) {
//       buttonShowMore.remove();
//     }
//   });
//   buttonAddToWatchlistHandlerFn();
// });

export { randomFilms, renderHTMLElemens };

