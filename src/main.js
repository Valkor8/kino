import PageController from "./controllers/page-controllers.js";
import {getRandomFilmsArray} from "./mock/random-films.js";

const main = `.main`;

const randomFilms = getRandomFilmsArray();
console.log(randomFilms);

const pageController = new PageController(main);
pageController.render(randomFilms);
