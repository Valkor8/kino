import moment, { months } from "moment";
import AbstractSmartComponent from "./abstract-smart-component";
import {Chart} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";


const getWatchedFilm = (films) => {
  let count = 0;
  films.forEach((film) => {
    if (film.filter.history) {
      count++;
    }
  });
  return count;
};

const getWatchedFilmDurationInMunites = (films) => {
  return films.reduce((acc, film) => {
    if (film.filter.history) {
      return acc + film.filmDuration;
    } else {
      return acc;
    }
  }, 0);
};

const getWatchedFilmDurationInHours = (films) => {
  const filmMinutes = getWatchedFilmDurationInMunites(films);
  const days = moment.duration(filmMinutes * 1000 * 60).days();
  const hours = moment.duration(filmMinutes * 1000 * 60).hours();

  return days * 24 + hours;
};

const getFilterHistoryWeekFilms = (films) => {
  const filterHistoryFilms = [];
  films.forEach((item) => {
    const date = (new Date() - moment(item.filter.watchingDate)) / 1000 / 60 / 60
    if (date < (7 * 24)) {
      filterHistoryFilms.push(item);
    }
  });
  return filterHistoryFilms;
};

const getHistoryGenre = (films) => {
  let historyFilms = [];
  films.forEach((film) => {
    if (film.filter.history) {
      historyFilms = historyFilms.concat(film.filmGenre);
    }
  });
  return historyFilms;
};

const getTopGenre = (films) => {
  const historyFilms = getHistoryGenre(films);
  const genres = [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`];

  const sciFi = historyFilms.filter((item) => item === `Sci-Fi`);
  const animation = historyFilms.filter((item) => item === `Animation`);
  const fantasy = historyFilms.filter((item) => item === `Fantasy`);
  const comedy = historyFilms.filter((item) => item === `Comedy`);
  const TVSeries = historyFilms.filter((item) => item === `TV Series`);

  const genresLength = [sciFi.length, animation.length, fantasy.length, comedy.length, TVSeries.length];

  let arrIndex = 0;

  genresLength.forEach((item, index) => {
    let max = 0;
    if (max < item) {
      max = item;
      arrIndex = index;
    }
  });
  return genres[arrIndex];
};

const createStats = (films) => {
  return (
    `<section id="statistic" class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${getWatchedFilm(films)} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${getWatchedFilmDurationInHours(films)} <span class="statistic__item-description">h</span> ${moment.duration(getWatchedFilmDurationInMunites(films) * 1000 * 60).minutes()} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${getTopGenre(films)}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class StatsComponent extends AbstractSmartComponent {
  constructor(model) {
    super();

    this._model = model;
    this._mainElement = ``;
  }

  getTemplate() {
    return createStats(this._model.getFilmsAll());
  }

  rerender() {
    super.rerender();
  }

  recoveryListeners() {

  }

  chart() {
    const films = getFilterHistoryWeekFilms(this._model.getFilmsAll());
    console.log(films)
    let historyFilms = getHistoryGenre(films);
    if (historyFilms.length === 0) {
      return;
    }
    const sciFi = historyFilms.filter((item) => item === `Sci-Fi`);
    const animation = historyFilms.filter((item) => item === `Animation`);
    const fantasy = historyFilms.filter((item) => item === `Fantasy`);
    const comedy = historyFilms.filter((item) => item === `Comedy`);
    const TVSeries = historyFilms.filter((item) => item === `TV Series`);

    const BAR_HEIGHT = 50;
    const statisticCtx = document.querySelector(`.statistic__chart`);
    // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
    statisticCtx.height = BAR_HEIGHT * 5;
    const myChart = new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
        datasets: [{
          data: [sciFi.length, animation.length, fantasy.length, comedy.length, TVSeries.length],
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }
}


// const BAR_HEIGHT = 50;
// const statisticCtx =
// document.querySelector(`.statistic__chart`);
// // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
// statisticCtx.height = BAR_HEIGHT * 5;
// const myChart = new Chart(statisticCtx, {
//   plugins: [ChartDataLabels],
//   type: `horizontalBar`,
//   data: {
//     labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
//     datasets: [{
//       data: [11, 8, 7, 4, 3],
//       backgroundColor: `#ffe800`,
//       hoverBackgroundColor: `#ffe800`,
//       anchor: `start`
//     }]
//   },
//   options: {
//     plugins: {
//       datalabels: {
//         font: {
//           size: 20
//         },
//         color: `#ffffff`,
//         anchor: `start`,
//         align: `start`,
//         offset: 40,
//       }
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           fontColor: `#ffffff`,
//           padding: 100,
//           fontSize: 20
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false
//         },
//         barThickness: 24
//       }],
//       xAxes: [{
//         ticks: {
//           display: false,
//           beginAtZero: true
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false
//         },
//       }],
//     },
//     legend: {
//       display: false
//     },
//     tooltips: {
//       enabled: false
//     }
//   }
// });
