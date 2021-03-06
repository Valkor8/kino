import AbstractComponent from "./abstract-component.js";

const createProfileRating = (rating) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class ProfileRating extends AbstractComponent {
  constructor(rating) {
    super();
    this.rating = rating;
  }

  getTemplate() {
    return createProfileRating(this.rating);
  }
}
