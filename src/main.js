import PageController from "./controllers/page-controllers.js";
import {SiteMenuController} from "./controllers/site-menu-controller.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
import Movies from "./models/movies.js";


const RANDOM_FILM = 20;
const main = document.querySelector(`.main`);

export const randomFilms = getRandomFilmsArray(RANDOM_FILM);
console.log(randomFilms);

const movieModel = new Movies();
movieModel.setFilms(randomFilms);

const pageController = new PageController(main, movieModel);
const siteMenuController = new SiteMenuController(main, movieModel);

siteMenuController.render();
pageController.render();
pageController._renderOnButtonClick();
pageController._setSortTypeChangeHadnler();
