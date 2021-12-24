import {getRandomInt} from "../mock/random-generator.js";

const profileRating = getRandomInt(0, 100);

const getRandomProfileRating = (rating) => {
  if (rating >= 1 && rating <= 10) {
    return `Novice`;
  } else if (rating >= 11 && rating <= 20) {
    return `Fan`;
  } else if (rating >= 21) {
    return `Movie Buff`;
  } else {
    return ``;
  }
};

const createProfileRating = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getRandomProfileRating(profileRating)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileRating};
