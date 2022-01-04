import moment from "moment";

export const getDuration = (film) => {
  return `${moment.duration(film.filmDuration * 1000 * 60).hours()}h ${moment.duration(film.filmDuration * 1000 * 60).minutes()}m`;
};

export const getDateForMoment = (obj, format) => {
  return moment(obj).utc().format(format);
};

export const getHumanizeDate = (obj) => {
  return moment(obj).fromNow();
};

export const getHumanizeDate2 = (obj) => {
  const date = Math.round((new Date() - moment(obj) + (3 * 60 * 60 * 1000)) / 1000 / 60);
  if (date < 1) {
    return `now`;
  } else if (date > 1 && date < 10) {
    return `a few minutes ago`;
  } else if (date >= 10 && date < 60) {
    return `${date} minutes ago`;
  } else if (date >= 60 && date < 24 * 60) {
    return `${Math.floor(date / 60) } hours ago`;
  } else if (date >= 24 * 60 && date < 7 * 24 * 60) {
    return `${Math.floor(date / 60 / 24) } days ago`;
  } else {
    return `a long time ago`;
  }
};
