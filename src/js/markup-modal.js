import apiService from './fetchApi';
//import fetchNormaMovie from './markup-movie-card';

const modalWin = document.querySelector('.output-js');

export default function fetcMovieForModal() {
  apiService.getSingleMovie().then(movieData => {
    const normaGenres = movieData.genres
      .map(genres => genres[`name`])
      .join(', ');
    modalWin.innerHTML = createModal(movieData, normaGenres);
  });
}

function createModal(movieData, normaGenres) {
  let movieModal = document.createElement(`div`);
  return (movieModal.innerHTML = `<img class="modal-content__img"
			src="https://image.tmdb.org/t/p/w500${movieData.backdrop_path}" alt="${movieData.original_title}" />
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
						<p class="category-value-list__item_font-color"> / ${movieData.vote_count} </p> </li>
          <li class="category-value-list__item">${movieData.popularity}</li>
          <li class="category-value-list__item">${movieData.title}</li>
          <li class="category-value-list__item">${normaGenres}</li>
        </ul>
      </div>
			   <h3 class="modal-content__subtitle">About</h3>
      <p class="modal-content__description">${movieData.overview}</p>
      <div class="btn-wrap content__btn-wrap">
          <button class="btn-wrap__btn active" data-action="watched">add to Watched</button>
          <button class="btn-wrap__btn " data-action="queue">add to queue</button>
        </div>
    `);
}
