import apiService from './fetchApi';
import Pagination from 'tui-pagination';
import fetchMoviesWhisGenres from './markup-movie-card';
//import 'tui-pagination/dist/tui-pagination.css';

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
      page: `<li class="tui-page-btn numButton">{{page}}</li>`,
      currentPage: `<li class="tui-page-btn tui-is-selected">{{page}}</li>`,
      moveButton:
        '<li class="tui-page-btn  tui-{{type}}">' +
        '<div class="tui-ico-{{type}}">{{type}}</div>' +
        '</li>',
      disabledMoveButton:
        '<li class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        ' <div class="tui-ico-{{type}}">{{type}}</div>' +
        '</li>',
      moreButton:
        '<li class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<div class="tui-ico-ellip">...</div>' +
        '</li>',
      //page: '<a href="#" class="tui-page-btn numButton">{{page}}</a>',
      //currentPage:
      //  '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      //moveButton:
      //  '<a href="#" class="tui-page-btn tui-{{type}}">' +
      //  '<span class="tui-ico-{{type}}">{{type}}</span>' +
      //  '</a>',
      //disabledMoveButton:
      //  '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      //  '<span class="tui-ico-{{type}}">{{type}}</span>' +
      //  '</span>',
      //moreButton:
      //  '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      //  '<span class="tui-ico-ellip">...</span>' +
      //  '</a>',
    },
  };

  const pagination = new Pagination(container, options);
  const numButton = document.querySelector('.numButton');
  const first = document.querySelector('.tui-first');
  const prev = document.querySelector('.tui-prev');
  const next = document.querySelector('.tui-next');
  const last = document.querySelector('.tui-last');
  first.innerHTML = '1';
  last.innerHTML = `${apiService.totalPages}`;
  if (numButton.textContent === 1) {
    first.style.display = 'none';
  }
  return pagination;
}

function onPag(e) {
  if (e.target.textContent !== `...`) {
    if (e.target.closest('.numButton')) {
      apiService.numOfPageSet = +e.target.textContent;
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-next')) {
      apiService.page += 1;
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-prev') && apiService.page > 1) {
      apiService.page -= 1;
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-last')) {
      apiService.page = apiService.totalPages;
      fetchMoviesWhisGenres();
    }
    if (e.target.closest('.tui-first')) {
      apiService.page = 1;
      fetchMoviesWhisGenres();
    }
  }
}
