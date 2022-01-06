import AbstractSmartComponent from "./abstract-smart-component.js";
import {getDuration, getDateForMoment, getHumanizeDate, getHumanizeDate2} from "../utils/moment.js";
import moment from "moment";


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
          <span class="film-details__comment-day">${getDateForMoment(comment.date, `YYYY/MM/DD HH:mm`)}     ${getHumanizeDate2(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`);
  });
  return arrComments;
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
                  <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${film.actors}</td>
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
            ${renderComments(comments).join(`\n`)}
          </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${createEmoji()}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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

export const localEmotions = {
  smile: false,
  sleeping: false,
  puke: false,
  angry: false,
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(film) {
    super();
    this.film = film;

    this._setClickHadler = null;
    this._cbWatchlist = null;
    this._cbWatched = null;
    this._cbFavorites = null;

    this.localEmotions = localEmotions;
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
      console.log(`localEmotions:`, localEmotions);
      console.log(`this.localEmotions:`, this.localEmotions);
    });
  }
}
