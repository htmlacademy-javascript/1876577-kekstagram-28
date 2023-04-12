import {getRandomInteger, getRandomArrayElement} from './util.js';

const PHOTO_COUNT = 25;

const PHOTO_DESCRIPTIONS = [
  'Солнечный день на пляже!',
  'Сегодня я почувствовал себя настоящим исследователем!',
  'Новая книга, новые приключения',
  'Кто сказал, что жизнь на даче скучна?',
  'Встречайте нового члена нашей семьи',
  'Романтический ужин под звездами',
  'Подарок от природы',
  'Попробовал новый рецепт и получилось вкусно!',
  'Работать из дома - лучшее решение!',
  'Встретил закат на любимом месте',
  'Сегодняшний тренировочный день был на высоте!',
  'Прекрасный день с друзьями в парке',
];

const COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Теодор', 'Александр', 'Тимур', 'Константин', 'Иракли', 'Марк'];

export const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generatePhotoAddress = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 100);
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(COMMENTS_MESSAGES),
  name: getRandomArrayElement(NAMES)
});
const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoAddress()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(1, 20)}, createComment)
});
export const createSimilarPhotoDescriptions = () => Array.from({length: PHOTO_COUNT}, createPhotoDescription);

