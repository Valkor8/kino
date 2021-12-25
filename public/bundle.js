/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createButtonShowMore": () => (/* binding */ createButtonShowMore),
/* harmony export */   "createSectionFilms": () => (/* binding */ createSectionFilms),
/* harmony export */   "createFilmCard": () => (/* binding */ createFilmCard),
/* harmony export */   "buttonAddToWatchlistHandlerFn": () => (/* binding */ buttonAddToWatchlistHandlerFn),
/* harmony export */   "removeButtonAddToWatchlistHandlerFn": () => (/* binding */ removeButtonAddToWatchlistHandlerFn)
/* harmony export */ });
const createSectionFilms = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container"></div>
      </section>
    </section>`
  );
};

const createButtonShowMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createFilmCard = (film) => {
  return (
    `<article class="film-card">
        <h3 class="film-card__title film-card__click" data-id="${film.id}">${film.film}</h3>
        <p class="film-card__rating">${film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${film.filmYear.year}</span>
          <span class="film-card__duration">${film.filmDuration}</span>
          <span class="film-card__genre">${film.filmGenre.join(`, `)}</span>
        </p>
        <img src="${film.poster}" alt="" class="film-card__poster film-card__click" data-id="${film.id}">
        <p class="film-card__description">${film.description}</p>
        <a class="film-card__comments film-card__click" data-id="${film.id}">${film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" data-id="${film.id}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" data-id="${film.id}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" data-id="${film.id}">Mark as favorite</button>
        </form>
    </article>`
  );
};

// const buttonMarkAsWathed = document.querySelector(`.film-card__controls-item--mark-as-watched`);
// const buttonAddToFavorites = document.querySelector(`.film-card__controls-item--favorite`);

const buttonAddToWatchlistHandler = (evt) => {
  evt.preventDefault();
  // alert(evt.target.dataset.id);
};

const buttonAddToWatchlistHandlerFn = () => {
  const buttonAddToWatchlist = Array.from(document.querySelectorAll(`.film-card__controls-item--add-to-watchlist`));
  buttonAddToWatchlist.forEach((item) => {
    item.addEventListener(`click`, buttonAddToWatchlistHandler);
  });
};

const removeButtonAddToWatchlistHandlerFn = () => {
  const buttonAddToWatchlist = Array.from(document.querySelectorAll(`.film-card__controls-item--add-to-watchlist`));
  buttonAddToWatchlist.forEach((item) => {
    item.removeEventListener(`click`, buttonAddToWatchlistHandler);
  });
};




/***/ }),

/***/ "./src/components/film-details-popup.js":
/*!**********************************************!*\
  !*** ./src/components/film-details-popup.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFilmDetailsPopup": () => (/* binding */ createFilmDetailsPopup),
/* harmony export */   "showPopup": () => (/* binding */ showPopup)
/* harmony export */ });
/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ "./src/main.js");


const createFilmDetailsPopup = (film) => {
  const comments = film.comments;
  popupCloseHandler();
  return (
    `<section class="film-details" id="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${film.poster}" alt="">

              <p class="film-details__age">${film.ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${film.film}</h3>
                  <p class="film-details__title-original">Original: ${film.film}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${film.rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${film.filmYear.date} ${film.filmYear.year}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${film.filmDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${film.filmGenre.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${film.filmGenre.join(`  `)}</span>
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${film.description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${renderComments(comments).join(`\n`)}
          </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

const renderComments = (comments) => {
  const arrComments = [];
  comments.forEach((comment) => {
    arrComments.push(`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${comment.img}" width="55" height="55" alt="emoji-${comment.commentsEmotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
  });
  return arrComments;
};

const showPopup = (evt) => {
  if (evt.target.classList.contains(`film-card__click`)) {
    _main_js__WEBPACK_IMPORTED_MODULE_0__.randomFilms.forEach((item) => {
      if (+evt.target.dataset.id === item.id) {
        if (document.querySelector(`#film-details`)) {
          const filmDetails = document.querySelector(`#film-details`);
          filmDetails.remove();
        }
        (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.renderHTMLElemens)(`.footer`, createFilmDetailsPopup(item), `afterend`);
      }
    });
  }
};

const popupRemove = (evt) => {
  const filmDetails = document.querySelector(`#film-details`);
  if (evt.target.classList.contains(`film-details__close-btn`)) {
    filmDetails.remove();
  }
};

const popupCloseHandler = () => document.addEventListener(`click`, popupRemove);



// ${film.comments.forEach((item) => renderComments(item))}


/***/ }),

/***/ "./src/components/footer-statistic.js":
/*!********************************************!*\
  !*** ./src/components/footer-statistic.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFooterStatistic": () => (/* binding */ createFooterStatistic)
/* harmony export */ });
/* harmony import */ var _mock_random_generator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock/random-generator.js */ "./src/mock/random-generator.js");


