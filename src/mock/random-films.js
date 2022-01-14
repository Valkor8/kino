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
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const descriptions = [
  `Made for Each Other. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Popeye the Sailor meets Sindbad. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Sagevrush  trail. Aliquam id orci ut lectus varius viverra`,
  `Santa claus conquers the Martians. Nullam nunc ex, convallis sedfinibus eget, sollicitudin eget ante`,
  `The dance of life. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `The great flamarion. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `The man whith the golden arm. Sed sed nisi sed augue convallis suscipit in sed felis `
];

const ratings = [
  6.6,
  9.8,
  7.0,
  8.1,
  4.2,
  5.7,
  6.1
];

const filmYears = [
  `2010-05-11T00:00:00.000Z`,
  `2019-05-11T00:00:00.000Z`,
  `1938-05-11T00:00:00.000Z`,
  `1967-05-11T00:00:00.000Z`,
  `1990-05-11T00:00:00.000Z`,
  `2016-05-11T00:00:00.000Z`,
  `2000-05-11T00:00:00.000Z`
];

const filmDurations = [
  96,
  136,
  119,
  105,
  199,
  135,
  109
];

const filmGenres = [
  `Sci-Fi`,
  `Animation`,
  `Fantasy`,
  `Comedy`,
  `TV Series`,
];

const directors = [
  `QUENTIN TARANTINO`,
  `GUILLERMO DEL TORO`,
  `PETER JACKSON`,
  `TAIKA WAITITI`,
  `ALFONSO CUARÒN`,
  `STEPHEN SPIELBERG`,
  `JAMES CAMERON`
];

const actors = [
  `Johnny Depp, Al Pacino`,
  `Robert De Niro, Kevin Spacey`,
  `Denzel Washington, Russell Crowe`,
  `Brad Pitt, Angelina Jolie`,
  `Leonardo DiCaprio, Tom Cruise`,
  `John Travolta, Arnold Schwarzenegger`,
  `Sylvester Stallone, Kate Winslet`,
];

const countries = [
  `USA`,
  `Russia`,
  `England`,
  `Spain`,
  `France`,
  `Italy`,
  `China`,
];

const ageRatings = [
  `18+`,
  `16+`,
  `12+`,
  `18+`,
  `6+`,
  `10+`,
  `0+`
];

const watchingDate = [
  `2021-12-30T17:36:32.554Z`,
  `2021-12-29T11:44:32.554Z`,
  `2022-01-04T01:01:32.554Z`,
  `2022-01-10T22:24:32.554Z`,
  `2022-01-12T22:20:32.554Z`,
  `2022-01-01T22:20:32.554Z`,
  `2021-11-30T17:36:32.554Z`,
  `2021-07-30T17:36:32.554Z`,
  `2022-01-14T14:20:32.554Z`,
];


const getRandomArrayElement = (arr) => arr[getRandomIndexArray(0, arr.length)];

const getRandomArrayLength = (arr) => arr.slice(getRandomIndexArray(0, arr.length));

const renderRandomFilm = () => {
  const randomIndex = getRandomIndexArray(0, films.length);
  const randomFlag = Math.random() > 0.5 ? true : false;
  return {
    film: films[randomIndex],
    poster: posters[randomIndex],
    description: descriptions[randomIndex],
    rating: getRandomArrayElement(ratings),
    filmYear: getRandomArrayElement(filmYears),
    filmDuration: getRandomArrayElement(filmDurations),
    filmGenre: getRandomArrayLength(filmGenres),
    comments: getRandomComment(),
    director: directors[randomIndex],
    actors: actors[randomIndex],
    country: countries[randomIndex],
    ageRating: ageRatings[randomIndex],
    filter: {
      watchlist: Math.random() > 0.5 ? true : false,
      history: randomFlag,
      watchingDate: randomFlag ? getRandomArrayElement(watchingDate) : ``,
      favorites: Math.random() > 0.5 ? true : false
    }
  };
};

const getRandomFilmsArray = (number) => {
  const randomFilms = [];
  for (let i = 0; i < number; i++) {
    randomFilms.push(renderRandomFilm());
    randomFilms[i].id = i;
  }
  return randomFilms;
};


export {getRandomFilmsArray};
