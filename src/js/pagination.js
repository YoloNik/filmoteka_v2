import apiService from './fetchApi';

//const arrowLeft = document.querySelector('.arrow-left');
//const arrowRight = document.querySelector('.arrow-right');
const pagination = document.querySelector('.pagination-container');

apiService.getTrendMovies().then(data => {
  pagination.addEventListener('click', pageNav);
  console.log(apiService.page);
  function pageNav(e) {
    if (e.target.closest('.arrow-right')) {
      nextPage(data.total_pages);
    }
    if (e.target.closest('.arrow-left')) {
      previousPage();
    }
    if (e.target.closest('.first-page')) {
      firstPage();
    }
    if (e.target.closest('.last-page')) {
      lastPage(data.total_pages);
    }
    console.log(apiService.page);
  }
});

function nextPage(total_pages) {
  if (apiService.page !== total_pages) apiService.page += 1;
}
function previousPage() {
  if (apiService.page !== 1) apiService.page -= 1;
}
function firstPage() {
  if (apiService.page !== 1) {
    apiService.page = 1;
  }
}
function lastPage(total_pages) {
  console.log(total_pages);
  if (apiService.page !== total_pages) apiService.page = total_pages;
}

//export function paginationRender() {
//  return (pagination.innerHTML = `<li class="pagination__list-item first-page">first-page</li>
//		<li class="pagination__list-item dots">...</li>
//		<li class="pagination__list-item active-page">1</li>
//		<li class="pagination__list-item">2</li>
//		<li class="pagination__list-item">3</li>
//		<li class="pagination__list-item">4</li>
//		<li class="pagination__list-item">5</li>
//		<li class="pagination__list-item dots">...</li>
//		<li class="pagination__list-item last-page">last-page</li>
//	`);
//}
