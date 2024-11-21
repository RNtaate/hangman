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
