import API from "./api.js";
import PageController from "./controllers/page-controllers.js";
import {SiteMenuController} from "./controllers/site-menu-controller.js";
import Movies from "./models/movies.js";
import StatsComponent from "./components/stats-component.js";
import {render} from "./utils/render.js";
import MessageLoading from "./components/loading-message.js";


const AUTHORIZATION = `Basic joifoin45j`;
const END_POINT = `https://16.ecmascript.pages.academy/cinemaddict`;

const main = document.querySelector(`.main`);

const api = new API(AUTHORIZATION, END_POINT);
const movieModel = new Movies();

const siteMenuController = new SiteMenuController(main, movieModel);
const stats = new StatsComponent(movieModel);
const pageController = new PageController(main, movieModel, siteMenuController, api);

const messageLoading = new MessageLoading();
render(main, messageLoading);

stats.hide(stats.getElement());

const renderSiteMenu = () => {
  siteMenuController.render();
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
};

api.getFilms()
  .then((films) => {
    console.log(films);
    messageLoading.deleteMessage();
    movieModel.setFilms(films);
    renderSiteMenu();
    render(main, stats);
    pageController.render();
  });

pageController._renderOnButtonClick();
pageController._setSortTypeChangeHadnler();


