import {getPictures} from './data.js';

const similarListElement = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = getPictures();

const similarListFragment = document.createDocumentFragment();

function createPhoto(photo) {
  const photoElement = similarPhotoTemplate.cloneNode(true);
  // photoElement.querySelector('.picture').dataset.id = photo.id;
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
}
similarPhotos.forEach((photo) => {
  const photoElement = createPhoto(photo);
  similarListFragment.append(photoElement);
});

similarListElement.append(similarListFragment);

export {similarListElement, similarPhotos};
