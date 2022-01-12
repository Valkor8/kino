import moment from "moment";
import AbstractSmartComponent from "./abstract-smart-component";
// import {Chart} from "chart.js";
// import {Chart, registerables} from 'chart.js';
// Chart.register(...registerables);
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
          <p class="statistic__item-text">Sci-Fi</p>
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
          data: [11, 8, 7, 4, 3],
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
