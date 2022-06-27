import apiService from './fetchApi';
import { createCards } from './markup-movie-card';

const searchQuery = document.getElementById(`search__form`);

searchQuery.addEventListener(`keyup`, changePgn);
function changePgn(e) {
  if (searchQuery[0].value === '') {
    $('#pagination-container').pagination({
      dataSource: `https://api.themoviedb.org/3/trending/movie/week?api_key=87f9885ae1efa5e26738121aab64796c&page=1`,
      locator: 'results',
      totalNumberLocator: function (response) {
        return response.total_results;
      },
      pageSize: 20,
      pageNumber: 1,
      alias: {
        pageNumber: 'page',
      },
      prevText: '',
      nextText: '',
      pageRange: 2,
      callback: function (movieData, pagination) {
        const genres = apiService.genresValue;
        const normaGenres = movieData.map(movieEl => {
          return movieEl.genre_ids
            .map(generEl => {
              if (genres[generEl]) return genres[generEl];
            })
            .join(', ');
        });
        var html = createCards(movieData, normaGenres);
        $('#data-container').html(html);
      },
    });
  } else {
    $('#pagination-container').pagination({
      dataSource: `https://api.themoviedb.org/3/search/movie?api_key=87f9885ae1efa5e26738121aab64796c&query=${encodeURIComponent(
        searchQuery[0].value
      )}`,
      locator: 'results',
      totalNumberLocator: function (response) {
        return response.total_results;
      },
      pageSize: 20,
      pageNumber: 1,
      alias: {
        pageNumber: 'page',
      },
      prevText: '',
      nextText: '',
      pageRange: 2,
      callback: function (movieData, pagination) {
        const genres = apiService.genresValue;
        const normaGenres = movieData.map(movieEl => {
          return movieEl.genre_ids
            .map(generEl => {
              if (genres[generEl]) return genres[generEl];
            })
            .join(', ');
        });
        var html = createCards(movieData, normaGenres);
        $('#data-container').html(html);
      },
    });
  }
}
changePgn();
