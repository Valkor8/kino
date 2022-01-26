import Movie from "./models/movie.js";

const API = class {
  constructor(authorization) {
    this._authorization = authorization;

    this._headers = ``;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);

    return fetch(`https://16.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((responce) => {
        if (responce.ok) {
          const filmsArr = responce.json();
          console.log(filmsArr)
          return filmsArr;
        } else if (responce.status === 404) {
          return [];
        }
        throw new Error(`Неизвестный статус ${responce.status} ${responce.statusText}`);
      })
      .then(Movie.parseFilms)
      .then((films) => {
        films.map((item) => {
          return fetch(`https://16.ecmascript.pages.academy/cinemaddict/comments/${item.id}`, {headers})
            .then((responce) => {
              if (responce.ok) {
                return responce.json();
              } else {
                return [];
              }
            })
            .then((comment) => {
              item.comments = comment;
            })
            .catch(() => []);
        });
        return films;
      })
      .catch(() => []);
  }

  updateFilms(id, data) {
    const headers = new Headers();
    headers.append(`Authorization`, this._authorization);
    headers.append(`Content-Type`, `application/json`);

    console.log(data)
    console.log(Movie.toRAW(data))
    return fetch(`https://16.ecmascript.pages.academy/cinemaddict/movies/${id}`, {
      method: `PUT`,
      body: JSON.stringify(Movie.toRAW(data)),
      headers
    })
    .then((responce) => {
      // console.log(responce.json())
      return responce.json();
    })
    .then(Movie.parseFilm);
  }
};

export default API;
