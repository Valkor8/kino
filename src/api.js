import Movie from "./models/movie.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://16.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((responce) => {
        if (responce.ok) {
          return responce.json();
        } else if (responce.status === 404) {
          return [];
        }
        throw new Error(`Неизвестный статус ${responce.status} ${responce.statusText}`);
      })
      .then(Movie.parseFilms)
      .then((films) => this._getComments(films, headers))
      .then((promises) => Promise.all(promises))
      .catch(() => []);
  }

  updateFilms(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    return fetch(`https://16.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(Movie.toRAW(data)),
      headers
    })
    .then((responce) => {
      if (responce.status >= 200 || responce.status < 300) {
        const resp = responce.json();
        return resp;
      } else {
        throw new Error(`A server error has occurred`);
      }
    })
    .then((film) => {
      const filmsArray = [];
      filmsArray.push(film);
      return this._getComments(filmsArray, headers);
    })
    .then((promises) => Promise.all(promises))
    .then((filmData) => {
      const filmDataWithComments = filmData.pop();
      return Movie.parseFilm(filmDataWithComments);
    })
    .catch(new Error(`A server error has occurred`));
  }

  _getComments(films, headers) {
    const newFilms = films.map((item) => {
      return fetch(`https://16.ecmascript.pages.academy/cinemaddict/comments/${item.id}`, {headers})
        .then((responce) => {
          if (responce.ok) {
            const resp = responce.json();
            return resp;
          } else {
            return [];
          }
        })
        .then((comment) => {
          item.comments = comment;
          return item;
        })
        .catch(() => []);
    });
    return newFilms;
  }
};

export default API;
