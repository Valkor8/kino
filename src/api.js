const API = class {
  constructor(authorization) {
    this._authorization = authorization;
  }

  getFilms() {
    const headers = new Headers();
    headers.append(`Authorization`, `Basic joifoin45jknfjkdf`);

    return fetch(`https://13.ecmascript.pages.academy/cinemaddict/movies`, {headers})
      .then((responce) => responce.json());
  }
};

export default API;
