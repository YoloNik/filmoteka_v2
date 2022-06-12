import apiService from './js/fetchApi';
import fetchNormaMovie from './js/markup-movie-card';

const searchQuery = document.getElementById(`search__form`);
const errorText = document.querySelector(`.search-error`);
const homeBtn = document.querySelector('.header__home-btn');
const movieGallery = document.querySelector(`.gallery`);

searchQuery.addEventListener(`click`, onSearchBtn);
homeBtn.addEventListener(`click`, onHomeBtn);

fetchNormaMovie();

function onHomeBtn(e) {
  document.location = `../index.html`;
}
function onSearchBtn(e) {
  errorText.style.visibility = `hidden`;
  if (e.target.closest(`button`)) {
    e.preventDefault();
    apiService.query = e.currentTarget.elements[0].value;
    movieGallery.innerHTML = fetchNormaMovie();
  }
  //if (movieGallery.childElementCount === 0) {
  //  errorText.style.visibility = `visible`;
  //}
}
