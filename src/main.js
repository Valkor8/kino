import FilmCards from "./components/film-card.js";
import FilmPopup from "./components/film-details-popup.js";
import ProfileRating from "./components/profile-rating.js";
import Sort from "./components/sort.js";
import Stats from "./components/footer-statistic.js";
import SiteMenu from "./components/site-menu-and-stats.js";
import TopRated from "./components/top-rated.js";
import MostCommented from "./components/most-commented.js";
import {getRandomInt} from "./mock/random-generator.js";
import {filter} from "./mock/filter.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
import {render} from "./util.js";
import {randomProfileRating} from "./mock/random-rating.js";


const TOTAL_FILMS = getRandomInt(1000, 100000);
const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;

const randomFilms = getRandomFilmsArray();
console.log(randomFilms);

render(`.header`, new ProfileRating(randomProfileRating).getElement());

render(`.main`, new SiteMenu(filter).getElement());

render(`.main`, new Sort().getElement());

render(`.main`, new FilmCards().getSectionFilms());

const renderFilms = (container, film) => {
  const filmCards = new FilmCards(film);
  const filmPopup = new FilmPopup(film);

  const containerNode = document.querySelector(container);

  const onShowPopup = () => {
    containerNode.appendChild(filmPopup.getElement());
    const popupCloseButton = filmPopup.getElement().querySelector(`.film-details__close-btn`);
    popupCloseButton.addEventListener(`click`, onRemovePopup);
  };

  const onRemovePopup = () => {
    containerNode.removeChild(filmPopup.getElement());
  };

  const filmCardClik = filmCards.getElement().querySelectorAll(`.film-card__click`);
  filmCardClik.forEach((item) => item.addEventListener(`click`, onShowPopup));


  render(container, filmCards.getElement());
};

randomFilms.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
  renderFilms(`.films-list__container`, item);
});

render(`.films`, new TopRated().getContainer());

randomFilms
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 2)
  .forEach((item) => render(`#top-rated .films-list__container`, new TopRated(item).getElement()));

render(`.films`, new MostCommented().getContainer());

randomFilms
  .slice()
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, 2)
  .forEach((item) => render(`#most-commented .films-list__container`, new MostCommented(item).getElement()));

render(`.footer__statistics`, new Stats(TOTAL_FILMS).getElement());

const FILM_CARD_SHOW_BY_BUTTON = 5;
let filmAmount = FILM_CARDS_AMOUNT;

const buttonShowMore = document.querySelector(`.films-list__show-more`);
buttonShowMore.addEventListener(`click`, () => {
  let prevFilmCount = filmAmount;
  filmAmount += FILM_CARD_SHOW_BY_BUTTON;
  randomFilms.slice(prevFilmCount, filmAmount).forEach((item) => {
    renderFilms(`.films-list__container`, item);
    if (filmAmount >= randomFilms.length) {
      buttonShowMore.remove();
    }
  });
});
