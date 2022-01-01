import PageController from "./controllers/page-controllers.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
// import "./controllers/page-controllers.js";

const main = document.querySelector(`.main`);

export const randomFilms = getRandomFilmsArray();
console.log(randomFilms);

const pageController = new PageController(main);

pageController.render(randomFilms);
pageController._renderOnButtonClick();
pageController._setSortTypeChangeHadnler();
