import { createCards } from './markup-movie-card';

const library = document.querySelector('.library');
const watchedBtn = document.querySelector('.watchet-btn');
const queueBtn = document.querySelector('.queue-btn');
const optionsBtn = document.querySelector('.nav-op');

let storageWatched = JSON.parse(localStorage.getItem(`watched`)) || [];
let storageQueue = JSON.parse(localStorage.getItem('queue')) || [];

optionsBtn.addEventListener('click', toggleLibrary);

export default function renderLibraryMarkup() {
  if (watchedBtn.closest('.active-btn')) {
    renderMovie(storageWatched);
  } else {
    renderMovie(storageQueue);
  }
}

function toggleLibrary(e) {
  if (e.target === watchedBtn) {
    watchedBtn.classList.add('active-btn');
    queueBtn.classList.remove('active-btn');
    storageWatched = JSON.parse(localStorage.getItem(`watched`));
    renderMovie(storageWatched);
  }
  if (e.target === queueBtn) {
    queueBtn.classList.add('active-btn');
    watchedBtn.classList.remove('active-btn');
    storageQueue = JSON.parse(localStorage.getItem('queue'));
    renderMovie(storageQueue);
  }
}

function renderMovie(storage) {
  library.innerHTML = '';
  let markup = storage
    .map(el => {
      const normaGenres = el.genres.map(genres => genres[`name`]).join(', ');
      return `<div class="movie-card">
      <img class="movie" src="https://image.tmdb.org/t/p/w500${
        el.poster_path
      }" data-id="${el.id}">
      <p class="movie-card__title">
        ${el.title}
        <div class="movie-card__info-item">
          <span class="genre">${normaGenres} | ${el.release_date.substr(
        0,
        4
      )}</span>
        </div>
      </p></div>`;
    })
    .join('');
  library.innerHTML = markup;
}
