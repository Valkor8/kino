import {remove} from "../utils/render.js";
import AbstractComponent from "./abstract-component.js";

const createMessageLoading = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`
  );
};

export default class MessageLoading extends AbstractComponent {

  getTemplate() {
    return createMessageLoading();
  }

  deleteMessage() {
    remove(this);
  }
}
