const createSectionFilms = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
        </div>

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
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
    </article>`
  );
};


export {createButtonShowMore, createSectionFilms, createFilmCard};