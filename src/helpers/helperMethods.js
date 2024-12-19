import axios from 'axios';
import { RANDOM_WORD_API, WORD_CONFIRM_API } from './helperConstants';

export const wordToObjectConverter = (word) => {
  let letterArray = word.toUpperCase().split('');

  let letterObject = {};

  letterArray.forEach((letter) => {
    if (letterObject[letter]) {
      letterObject[letter] += 1;
    } else {
      letterObject[letter] = 1;
    }
  });

  return letterObject;
};

export const waitSimulation = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const fetchOrConfirmWord = (guessedWord = '') => {
  if (guessedWord) {
    return axios.get(`${WORD_CONFIRM_API}${guessedWord}`);
  }
  return axios.get(RANDOM_WORD_API);
};
