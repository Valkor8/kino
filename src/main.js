import PageController from "./controllers/page-controllers.js";
import {getRandomFilmsArray} from "./mock/random-films.js";


const main = `.main`;

export const randomFilms = getRandomFilmsArray();
console.log(randomFilms);

const pageController = new PageController(main);

pageController.render(randomFilms);
pageController._renderOnButtonClick();
pageController._setSortTypeChangeHadnler();
