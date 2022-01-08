import {getRandomIndexArray} from "./random-generator.js";

const commentsText = [
  `Good film-1`,
  `Good film-2`,
  `Good film-3`,
  `Good film-4`,
  `Good film-5`
];

const commentsEmotion = [
  `smile`, `sleeping`, `puke`, `angry`
];

const emotionImg = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
];

const commentsAuthor = [
  `Ahilles`,
  `Gector`,
  `Ajax`,
  `Agamemnon`,
  `Odissey`,
];

const commentsDate = [
  `2021-12-30T17:36:32.554Z`,
  `2021-12-29T11:44:32.554Z`,
  `2021-12-31T01:01:32.554Z`,
  `2022-01-04T22:24:32.554Z`,
  `2022-01-03T22:20:32.554Z`,
];

const MAX_COMMENTS = 5;

const getRandomComment = () => {
  const comments = [];
  for (let i = 0; i < getRandomIndexArray(0, MAX_COMMENTS); i++) {
    const comment = {
      id: Math.floor(new Date() * Math.random()),
      text: commentsText[getRandomIndexArray(0, commentsText.length)],
      emotion: commentsEmotion[getRandomIndexArray(0, commentsEmotion.length)],
      author: commentsAuthor[getRandomIndexArray(0, commentsAuthor.length)],
      date: commentsDate[getRandomIndexArray(0, commentsDate.length)],
      img: emotionImg[getRandomIndexArray(0, emotionImg.length)]
    };
    comments.push(comment);
  }
  return comments;
};

export {getRandomComment};
