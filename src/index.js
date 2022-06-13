import apiService from './js/fetchApi';
import fetchNormaMovie from './js/markup-movie-card';

const searchQuery = document.getElementById(`search__form`);
const homeBtn = document.querySelector('.header__home-btn');
const myLibrary = document.querySelector('.header__library-btn');
const movieGallery = document.querySelector(`.gallery`);

searchQuery.addEventListener(`click`, onSearchBtn);
homeBtn.addEventListener(`click`, onHomeBtn);
myLibrary.addEventListener(`click`, onLibraryBtn);

fetchNormaMovie();

function onSearchBtn(e) {
  if (e.target.closest(`button`)) {
    e.preventDefault();
    apiService.query = e.currentTarget.elements[0].value;
    fetchNormaMovie();
  }
}

function onHomeBtn(e) {
  homeBtn.classList.add('header__active-page');
  myLibrary.classList.remove('header__active-page');
  //document.location = `../index.html`;
}

function onLibraryBtn(e) {
  homeBtn.classList.remove('header__active-page');
  myLibrary.classList.add('header__active-page');
}
