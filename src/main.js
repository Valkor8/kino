import {createProfileRating} from "./components/profile-rating.js";
import {SiteMenu} from "./components/site-menu-and-stats.js";
import {createSort} from "./components/sort.js";
import {createSectionFilms} from "./components/film-card.js";
import {createFilmCard} from "./components/film-card.js";
import {createButtonShowMore} from "./components/film-card.js";
import {createTopRatedContainer} from "./components/top-rated.js";
import {createTopRated} from "./components/top-rated.js";
import {createMostCommentedContainer} from "./components/most-commented.js";
import {createMostCommented} from "./components/most-commented.js";
import {createFooterStatistic} from "./components/footer-statistic.js";
import {showPopup} from "./components/film-details-popup.js";
import "./mock/random-films.js";
import "./components/film-card.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
import {buttonAddToWatchlistHandlerFn} from "./components/film-card.js";
import {removeButtonAddToWatchlistHandlerFn} from "./components/film-card.js";
import {render, RenderPosition} from "./util.js";
import {filter} from "./mock/filter.js";

const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;
const FILM_CARD_SHOW_BY_BUTTON = 5;

const randomFilms = getRandomFilmsArray();
// console.log(randomFilms);

const renderHTMLElemens = (container, html, position = `beforeend`) => {
  const place = document.querySelector(container);
  place.insertAdjacentHTML(position, html);
};


renderHTMLElemens(`.header`, createProfileRating());
// renderHTMLElemens(`.main`, createSiteMenuAndStats(filter));
render(`.main`, new SiteMenu(filter).getElement());
renderHTMLElemens(`.main`, createSort());
renderHTMLElemens(`.main`, createSectionFilms());
randomFilms.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
  renderHTMLElemens(`.films-list__container`, createFilmCard(item));
});
renderHTMLElemens(`.films-list`, createButtonShowMore());
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

renderHTMLElemens(`.footer__statistics`, createFooterStatistic());

document.addEventListener(`click`, showPopup);

buttonAddToWatchlistHandlerFn();

let filmAmount = FILM_CARDS_AMOUNT;

const buttonShowMore = document.querySelector(`.films-list__show-more`);
buttonShowMore.addEventListener(`click`, () => {
  removeButtonAddToWatchlistHandlerFn();
  let prevFilmCount = filmAmount;
  filmAmount += FILM_CARD_SHOW_BY_BUTTON;
  randomFilms.slice(prevFilmCount, filmAmount).forEach((item) => {
    renderHTMLElemens(`.films-list__container`, createFilmCard(item));
    if (filmAmount >= randomFilms.length) {
      buttonShowMore.remove();
    }
  });
  buttonAddToWatchlistHandlerFn();
});

export {randomFilms, renderHTMLElemens};
