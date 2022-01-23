export default class Movie {
  constructor(data) {
    this.id = data.id;
    this.description = data[`film_info`].description;
    this.poster = data[`film_info`].poster;
    this.film = data[`film_info`].title;
    this.rating = data[`film_info`].total_rating;
    this.filmYear = data[`film_info`].release.date;
    this.country = data[`film_info`].release.release_country;
    this.filmDuration = data[`film_info`].runtime;
    this.filmGenre = data[`film_info`].genre;
    this.director = data[`film_info`].director;
    this.actors = data[`film_info`].actors;
    this.ageRating = data[`film_info`].age_rating;
    this.filter = data[`user_details`];
    this.alternativeTitle = data[`film_info`].alternative_title;
    this.comments = data.comments;
  }

  static parseFilm(data) {
    return new Movie(data);
  }

  static parseFilms(data) {
    return data.map(Movie.parseFilm);
  }
}
