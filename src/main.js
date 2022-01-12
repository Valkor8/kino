import PageController from "./controllers/page-controllers.js";
import {SiteMenuController} from "./controllers/site-menu-controller.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
import Movies from "./models/movies.js";
import StatsComponent from "./components/stats-component.js";
import {render} from "./utils/render.js";


const RANDOM_FILM = 20;
const main = document.querySelector(`.main`);

export const randomFilms = getRandomFilmsArray(RANDOM_FILM);
console.log(randomFilms);

const movieModel = new Movies();
movieModel.setFilms(randomFilms);

const siteMenuController = new SiteMenuController(main, movieModel);
const stats = new StatsComponent(movieModel);
const pageController = new PageController(main, movieModel, siteMenuController);

siteMenuController.render();
render(main, stats);
pageController.render();
pageController._renderOnButtonClick();
pageController._setSortTypeChangeHadnler();

stats.hide(stats.getElement());

siteMenuController.movieAndStatsToggle(
    () => {
      stats.rerender();
      stats.chart();
      stats.show(stats.getElement());
      pageController.hide();
    },
    () => {
      pageController.show();
      stats.hide(stats.getElement());
    });
