import apiService from './fetchApi';
import Pagination from 'tui-pagination';
import fetchMoviesWhisGenres from './markup-movie-card';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('pagination');
container.addEventListener('click', onPag);

export default async function pagOptions() {
  await apiService.getTrendMovies();

  const options = {
    totalItems: apiService.totalResults,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: `<a href="#" class="tui-page-btn numButton">{{page}}</a>`,
      currentPage: `<strong class="tui-page-btn tui-is-selected">{{page}}</strong>`,
      moveButton:
        '<a href="#" class="tui-page-btn  tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">1</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        ' 1 <span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination(container, options);
  return pagination;
}

function onPag(e) {
  if (e.target.textContent !== `...`) {
    if (e.target.closest('.numButton')) {
      apiService.numOfPageSet = +e.target.textContent;
      console.dir(e.target);
      console.dir(apiService.page);
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-next')) {
      apiService.page += 1;
      //console.log(apiService.page);
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-prev') && apiService.page > 1) {
      apiService.page -= 1;
      //console.log(apiService.page);
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-last')) {
      apiService.page = apiService.totalPages;
      //console.log(apiService.page);
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-first')) {
      apiService.page = 1;
      //console.log(apiService.page);
      fetchMoviesWhisGenres();
    }
  }
}
