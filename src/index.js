import apiService from './js/fetchApi';
import fetchMoviesWhisGenres from './js/markup-movie-card';
import fetchMovieForModal from './js/markup-modal';
import localStorageMovie from './js/local-storage';
import pagOptions from './js/pagination';
import './js/movie-trailer';
//import scrollUp from './js/scroll-up';
//import movieTreiler from './js/movie-trailer';
//import './js/movie-trailer';

const searchQuery = document.getElementById(`search__form`);
const homeBtn = document.querySelector('.header__home-btn');
const myLibrary = document.querySelector('.header__library-btn');
const movieGallery = document.getElementById(`gallery`);
const singleMovie = document.querySelector('.movie-card');
const modal = document.querySelector('.backdrop-modal');
const modalWin = document.querySelector('.output-js');

modal.addEventListener('click', closeModal);
movieGallery.addEventListener('click', openModal);
searchQuery.addEventListener(`click`, onSearchBtn);

fetchMoviesWhisGenres();

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
    localStorageMovie();
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
    //apiService.movieId = 'none';
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

//scrollUp();
pagOptions();
