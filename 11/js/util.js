export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

export const createIdgenerator = () => {
  let lastgenerateId = 0;
  return () => {
    lastgenerateId += 1;
    return lastgenerateId;
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');

  alertContainer.classList.add('error-message');

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};
