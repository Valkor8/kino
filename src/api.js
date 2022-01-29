import Movie from "./models/movie.js";

const checkStatus = (responce) => {
  if (responce.status >= 200 && responce.status < 300) {
    const resp = responce.json();
    console.log(resp)
    return resp;
  } else {
    // throw new Error(`${responce.status}: ${responce.statusText}`);
    return [];
  }
};

const API = class {
  constructor(authorization, END_POINT) {
    this._authorization = authorization;

    this._endPoint = END_POINT;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return this._load({url: `movies`})
      .then(Movie.parseFilms)
      .then((films) => this._getComments(films))
      .then((promises) => Promise.all(promises))
      .catch(() => []);
  }

  updateFilms(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: `PUT`,
      body: JSON.stringify(Movie.toRAW(data)),
      headers: new Headers({"Content-Type": `application/json`})
    })
    .then((film) => {
      const filmsArray = [];
      filmsArray.push(film);
      return this._getComments(filmsArray);
    })
    .then((promises) => Promise.all(promises))
    .then((filmData) => {
      const filmDataWithComments = filmData.pop();
      return Movie.parseFilm(filmDataWithComments);
    })
    .catch(new Error(`A server error has occurred`));
  }

  createComment(id, comment) {
    return this._load({
      url: `comments/${id}`,
      method: `POST`,
      body: JSON.stringify(comment),
      headers: new Headers({"Content-Type": `application/json`})
    });
  }

  _getComments(films) {
    const newFilms = films.map((item) => {
      return this._load({url: `comments/${item.id}`})
        .then((comment) => {
          item.comments = comment;
          return item;
        });
    });
    return newFilms;
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
