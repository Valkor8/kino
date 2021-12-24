import {getRandomInt} from "../mock/random-generator.js";

const totalFilms = getRandomInt(1000, 100000);

const createFooterStatistic = () => {
  return (
    `<p>${totalFilms} movies inside</p>`
  );
};

export {createFooterStatistic};
