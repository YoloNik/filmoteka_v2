import apiService from './fetchApi';
import { openTrailer } from './movie-trailer';

const modalWin = document.querySelector('.output-js');

export default async function fetchMovieForModal() {
  return await apiService.getSingleMovie().then(movieData => {
    let normaGenres = movieData.genres.map(genres => genres[`name`]).join(', ');
    createModal(movieData, normaGenres);

    const trailerBtn = document.getElementById(movieData.id);
    modalWin.addEventListener('click', onTrailerBtn);

    function onTrailerBtn(e) {
      if (e.target === trailerBtn) {
        openTrailer(movieData.original_title);
      }
    }
  });
}

function createModal(movieData, normaGenres) {
  let watched = JSON.parse(localStorage.getItem('watched')) || [];
  let queue = JSON.parse(localStorage.getItem('queue')) || [];
  let watchedText;
  let queueText;
  apiService.movieName = movieData.title;

  const isExistWatched = watched.find(el => {
    return el.id === movieData.id;
  });
  if (isExistWatched) {
    watchedText = 'remove from Watched ';
  } else {
    watchedText = 'add to Watched';
  }

  const isExistQueue = queue.find(el => {
    return el.id === movieData.id;
  });
  if (isExistQueue) {
    queueText = 'remove from queue ';
  } else {
    queueText = 'add to queue';
  }
  const markupModal = (modalWin.innerHTML = `<img class="modal-content__img"
			src="${
        movieData.poster_path
          ? 'https://image.tmdb.org/t/p/w500' + movieData.poster_path
          : 'https://expresspost.in///website/images/reporter_image/default.png'
      }" alt="${movieData.original_title}" />
    <div class="wrap">
      <h2 class="modal-content__title">${movieData.original_title}</h2>
      <div class="info-wrap modal-content__info-wrap">
        <ul class="category-list">
          <li class="category-list__item">Vote / Votes</li>
          <li class="category-list__item">Popularity</li>
          <li class="category-list__item">Original Title</li>
          <li class="category-list__item">Genre</li>
        </ul>
        <ul class="category-value-list modal-content__category-value-list">
          <li class="category-value-list__item">
						<p class="category-value-list__item_bg-color">${movieData.vote_average} </p>
						<p class="category-value-list__item_font-color"> / ${
              movieData.vote_count
            } </p> </li>
          <li class="category-value-list__item">${movieData.popularity}</li>
          <li class="category-value-list__item">${movieData.title}</li>
          <li class="category-value-list__item">${normaGenres}</li>
        </ul>
      </div>
			<div class='player-wrap'>
				<button id="${movieData.id}" class="player-Btn">watch movie footage</button>
			</div>
				<h3 class="modal-content__subtitle">About</h3>
      <p class="modal-content__description">${movieData.overview}</p>
      <div class="btn-wrap content__btn-wrap">
          <button class="btn-wrap__btn active" data-action="watched">${watchedText}</button>
          <button class="btn-wrap__btn " data-action="queue">${queueText}</button>
        </div>
    `);

  return markupModal;
}
