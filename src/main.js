import {createProfileRating} from "./components/profile-rating.js";
import {createSiteMenuAndStats} from "./components/site-menu-and-sort.js";
import {createSort} from "./components/site-menu-and-sort.js";
import {createSectionFilms} from "./components/film-crad.js";
import {createFilmCard} from "./components/film-crad.js";
import {createButtonShowMore} from "./components/film-crad.js";
import {createTopRated} from "./components/top-rated.js";
import {createMostCommented} from "./components/most-commented.js";
import {createFooterStatistic} from "./components/footer-statistic.js";
import {createFilmDetailsPopup} from "./components/film-details-popup.js";

const renderHTMLElemens = (className, html, position = `beforeend`) => {
  const place = document.querySelector(className);
  place.insertAdjacentHTML(position, html);
};

renderHTMLElemens(`.header`, createProfileRating());
renderHTMLElemens(`.main`, createSiteMenuAndStats());
renderHTMLElemens(`.main`, createSort());
renderHTMLElemens(`.main`, createSectionFilms());
for (let i = 0; i < 5; i++) {
  renderHTMLElemens(`.films-list__container`, createFilmCard());
}
renderHTMLElemens(`.films-list`, createButtonShowMore());
renderHTMLElemens(`.films`, createTopRated());
renderHTMLElemens(`.films`, createMostCommented());
renderHTMLElemens(`.footer__statistics`, createFooterStatistic());
renderHTMLElemens(`.footer`, createFilmDetailsPopup(), `afterend`);
