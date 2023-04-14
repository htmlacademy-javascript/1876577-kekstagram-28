import { debounce, createRandomIdFromRangeGenerator } from './util.js';
import { COUNT_RANDOM_PHOTO, RERENDER_DELAY } from './constants.js';
import { renderPhotos } from './photos.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filtersForm = document.querySelector('.img-filters__form');

const setActiveFilterButton = (currentFilter) => {
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  if (currentFilter !== activeFilterButton) {
    activeFilterButton.classList.remove('img-filters__button--active');
  }
  currentFilter.classList.add('img-filters__button--active');
};

const sortByCommentsDecrease = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const setrandomFilter = (elements, count) => () => {
  const generateElementId = createRandomIdFromRangeGenerator(0, elements.length - 1);
  const filteredElements = Array.from({ length: count }, () => elements[generateElementId()]);
  renderPhotos(filteredElements);
};

const setdiscussedFilter = (elements) => () => {
  const filteredElements = elements.slice(0).sort(sortByCommentsDecrease);
  renderPhotos(filteredElements);
};

const setdefaultFilter = (elements) => () => {
  renderPhotos(elements);
};


export const setFilter = (elements) => {

  filtersForm.addEventListener('click', (evt) => {
    let filter;
    setActiveFilterButton(evt.target);
    switch (evt.target) {
      case filterRandom:
        filter = debounce(setrandomFilter(elements, COUNT_RANDOM_PHOTO), RERENDER_DELAY);
        filter();
        break;
      case filterDiscussed:
        filter = debounce(setdiscussedFilter(elements), RERENDER_DELAY);
        filter();
        break;
      case filterDefault:
        filter = debounce(setdefaultFilter(elements), RERENDER_DELAY);
        filter();
        break;
      default:
        break;
    }
  });
};
