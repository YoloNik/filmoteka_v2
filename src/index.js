import apiService from './js/fetchApi';
import fetchMoviesWhisGenres from './js/markup-movie-card';
import fetcMovieForModal from './js/markup-modal';

const searchQuery = document.getElementById(`search__form`);
const homeBtn = document.querySelector('.header__home-btn');
const myLibrary = document.querySelector('.header__library-btn');
const movieGallery = document.getElementById(`gallery`);
const singleMovie = document.querySelector('.movie-card');
const modal = document.querySelector('.backdrop-modal');

//console.log(movieGallery);

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
  if (e.target.closest('.movie-card')) {
    let movieId = e.target.dataset.id;
    apiService.movieId = movieId;
    fetcMovieForModal();

    modal.style.display = `block`;
  }
}
function closeModal(e) {
  if (e.target.closest('.modal-content__close-btn')) {
    modal.style.display = `none`;
  }
}