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
  `2021/12/22 23:28`,
  `2021/11/30 23:28`,
  `2021/12/18 08:36`,
  `2021/09/01 11:36`,
  `2021/01/01 00:00`,
];

const MAX_COMMENTS = 5;

const getRandomComment = () => {
  const comments = [];
  for (let i = 0; i < getRandomIndexArray(0, MAX_COMMENTS); i++) {
    const comment = {
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
