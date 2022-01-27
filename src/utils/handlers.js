export const setEventPopupOpenAndCloseHandlers = (container, filmInstance, popupInstance) => {
  const onShowPopup = () => {
    const filmpopup = document.querySelector(`#film-details`);
    if (filmpopup) {
      filmpopup.remove();
    }
    container.appendChild(popupInstance.getElement());
    popupInstance.setClickHandler(onRemovePopupClick);
    document.addEventListener(`keydown`, onRemovePopupEsc);
  };

  const onRemovePopupEsc = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      container.removeChild(popupInstance.getElement());
      document.removeEventListener(`keydown`, onRemovePopupEsc);
    }
  };

  const onRemovePopupClick = () => {
    container.removeChild(popupInstance.getElement());
    popupInstance.removeElement();
    document.removeEventListener(`keydown`, onRemovePopupEsc);
  };

  filmInstance.setClickHadnler(onShowPopup);
};

export const setFilmCardsHandlers = (film, filmCard, onDataChange) => {
  filmCard.buttonAddToWatchlistHandler((evt) => {
    console.log(film)
    evt.preventDefault();
    onDataChange(film, Object.assign({}, film, {
      filter: {
        watchlist: film.filter.watchlist ? false : true,
        history: film.filter.history,
        watchingDate: film.filter.watchingDate,
        favorites: film.filter.favorites,
      }
    }));
  });

  filmCard.buttonMarkAsWatchedHandler((evt) => {
    evt.preventDefault();
    onDataChange(film, Object.assign({}, film, {
      filter: {
        watchlist: film.filter.watchlist,
        history: film.filter.history ? false : true,
        watchingDate: film.filter.watchingDate === null ? new Date().toISOString() : null,
        favorites: film.filter.favorites,
      }
    }));
  });

  filmCard.buttonAddToFavoriteHandler((evt) => {
    evt.preventDefault();
    onDataChange(film, Object.assign({}, film, {
      filter: {
        watchlist: film.filter.watchlist,
        history: film.filter.history,
        watchingDate: film.filter.watchingDate,
        favorites: film.filter.favorites ? false : true,
      }
    }));
  });
};


export const setFilmPopupHandlers = (film, filmPopup, onDataChange) => {
  filmPopup.buttonAddToWatchlistHandler((evt) => {
    if (evt.target.checked) {
      onDataChange(film, Object.assign({}, film, {
        filter: {
          watchlist: true,
          history: film.filter.history,
          watchingDate: film.filter.watchingDate,
          favorites: film.filter.favorites,
        }
      }));
    } else {
      onDataChange(film, Object.assign({}, film, {
        filter: {
          watchlist: false,
          history: film.filter.history,
          watchingDate: film.filter.watchingDate,
          favorites: film.filter.favorites,
        }
      }));
    }
  });

  filmPopup.buttonMarkAsWatchedHandler((evt) => {
    if (evt.target.checked) {
      onDataChange(film, Object.assign({}, film, {
        filter: {
          watchlist: film.filter.watchlist,
          history: true,
          watchingDate: new Date().toISOString(),
          favorites: film.filter.favorites,
        }
      }));
    } else {
      onDataChange(film, Object.assign({}, film, {
        filter: {
          watchlist: film.filter.watchlist,
          history: false,
          watchingDate: null,
          favorites: film.filter.favorites,
        }
      }));
    }
  });

  filmPopup.buttonAddToFavoriteHandler((evt) => {
    if (evt.target.checked) {
      onDataChange(film, Object.assign({}, film, {
        filter: {
          watchlist: film.filter.watchlist,
          history: film.filter.history,
          watchingDate: film.filter.watchingDate,
          favorites: true,
        }
      }));
    } else {
      onDataChange(film, Object.assign({}, film, {
        filter: {
          watchlist: film.filter.watchlist,
          history: film.filter.history,
          watchingDate: film.filter.watchingDate,
          favorites: false,
        }
      }));
    }
  });
};
