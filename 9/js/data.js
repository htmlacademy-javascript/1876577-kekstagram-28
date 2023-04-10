import {getRandomInteger, getRandomArrayElement, createIdgenerator} from './util.js';

const PHOTO_COUNT = 25;
// const LIKE_MIN = 15;
// const LIKE_MAX = 15;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 20;

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

const generateCommentId = createIdgenerator();
const generateImageId = createIdgenerator();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () =>
    getRandomArrayElement(COMMENTS_MESSAGES)
  ).join('');

function createComment() {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
}

const createPicture = () => {
  const index = generateImageId();
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(1, 10),
    comments: Array.from(
      { length: getRandomInteger(0, COMMENT_COUNT) },
      createComment
    ),
  };
};

export const getPictures = () => Array.from({ length: PHOTO_COUNT }, createPicture);
