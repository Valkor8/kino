export const setEventPopupHandlers = (container, filmInstance, popupInstance) => {
  // const containerNode = document.querySelector(container);

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
