import AbstractComponent from "./abstract-component.js";

const createMessageNoFilms = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`
  );
};

export default class MessageNoFilm extends AbstractComponent {

  getTemplate() {
    return createMessageNoFilms();
  }
}
