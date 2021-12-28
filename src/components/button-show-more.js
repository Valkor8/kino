import AbstractComponent from "./abstract-component.js";

const createButtonShowMore = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonShowMore extends AbstractComponent {

  getTemplate() {
    return createButtonShowMore(this.rating);
  }
}