const totalFilms = (0,_mock_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(1000, 100000);

const createFooterStatistic = () => {
  return (
    `<p>${totalFilms} movies inside</p>`
  );
};




/***/ }),

/***/ "./src/components/most-commented.js":
/*!******************************************!*\
  !*** ./src/components/most-commented.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMostCommentedContainer": () => (/* binding */ createMostCommentedContainer),
/* harmony export */   "createMostCommented": () => (/* binding */ createMostCommented)
/* harmony export */ });
const createMostCommentedContainer = () => {
  return (
    `<section class="films-list--extra" id="most-commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

const createMostCommented = (film) => {
  return (
    `<article class="film-card">
        <h3 class="film-card__title film-card__click" data-id="${film.id}">${film.film}</h3>
        <p class="film-card__rating">${film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${film.filmYear.year}</span>
          <span class="film-card__duration">${film.filmDuration}</span>
          <span class="film-card__genre">${film.filmGenre.join(`, `)}</span>
        </p>
        <img src="${film.poster}" alt="" class="film-card__poster film-card__click" data-id="${film.id}">
        <p class="film-card__description">${film.description}</p>
        <a class="film-card__comments film-card__click" data-id="${film.id}">${film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" data-id="${film.id}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" data-id="${film.id}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" data-id="${film.id}">Mark as favorite</button>
        </form>
    </article>`
  );
};




/***/ }),

/***/ "./src/components/profile-rating.js":
/*!******************************************!*\
  !*** ./src/components/profile-rating.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProfileRating": () => (/* binding */ createProfileRating)
/* harmony export */ });
/* harmony import */ var _mock_random_generator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock/random-generator.js */ "./src/mock/random-generator.js");


const profileRating = (0,_mock_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0, 100);

const getRandomProfileRating = (rating) => {
  if (rating >= 1 && rating <= 10) {
    return `Novice`;
  } else if (rating >= 11 && rating <= 20) {
    return `Fan`;
  } else if (rating >= 21) {
    return `Movie Buff`;
  } else {
    return ``;
  }
};

const createProfileRating = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRandomProfileRating(profileRating)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};




/***/ }),

/***/ "./src/components/site-menu-and-stats.js":
/*!***********************************************!*\
  !*** ./src/components/site-menu-and-stats.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SiteMenu": () => (/* binding */ SiteMenu)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./src/util.js");


const createSiteMenuAndStats = (obj) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${obj.watchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${obj.history}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${obj.favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class SiteMenu {
  constructor(obj) {
    this._obj = obj;

    this._element = null;
  }

  getTemplate() {
    return createSiteMenuAndStats(this._obj);
  }

  getElement() {
    if (!this._element) {
      this._element = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSort": () => (/* binding */ createSort)
/* harmony export */ });
const createSort = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};


/***/ }),

/***/ "./src/components/top-rated.js":
/*!*************************************!*\
  !*** ./src/components/top-rated.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTopRatedContainer": () => (/* binding */ createTopRatedContainer),
/* harmony export */   "createTopRated": () => (/* binding */ createTopRated)
/* harmony export */ });
const createTopRatedContainer = () => {
  return (
    `<section class="films-list--extra" id="top-rated">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

const createTopRated = (film) => {
  return (
    `<article class="film-card">
        <h3 class="film-card__title film-card__click" data-id="${film.id}">${film.film}</h3>
        <p class="film-card__rating">${film.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${film.filmYear.year}</span>
          <span class="film-card__duration">${film.filmDuration}</span>
          <span class="film-card__genre">${film.filmGenre.join(`, `)}</span>
        </p>
        <img src="${film.poster}" alt="" class="film-card__poster film-card__click" data-id="${film.id}">
        <p class="film-card__description">${film.description}</p>
        <a class="film-card__comments film-card__click" data-id="${film.id}">${film.comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" data-id="${film.id}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" data-id="${film.id}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite" data-id="${film.id}">Mark as favorite</button>
        </form>
    </article>`
  );
};




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomFilms": () => (/* binding */ randomFilms),
/* harmony export */   "renderHTMLElemens": () => (/* binding */ renderHTMLElemens)
/* harmony export */ });
/* harmony import */ var _components_profile_rating_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/profile-rating.js */ "./src/components/profile-rating.js");
/* harmony import */ var _components_site_menu_and_stats_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/site-menu-and-stats.js */ "./src/components/site-menu-and-stats.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _components_film_card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/film-card.js */ "./src/components/film-card.js");
/* harmony import */ var _components_top_rated_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/top-rated.js */ "./src/components/top-rated.js");
/* harmony import */ var _components_most_commented_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/most-commented.js */ "./src/components/most-commented.js");
/* harmony import */ var _components_footer_statistic_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/footer-statistic.js */ "./src/components/footer-statistic.js");
/* harmony import */ var _components_film_details_popup_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/film-details-popup.js */ "./src/components/film-details-popup.js");
/* harmony import */ var _mock_random_films_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/random-films.js */ "./src/mock/random-films.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/* harmony import */ var _mock_filter_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mock/filter.js */ "./src/mock/filter.js");




















