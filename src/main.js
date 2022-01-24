import API from "./api.js";
import PageController from "./controllers/page-controllers.js";
import {SiteMenuController} from "./controllers/site-menu-controller.js";
import {getRandomFilmsArray} from "./mock/random-films.js";
import Movies from "./models/movies.js";
import StatsComponent from "./components/stats-component.js";
import {render} from "./utils/render.js";
import Movie from "./models/movie.js";
import MessageLoading from "./components/loading-message.js";


const RANDOM_FILM = 20;
const AUTHORIZATION = `Basic joifoin45j`;

const main = document.querySelector(`.main`);

export const randomFilms = getRandomFilmsArray(RANDOM_FILM);
console.log(randomFilms);

const api = new API(AUTHORIZATION);
const movieModel = new Movies();

const siteMenuController = new SiteMenuController(main, movieModel);
const stats = new StatsComponent(movieModel);
const pageController = new PageController(main, movieModel, siteMenuController);

siteMenuController.render();
render(main, stats);

const messageLoading = new MessageLoading();
render(main, messageLoading);

api.getFilms()
  .then((films) => {
    messageLoading.deleteMessage();
    console.log(films);
    const parsedFilms = Movie.parseFilms(films);
    console.log(parsedFilms);
    movieModel.setFilms(parsedFilms);
    pageController.render();
  });


pageController._renderOnButtonClick();
pageController._setSortTypeChangeHadnler();

stats.hide(stats.getElement());

siteMenuController.movieAndStatsToggle(
    () => {
      stats.getActualFilms();
      stats.rerender();
      stats.chart();
      stats.show(stats.getElement());
      pageController.hide();
    },
    () => {
      pageController.show();
      stats.hide(stats.getElement());
    }
);


