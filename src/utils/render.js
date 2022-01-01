import {SortType as SortTypeObj} from "../components/sort.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, position = `beforeend`) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const replace = (container, component, oldComponent, position = `beforeend`) => {
  container.parentElement.replaceChild(component, oldComponent);
};

export const renderContainer = (container, component, position = `beforeend`) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getContainer());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getContainer());
      break;
  }
};

export const renderSortFilms = (films, sortType) => {
  let sortedFilms = [];
  const filmCardsSort = films.slice();
  switch (sortType) {
    case SortTypeObj.DATE:
      sortedFilms = filmCardsSort.sort((a, b) => b.filmYear.year - a.filmYear.year);
      break;
    case SortTypeObj.RATING:
      sortedFilms = filmCardsSort.sort((a, b) => b.rating - a.rating);
      break;
    case SortTypeObj.DEFAULT:
      sortedFilms = filmCardsSort;
  }

  return sortedFilms;
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