const FILM_CARDS_START = 0;
const FILM_CARDS_AMOUNT = 5;
const FILM_CARD_SHOW_BY_BUTTON = 5;

const randomFilms = (0,_mock_random_films_js__WEBPACK_IMPORTED_MODULE_8__.getRandomFilmsArray)();
// console.log(randomFilms);

const renderHTMLElemens = (container, html, position = `beforeend`) => {
  const place = document.querySelector(container);
  place.insertAdjacentHTML(position, html);
};


renderHTMLElemens(`.header`, (0,_components_profile_rating_js__WEBPACK_IMPORTED_MODULE_0__.createProfileRating)());
// renderHTMLElemens(`.main`, createSiteMenuAndStats(filter));
(0,_util_js__WEBPACK_IMPORTED_MODULE_9__.render)(`.main`, new _components_site_menu_and_stats_js__WEBPACK_IMPORTED_MODULE_1__.SiteMenu(_mock_filter_js__WEBPACK_IMPORTED_MODULE_10__.filter).getElement());
renderHTMLElemens(`.main`, (0,_components_sort_js__WEBPACK_IMPORTED_MODULE_2__.createSort)());
renderHTMLElemens(`.main`, (0,_components_film_card_js__WEBPACK_IMPORTED_MODULE_3__.createSectionFilms)());
randomFilms.slice(FILM_CARDS_START, FILM_CARDS_AMOUNT).forEach((item) => {
  renderHTMLElemens(`.films-list__container`, (0,_components_film_card_js__WEBPACK_IMPORTED_MODULE_3__.createFilmCard)(item));
});
renderHTMLElemens(`.films-list`, (0,_components_film_card_js__WEBPACK_IMPORTED_MODULE_3__.createButtonShowMore)());
renderHTMLElemens(`.films`, (0,_components_top_rated_js__WEBPACK_IMPORTED_MODULE_4__.createTopRatedContainer)());
randomFilms
  .slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 2)
  .forEach((item) => renderHTMLElemens(`#top-rated .films-list__container`, (0,_components_top_rated_js__WEBPACK_IMPORTED_MODULE_4__.createTopRated)(item)));

