import renderLibraryMarkup from './js/markup-library';
import fetcMovieForModal from './js/markup-modal';
import localStorageMovie from './js/local-storage';
import apiService from './js/fetchApi';

const library = document.querySelector('.library');
const modal = document.querySelector('.backdrop-modal');

library.addEventListener('click', openModal);
modal.addEventListener('click', closeModal);

function openModal(e) {
  window.addEventListener(`keydown`, onEscCloseModal);
  if (e.target.closest('.movie-card')) {
    let movieId = e.target.dataset.id;
    apiService.movieId = movieId;
    fetcMovieForModal();

    modal.style.display = `block`;
    localStorageMovie();
  }
}
function closeModal(e) {
  if (
    e.target.closest(`.modal-content__close-btn`) ||
    e.target.className === 'backdrop-modal'
  ) {
    modal.style.display = `none`;
  }
}
function onEscCloseModal(e) {
  if (e.code === 'Escape') {
    modal.style.display = `none`;
    window.removeEventListener(`keydown`, onEscCloseModal);
  }
}
