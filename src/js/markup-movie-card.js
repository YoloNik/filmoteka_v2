import apiService from './fetchApi';

const movieGallery = document.querySelector(`.gallery`);
const errorText = document.querySelector(`.search__error`);

export default function fetchMoviesWhisGenres() {
  errorText.style.visibility = `hidden`;
  apiService.getGenres();
  apiService.getTrendMovies().then(movieData => {
    const genres = apiService.genresValue;
    const normaGenres = movieData.results.map(movieEl => {
      return movieEl.genre_ids
        .map(generEl => {
          if (genres[generEl]) return genres[generEl];
        })
        .join(', ');
    });
    createCards(movieData.results, normaGenres);
  });
}

export function createCards(movieData, normaGenres) {
  const movieCard = movieData
    .map((el, idx) => {
      let movieCard = document.createElement(`div`);
      return (movieCard.innerHTML = `<div class="movie-card">
<img src="${
        el.poster_path
          ? 'https://image.tmdb.org/t/p/w500' + el.poster_path
          : 'https://expresspost.in///website/images/reporter_image/default.png'
      }" data-id="${el.id}" alt="There should be a poster 😮">
  <div class="movie-card__title">
		<span>${el.title}</span>
	<div class="movie-card__info-item">
		<span>${normaGenres[idx]} | ${el.release_date.substr(0, 4)}</span>
	</div>
  </div>
</div>`);
    })
    .join('');
  if (movieData.total_results === 0) {
    movieGallery.innerHTML = '';
    errorText.style.visibility = `visible`;
  } else {
    movieGallery.innerHTML = movieCard;
  }
}