renderHTMLElemens(`.films`, (0,_components_most_commented_js__WEBPACK_IMPORTED_MODULE_5__.createMostCommentedContainer)());

randomFilms
  .slice()
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(0, 2)
  .forEach((item) => renderHTMLElemens(`#most-commented .films-list__container`, (0,_components_most_commented_js__WEBPACK_IMPORTED_MODULE_5__.createMostCommented)(item)));

renderHTMLElemens(`.footer__statistics`, (0,_components_footer_statistic_js__WEBPACK_IMPORTED_MODULE_6__.createFooterStatistic)());

document.addEventListener(`click`, _components_film_details_popup_js__WEBPACK_IMPORTED_MODULE_7__.showPopup);

(0,_components_film_card_js__WEBPACK_IMPORTED_MODULE_3__.buttonAddToWatchlistHandlerFn)();

let filmAmount = FILM_CARDS_AMOUNT;

const buttonShowMore = document.querySelector(`.films-list__show-more`);
buttonShowMore.addEventListener(`click`, () => {
  (0,_components_film_card_js__WEBPACK_IMPORTED_MODULE_3__.removeButtonAddToWatchlistHandlerFn)();
  let prevFilmCount = filmAmount;
  filmAmount += FILM_CARD_SHOW_BY_BUTTON;
  randomFilms.slice(prevFilmCount, filmAmount).forEach((item) => {
    renderHTMLElemens(`.films-list__container`, (0,_components_film_card_js__WEBPACK_IMPORTED_MODULE_3__.createFilmCard)(item));
    if (filmAmount >= randomFilms.length) {
      buttonShowMore.remove();
    }
  });
  (0,_components_film_card_js__WEBPACK_IMPORTED_MODULE_3__.buttonAddToWatchlistHandlerFn)();
});




/***/ }),

/***/ "./src/mock/comments.js":
/*!******************************!*\
  !*** ./src/mock/comments.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomComment": () => (/* binding */ getRandomComment)
/* harmony export */ });
/* harmony import */ var _random_generator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./random-generator.js */ "./src/mock/random-generator.js");


const commentsText = [
  `Good film-1`,
  `Good film-2`,
  `Good film-3`,
  `Good film-4`,
  `Good film-5`
];

const commentsEmotion = [
  `smile`, `sleeping`, `puke`, `angry`
];

const emotionImg = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
];

const commentsAuthor = [
  `Ahilles`,
  `Gector`,
  `Ajax`,
  `Agamemnon`,
  `Odissey`,
];

const commentsDate = [
  `2021/12/22 23:28`,
  `2021/11/30 23:28`,
  `2021/12/18 08:36`,
  `2021/09/01 11:36`,
  `2021/01/01 00:00`,
];

const MAX_COMMENTS = 5;

const getRandomComment = () => {
  const comments = [];
  for (let i = 0; i < (0,_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIndexArray)(0, MAX_COMMENTS); i++) {
    const comment = {
      text: commentsText[(0,_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIndexArray)(0, commentsText.length)],
      emotion: commentsEmotion[(0,_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIndexArray)(0, commentsEmotion.length)],
      author: commentsAuthor[(0,_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIndexArray)(0, commentsAuthor.length)],
      date: commentsDate[(0,_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIndexArray)(0, commentsDate.length)],
      img: emotionImg[(0,_random_generator_js__WEBPACK_IMPORTED_MODULE_0__.getRandomIndexArray)(0, emotionImg.length)]
    };
    comments.push(comment);
  }
  return comments;
};




/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "filter": () => (/* binding */ filter)
/* harmony export */ });
const filter = {
  watchlist: 8,
  history: 5,
  favorites: 6
};


/***/ }),

/***/ "./src/mock/random-films.js":
/*!**********************************!*\
  !*** ./src/mock/random-films.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomFilmsArray": () => (/* binding */ getRandomFilmsArray)
/* harmony export */ });
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comments.js */ "./src/mock/comments.js");
/* harmony import */ var _random_generator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./random-generator.js */ "./src/mock/random-generator.js");



