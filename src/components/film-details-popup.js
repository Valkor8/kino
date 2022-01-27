import AbstractSmartComponent from "./abstract-smart-component.js";
import {getDuration, getDateForMoment, getHumanizeDate2} from "../utils/moment.js";

const getEmotionImg = (emotion) => {
  if (emotion === `smile`) {
    return `./images/emoji/smile.png`;
  } else if (emotion === `sleeping`) {
    return `./images/emoji/sleeping.png`;
  } else if (emotion === `puke`) {
    return `./images/emoji/puke.png`;
  } else if (emotion === `angry`) {
    return `./images/emoji/angry.png`;
  } else {
    return ``;
  }
};

const renderComments = (comments) => {
  console.log(comments)
  if (comments.length === 0) {
    return `<li><h2>An error occurred while uploading comments</h2></li>`;
  }
  const arrComments = [];
  comments.forEach((comment) => {
    arrComments.push(`<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${getEmotionImg(comment.emotion)}" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getDateForMoment(comment.date, `YYYY/MM/DD HH:mm`)}     ${getHumanizeDate2(comment.date)}</span>
          <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
        </p>
      </div>
    </li>`);
  });
  return arrComments.join(`\n`);
};

const createFilmDetailsPopup = (film, options = {}) => {
  const {smile, sleeping, puke, angry} = options;
  const comments = film.comments;
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
                  <td class="film-details__cell">${film.writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${getDateForMoment(film.filmYear, `DD MMMM YYYY`)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getDuration(film)}</td>
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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${film.filter.watchlist ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${film.filter.history ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${film.filter.favorites ? `checked` : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          <ul class="film-details__comments-list">
            ${renderComments(comments)}
          </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${createEmoji()}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" required minlength="1" maxlength="500"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${smile ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${sleeping ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${puke ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${angry ? `checked` : ``}>
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

export let localEmotions = {
  smile: false,
  sleeping: false,
  puke: false,
  angry: false,
};

const createEmoji = () => {
  if (localEmotions.smile === true) {
    return `<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">`;
  } else if (localEmotions.sleeping === true) {
    return `<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">`;
  } else if (localEmotions.puke === true) {
    return `<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">`;
  } else if (localEmotions.angry === true) {
    return `<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">`;
  } else {
    return ``;
  }
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film, authorization) {
    super();
    this.film = film;

    this._setClickHadler = null;
    this._cbWatchlist = null;
    this._cbWatched = null;
    this._cbFavorites = null;

    this.localEmotions = localEmotions;

    this._film = ``;
    this._onDataChange = ``;

    this._authorization = authorization;
  }

  getTemplate() {
    return createFilmDetailsPopup(this.film, this.localEmotions);
  }

  recoveryListeners() {
    this.setClickHandler(this._setClickHadler);
    this.buttonAddToWatchlistHandler(this._cbWatchlist);
    this.buttonMarkAsWatchedHandler(this._cbWatched);
    this.buttonAddToFavoriteHandler(this._cbFavorites);
    this.emojiListHandler();
    this.removeCommentHandler(this._film, this._onDataChange);
  }

  rerender() {
    super.rerender();
  }

  setClickHandler(cb) {
    this._setClickHadler = cb;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._setClickHadler);
  }

  buttonAddToWatchlistHandler(cb) {
    this._cbWatchlist = cb;
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._cbWatchlist);
  }

  buttonMarkAsWatchedHandler(cb) {
    this._cbWatched = cb;
    this.getElement().querySelector(`#watched`).addEventListener(`change`, this._cbWatched);
  }

  buttonAddToFavoriteHandler(cb) {
    this._cbFavorites = cb;
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, this._cbFavorites);
  }

  removeCommentHandler(film, onDataChange) {
    this._film = film;
    this._onDataChange = onDataChange;

    Array.from(this.getElement().querySelectorAll(`.film-details__comment-delete`)).forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        const arr = this._film.comments;
        evt.preventDefault();
        arr.forEach((comment) => {
          if (comment.id === +evt.target.dataset.id) {
            onDataChange(film, null, comment);
          }
        });
      });
    });
  }

  emojiListHandler() {
    const emojiList = this.getElement().querySelector(`.film-details__emoji-list`);
    emojiList.addEventListener(`change`, (evt) => {
      if (evt.target.id === `emoji-smile`) {
        this.localEmotions.smile = true;
        this.localEmotions.sleeping = this.localEmotions.angry = this.localEmotions.puke = false;
      } if (evt.target.id === `emoji-sleeping`) {
        this.localEmotions.sleeping = true;
        this.localEmotions.smile = this.localEmotions.puke = this.localEmotions.angry = false;
      } if (evt.target.id === `emoji-puke`) {
        this.localEmotions.puke = true;
        this.localEmotions.smile = this.localEmotions.sleeping = this.localEmotions.angry = false;
      } if (evt.target.id === `emoji-angry`) {
        this.localEmotions.angry = true;
        this.localEmotions.smile = this.localEmotions.sleeping = this.localEmotions.puke = false;
      }
      this.rerender();
    });
  }

  resetCommnets() {
    this.localEmotions.smile = this.localEmotions.sleeping = this.localEmotions.puke = this.localEmotions.angry = false;
  }

}
