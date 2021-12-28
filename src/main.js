import FilmCards from "./components/film-card.js";
import FilmPopup from "./components/film-details-popup.js";
import ProfileRating from "./components/profile-rating.js";
import Sort from "./components/sort.js";
import Stats from "./components/footer-statistic.js";
import SiteMenu from "./components/site-menu-and-stats.js";
import TopRated from "./components/top-rated.js";
import MostCommented from "./components/most-commented.js";
import MessageNoFilm from "./components/no-films.js";
import ButtonShowMore from "./components/button-show-more.js";
import {getRandomInt} from "./mock/random-generator.js";
import {filter} from "./mock/filter.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
import {render, renderContainer} from "./utils/render.js";
import {randomProfileRating} from "./mock/random-rating.js";

const TOTAL_FILMS = getRandomInt(1000, 100000);
const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;

const randomFilms = getRandomFilmsArray();
console.log(randomFilms);

render(`.header`, new ProfileRating(randomProfileRating));

render(`.main`, new SiteMenu(filter));

render(`.main`, new Sort());

renderContainer(`.main`, new FilmCards());

const renderFilms = (container, film) => {
  const filmCards = new FilmCards(film);
  const filmPopup = new FilmPopup(film);

  const containerNode = document.querySelector(container);

  const onShowPopup = () => {
    containerNode.appendChild(filmPopup.getElement());
    filmPopup.setClickHandler(onRemovePopupClick);
    document.addEventListener(`keydown`, onRemovePopupEsc);
  };

  const onRemovePopupEsc = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      containerNode.removeChild(filmPopup.getElement());
      document.removeEventListener(`keydown`, onRemovePopupEsc);
    }
  };

  const onRemovePopupClick = () => {
    containerNode.removeChild(filmPopup.getElement());
    filmPopup.removeElement();
  };

  filmCards.setClickHadnler(onShowPopup);

  render(container, filmCards);
};

if (randomFilms.length > 0) {
  randomFilms.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
    renderFilms(`.films-list__container`, item);
  });

  const buttonShowMore = new ButtonShowMore();
  render(`.films`, buttonShowMore);

  renderTopRatedAndMostCommented = () => {
    //Навесить обработчики

    renderContainer(`.films`, new TopRated());
    randomFilms
        .slice()
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 2)
        .forEach((item) => render(`#top-rated .films-list__container`, new TopRated(item)));

    renderContainer(`.films`, new MostCommented());

    randomFilms
        .slice()
        .sort((a, b) => b.comments.length - a.comments.length)
        .slice(0, 2)
        .forEach((item) => render(`#most-commented .films-list__container`, new MostCommented(item)));
  };

} else {
  render(`.main`, new MessageNoFilm());
}

render(`.footer__statistics`, new Stats(TOTAL_FILMS));

const FILM_CARD_SHOW_BY_BUTTON = 5;
let filmAmount = FILM_CARDS_AMOUNT;

const filmListShowMore = document.querySelector(`.films-list__show-more`);
filmListShowMore.addEventListener(`click`, () => {
  let prevFilmCount = filmAmount;
  filmAmount += FILM_CARD_SHOW_BY_BUTTON;
  randomFilms.slice(prevFilmCount, filmAmount).forEach((item) => {
    renderFilms(`.films-list__container`, item);
    if (filmAmount >= randomFilms.length) {
      filmListShowMore.remove();
    }
  });
});
