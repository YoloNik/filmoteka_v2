import apiService from './fetchApi';

const movieGallery = document.querySelector(`.gallery`);

export default function fetchNormaMovie() {
  apiService.getGenres();
  apiService.fetchMovie().then(movieData => {
    const genres = apiService.genresValue;
    const normaGenres = movieData.results.map(movieEl => {
      return movieEl.genre_ids
        .map(generEl => {
          if (genres[generEl]) return genres[generEl];
        })
        .join(', ');
    });
    movieGallery.innerHTML = createCards(movieData, normaGenres);
  });
}

function createCards(movieData, normaGenres) {
  return movieData.results
    .map((el, idx) => {
      let movieCard = document.createElement(`div`);
      return (movieCard.innerHTML = `<div class="movie-card">
<img src="https://image.tmdb.org/t/p/w500${el.poster_path}" data-id="${
        el.id
      }" alt="There should be a poster 😮">
  <div class="movie-card__title">
		<span>${el.title}</span>
	<div class="movie-card__info-item">
		<span>${normaGenres[idx]} | ${el.release_date.substr(0, 4)}</span>
	</div>
  </div>
</div>`);
    })
    .join('');
}