const films = [
  `Made for Each Other`,
  `Popeye the Sailor meets Sindbad`,
  `Sagevrush  trail`,
  `Santa claus conquers the Martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man whith the golden arm`
];

const posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const descriptions = [
  `Made for Each Other. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Popeye the Sailor meets Sindbad. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Sagevrush  trail. Aliquam id orci ut lectus varius viverra`,
  `Santa claus conquers the Martians. Nullam nunc ex, convallis sedfinibus eget, sollicitudin eget ante`,
  `The dance of life. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `The great flamarion. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `The man whith the golden arm. Sed sed nisi sed augue convallis suscipit in sed felis `
];

const ratings = [
  6.6,
  9.8,
  7.0,
  8.1,
  4.2,
  5.7,
  6.1
];

const filmYears = [
  {date: `01 April`, year: 2010},
  {date: `05 March`, year: 2019},
  {date: `11 January`, year: 1938},
  {date: `20 Febriary`, year: 1967},
  {date: `04 April`, year: 1991},
  {date: `30 June`, year: 2016},
  {date: `19 July`, year: 2000},
];

const filmDurations = [
  `1h 36m`,
  `2h 16m`,
  `1h 59m`,
  `1h 45m`,
  `3h 19m`,
  `2h 15m`,
  `1h 49m`
];

const filmGenres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

const directors = [
  `QUENTIN TARANTINO`,
  `GUILLERMO DEL TORO`,
  `PETER JACKSON`,
  `TAIKA WAITITI`,
  `ALFONSO CUARÒN`,
  `STEPHEN SPIELBERG`,
  `JAMES CAMERON`
];

const actors = [
  `Johnny Depp, Al Pacino`,
  `Robert De Niro, Kevin Spacey`,
  `Denzel Washington, Russell Crowe`,
  `Brad Pitt, Angelina Jolie`,
  `Leonardo DiCaprio, Tom Cruise`,
  `John Travolta, Arnold Schwarzenegger`,
  `Sylvester Stallone, Kate Winslet`,
];

const countries = [
  `USA`,
  `Russia`,
  `England`,
  `Spain`,
  `France`,
  `Italy`,
  `China`,
];

const ageRatings = [
  `18+`,
  `16+`,
  `12+`,
  `18+`,
  `6+`,
  `10+`,
  `0+`
];

const getRandomArrayElement = (arr) => arr[(0,_random_generator_js__WEBPACK_IMPORTED_MODULE_1__.getRandomIndexArray)(0, arr.length)];

const getRandomArrayLength = (arr) => arr.slice((0,_random_generator_js__WEBPACK_IMPORTED_MODULE_1__.getRandomIndexArray)(0, arr.length));

const renderRandomFilm = () => {
  const randomIndex = (0,_random_generator_js__WEBPACK_IMPORTED_MODULE_1__.getRandomIndexArray)(0, films.length);
  return {
    film: films[randomIndex],
    poster: posters[randomIndex],
    description: descriptions[randomIndex],
    rating: getRandomArrayElement(ratings),
    filmYear: getRandomArrayElement(filmYears),
    filmDuration: getRandomArrayElement(filmDurations),
    filmGenre: getRandomArrayLength(filmGenres),
    comments: (0,_comments_js__WEBPACK_IMPORTED_MODULE_0__.getRandomComment)(),
    director: directors[randomIndex],
    actors: actors[randomIndex],
    country: countries[randomIndex],
    ageRating: ageRatings[randomIndex],
  };
};

const RANDOM_FILM = 20;

const getRandomFilmsArray = () => {
  const randomFilms = [];
  for (let i = 0; i < RANDOM_FILM; i++) {
    randomFilms.push(renderRandomFilm());
    randomFilms[i].id = i;
  }
  return randomFilms;
};




/***/ }),

/***/ "./src/mock/random-generator.js":
/*!**************************************!*\
  !*** ./src/mock/random-generator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomIndexArray": () => (/* binding */ getRandomIndexArray),
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt)
/* harmony export */ });
const getRandomIndexArray = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};


const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, position = `beforeend`) => {
  const place = document.querySelector(container);
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      place.append(element);
      break;
  }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map