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

export const randomProfileRating = getRandomProfileRating(profileRating);
