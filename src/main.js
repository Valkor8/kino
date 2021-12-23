import {createProfileRating} from "./components/profile-rating.js";
import {createSiteMenuAndStats} from "./components/site-menu-and-sort.js";
import {createSort} from "./components/site-menu-and-sort.js";
import {createSectionFilms} from "./components/film-card.js";
import {createFilmCard} from "./components/film-card.js";
import {createButtonShowMore} from "./components/film-card.js";
import {createTopRated} from "./components/top-rated.js";
import {createMostCommented} from "./components/most-commented.js";
import {createFooterStatistic} from "./components/footer-statistic.js";
import {createFilmDetailsPopup} from "./components/film-details-popup.js";
import "./mock/random-films.js";
import {renderRandomFilm} from "./mock/random-films.js";

const RADOM_FILM = 15;


const getRandomFilmsArray = () => {
  const films = [];
  for (let i = 0; i < RADOM_FILM; i++) {
    films.push(renderRandomFilm());
    films[i].id = i;
  }
  return films;
};

const randomFilms = getRandomFilmsArray();
console.log(randomFilms);

const renderHTMLElemens = (className, html, position = `beforeend`) => {
  const place = document.querySelector(className);
  place.insertAdjacentHTML(position, html);
};

renderHTMLElemens(`.header`, createProfileRating());
renderHTMLElemens(`.main`, createSiteMenuAndStats());
renderHTMLElemens(`.main`, createSort());
renderHTMLElemens(`.main`, createSectionFilms());
renderHTMLElemens(`.films-list__container`, createFilmCard(randomFilms).join(`\n`));
renderHTMLElemens(`.films-list`, createButtonShowMore());
renderHTMLElemens(`.films`, createTopRated());
renderHTMLElemens(`.films`, createMostCommented());
renderHTMLElemens(`.footer__statistics`, createFooterStatistic());

const showPopup = (evt) => {
  if (evt.target.classList.contains(`film-card__click`)) {
    randomFilms.forEach((item) => {
      if (+evt.target.dataset.id === item.id) {
        if (document.querySelector(`#film-details`)) {
          const filmDetails = document.querySelector(`#film-details`);
          filmDetails.remove();
        }
        renderHTMLElemens(`.footer`, createFilmDetailsPopup(item), `afterend`);
      }
    });
  }
};

document.addEventListener(`click`, showPopup);

const buttonShowMore = document.querySelector(`.films-list__show-more`);
buttonShowMore.addEventListener(`click`, () => {
  renderHTMLElemens(`.films-list__container`, createFilmCard(randomFilms).join(`\n`));
});
