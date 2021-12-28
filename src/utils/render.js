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
  const place = document.querySelector(container);
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      place.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      place.append(component.getElement());
      break;
  }
};

export const renderContainer = (container, component, position = `beforeend`) => {
  const place = document.querySelector(container);
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      place.prepend(component.getContainer());
      break;
    case RenderPosition.BEFOREEND:
      place.append(component.getContainer());
      break;
  }
};

