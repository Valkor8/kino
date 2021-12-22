import {getRandomComment} from "./comments.js";
import {getRandomIndexArray} from "./random-generator.js";

const films = [
  `Made for Each Other`,
  `Popeye the Sailor meets Sindbad`,
  `Sagevrush  trail`,
  `Santa claus conquers the Martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man whith the golden arm`
];

const posters = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.png`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`,
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Aliquam id orci ut lectus varius viverra`,
  `Nullam nunc ex, convallis sedfinibus eget, sollicitudin eget ante`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
];

const raitings = [
  6.6,
  9.8,
  7.0,
  8.1,
  4.2
];

const filmYears = [
  2010,
  2019,
  1938,
  1967,
  1991
];

const filmDurations = [
  `1h 36m`,
  `2h 16m`,
  `1h 59m`,
  `1h 45m`,
  `3h 19m`,
];

const filmGenres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

const getRandomArrayElement = (arr) => arr[getRandomIndexArray(0, arr.length)];

const getRandomArrayLength = (arr) => arr.slice(getRandomIndexArray(0, arr.length));

const renderRandomFilm = () => {
  return {
    film: getRandomArrayElement(films),
    poster: getRandomArrayElement(posters),
    description: getRandomArrayElement(descriptions),
    raiting: getRandomArrayElement(raitings),
    filmYear: getRandomArrayElement(filmYears),
    filmDuration: getRandomArrayElement(filmDurations),
    filmGenre: getRandomArrayLength(filmGenres),
    comments: getRandomComment()
  };
};

export {renderRandomFilm};
