import apiService from './fetchApi';
import { createCards } from './markup-movie-card';

export default function pagOptions() {
  $('#pagination-container').pagination({
    dataSource:
      'https://api.themoviedb.org/3//trending/movie/week?api_key=87f9885ae1efa5e26738121aab64796c&language=en-US&page=1',
    locator: 'results',
    totalNumberLocator: function (response) {
      return response.total_results;
    },

    pageSize: 20,
    pageNumber: 1,
    alias: {
      pageNumber: 'page',
    },
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
    prevText: '',
    nextText: '',
    pageRange: 2,
  });
  //const pageOne = document.querySelector('[data-num="1"]');
  //console.log(pageOne);
}
