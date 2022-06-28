import apiService from './js/fetchApi';
import fetchMoviesWhisGenres from './js/markup-movie-card';
import fetchMovieForModal from './js/markup-modal';
//import movieInLocalStorage from './js/local-storage';
import './js/local-storage';
import './js/pagination';
import './js/movie-trailer';

const searchQuery = document.getElementById(`search__form`);
const movieGallery = document.getElementById(`gallery`);
const modal = document.querySelector('.backdrop-modal');
const modalWin = document.querySelector('.output-js');

modal.addEventListener('click', closeModal);
movieGallery.addEventListener('click', openModal);
searchQuery.addEventListener(`click`, onSearchBtn);
searchQuery.addEventListener('keyup', changeSearchQuery);

fetchMoviesWhisGenres();

function changeSearchQuery(e) {
  apiService.query = e.currentTarget.elements[0].value;
  fetchMoviesWhisGenres();
}

function onSearchBtn(e) {
  if (e.target.closest(`button`)) {
    e.preventDefault();
    apiService.query = e.currentTarget.elements[0].value;
    fetchMoviesWhisGenres();
  }
}

function openModal(e) {
  window.addEventListener(`keydown`, onEscCloseModal);
  if (e.target.closest('.movie-card')) {
    let movieId = e.target.dataset.id;

    apiService.movieId = movieId;

    fetchMovieForModal();

    document.querySelector('body').style.overflow = 'hidden';
    modal.style.overflow = 'scroll';
    modal.style.display = `block`;
  }
}
function closeModal(e) {
  if (
    e.target.closest(`.modal-content__close-btn`) ||
    e.target.className === 'backdrop-modal'
  ) {
    modalWin.innerHTML = '';
    modal.style.display = `none`;
    document.querySelector('body').style.overflow = 'scroll';
  }
}
function onEscCloseModal(e) {
  if (e.code === 'Escape') {
    modalWin.innerHTML = '';
    modal.style.display = `none`;
    document.querySelector('body').style.overflow = 'scroll';
    window.removeEventListener(`keydown`, onEscCloseModal);
  }
}
