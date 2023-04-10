import { MAX_LENGTH_COMMENTS_TEXT, uploadForm } from './constants.js';
import { isEscapeKey } from './util.js';

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const closeUploadForm = uploadForm.querySelector('.img-upload__cancel');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
export const uploadFile = uploadForm.querySelector('.img-upload__input');

const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const scaleControl = uploadForm.querySelector('.scale__control--value');
const scaleControlSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadForm.querySelector('.scale__control--bigger');

const imgUploadPreview = uploadForm.querySelector('.img-upload__preview img');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(hashtagsInput, validateHashtagsFormat, 'Неверный формат хэш-тегов');
pristine.addValidator(hashtagsInput, validateHashtagsLength, 'Количество хэш-тегов превышает 5');
pristine.addValidator(hashtagsInput, validateHashtagsDuplicate, 'Один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(commentInput, validateComment, 'Максимальная длина - 140 символов');

const sliderFieldset = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const imgEffectValue = uploadForm.querySelector('.effect-level__value');
const effectsList = uploadForm.querySelector('.effects__list');

let slider;

function initialSlider () {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function(value) {
        return parseFloat(value);
      }
    }
  });
  sliderElement.noUiSlider.set(100);
  sliderElement.noUiSlider.on('update', () => {
    imgEffectValue.value = sliderElement.noUiSlider.get();
    setEffect();
  });

  return sliderElement;
}

const onFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

function cancelCloseForm (evt) {
  evt.target.addEventListener('keydown', (e) => {
    e.stopPropagation();
  });
}

function validateForm (evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

function setBiggerScale () {
  if (parseInt(scaleControl.value, 10) < 100) {
    scaleControl.value = `${parseInt(scaleControl.value, 10) + 25}%`;
  }
  imgUploadPreview.style.transform = `scale(${parseInt(scaleControl.value, 10) / 100})`;
}

function setSmallerScale () {
  if (parseInt(scaleControl.value, 10) > 25) {
    scaleControl.value = `${parseInt(scaleControl.value, 10) - 25}%`;
  }
  imgUploadPreview.style.transform = `scale(${parseInt(scaleControl.value, 10) / 100})`;
}

function setEffect () {
  const effectValue = uploadOverlay.querySelector('.effects__radio:checked').value;
  const rangeValue = Number(imgEffectValue.value);
  let filter = effectValue;

  switch (effectValue) {
    case 'chrome':
      filter = `grayscale(${rangeValue})`;
      break;
    case 'sepia':
      filter = `sepia(${rangeValue})`;
      break;
    case 'marvin':
      filter = `invert(${rangeValue}%)`;
      break;
    case 'phobos':
      filter = `blur(${rangeValue * 3}px)`;
      break;
    case 'heat':
      filter = `brightness(${rangeValue * 2 + 1})`;
      break;
    default:
      break;
  }

  if (filter === 'none') {
    imgUploadPreview.style.filter = '';
    imgEffectValue.value = '';
    sliderFieldset.classList.add('hidden');
  } else {
    sliderFieldset.classList.remove('hidden');
  }

  imgUploadPreview.style.filter = filter;
}

function onChangeEffect (evt) {
  if (!slider) {
    slider = initialSlider();
  }
  if (evt.target.value === 'marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      step: 1
    });
  } else {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      step: 0.1
    });
  }

  slider.noUiSlider.set(100);
  if (evt.target.value === 'none') {
    slider.noUiSlider.destroy();
    slider = null;
  }

  setEffect();
}

function closeForm () {
  uploadOverlay.classList.add('hidden');
  uploadForm.reset();
  pristine.reset();
  imgUploadPreview.style = '';
  hashtagsInput.removeEventListener('focus', cancelCloseForm);
  commentInput.removeEventListener('focus', cancelCloseForm);
  uploadForm.removeEventListener('submit', validateForm);

  scaleControlSmaller.removeEventListener('click', setSmallerScale);
  scaleControlBigger.removeEventListener('click', setBiggerScale);

  effectsList.removeEventListener('change', onChangeEffect);

  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onFormKeydown);
}

export function openUploadForm () {
  document.body.addEventListener('keydown', onFormKeydown);
  document.body.classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  closeUploadForm.addEventListener('click', closeForm);
  hashtagsInput.addEventListener('focus', cancelCloseForm);
  commentInput.addEventListener('focus', cancelCloseForm);
  uploadForm.addEventListener('submit', validateForm);

  scaleControlSmaller.addEventListener('click', setSmallerScale);
  scaleControlBigger.addEventListener('click', setBiggerScale);

  effectsList.addEventListener('change', onChangeEffect);

  slider = initialSlider();
}

function validateHashtagsFormat (hashtags) {
  const hashtagsArray = hashtags.trim().split(' ').filter((hashtag) => hashtag.trim());
  let flag = true;
  if ((hashtagsArray.length > 5) || (new Set(hashtagsArray).size !== hashtagsArray.length)) {
    flag = false;
  }
  hashtagsArray.forEach((hashtag) => {
    if (!HASHTAG_REGEXP.test(hashtag)) {
      flag = false;
    }
  });
  if (hashtagsArray.length === 1 && hashtagsArray[0] === '') {
    flag = true;
  }
  return flag;
}

function validateHashtagsLength (hashtags) {
  const hashtagsArray = hashtags.trim().split(' ').filter((hashtag) => hashtag.trim());
  return hashtagsArray.length <= 5;
}

function validateHashtagsDuplicate (hashtags) {
  const hashtagsArray = hashtags.trim().split(' ').filter((hashtag) => hashtag.trim());
  const set = new Set(hashtagsArray);
  let flag = true;
  if(set.size !== hashtagsArray.length) {
    flag = false;
  }
  return flag;
}

function validateComment (comment) {
  return comment.length <= MAX_LENGTH_COMMENTS_TEXT;
}
