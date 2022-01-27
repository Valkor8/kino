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
    this.alternativeTitle = data[`film_info`].alternative_title;
    this.writers = data[`film_info`].writers;

    this.comments = data.comments;

    this.filter = {
      watchlist: data[`user_details`].watchlist,
      history: data[`user_details`].already_watched,
      watchingDate: data[`user_details`].watching_date,
      favorites: data[`user_details`].favorite
    };
  }

  static toRAW(data) {
    return {
      id: data.id,

      film_info: {
        description: data.description,
        poster: data.poster,
        title: data.film,
        total_rating: data.rating,
        release: {
          date: data.filmYear,
          release_country: data.country
        },
        runtime: data.filmDuration,
        genre: data.filmGenre,
        director: data.director,
        actors: data.actors,
        age_rating: data.ageRating,
        alternative_title: data.alternativeTitle,
        writers: data.writers
      },

      comments: data.comments.map((comment) => this.toString(comment.id)),

      user_details: {
        already_watched: data.filter.history,
        favorite: data.filter.favorites,
        watching_date: data.filter.watchingDate,
        watchlist: data.filter.watchlist
      }
    };
  }

  static parseFilm(data) {
    return new Movie(data);
  }

  static parseFilms(data) {
    return data.map(Movie.parseFilm);
  }
}
