import apiService from './fetchApi';

////const arrowLeft = document.querySelector('.arrow-left');
////const arrowRight = document.querySelector('.arrow-right');
//const pagination = document.querySelector('.pagination-container');

//apiService.getTrendMovies().then(data => {
//  pagination.addEventListener('click', pageNav);
//  console.log(apiService.page);
//  function pageNav(e) {
//    if (e.target.closest('.arrow-right')) {
//      nextPage(data.total_pages);
//    }
//    if (e.target.closest('.arrow-left')) {
//      previousPage();
//    }
//    if (e.target.closest('.first-page')) {
//      firstPage();
//    }
//    if (e.target.closest('.last-page')) {
//      lastPage(data.total_pages);
//    }
//    console.log(apiService.page);
//  }
//});

//function nextPage(total_pages) {
//  if (apiService.page !== total_pages) apiService.page += 1;
//}
//function previousPage() {
//  if (apiService.page !== 1) apiService.page -= 1;
//}
//function firstPage() {
//  if (apiService.page !== 1) {
//    apiService.page = 1;
//  }
//}
//function lastPage(total_pages) {
//  console.log(total_pages);
//  if (apiService.page !== total_pages) apiService.page = total_pages;
//}

//function simpleTemplating(data) {
//  var html = '<ul>';
//  $.each(data, function (index, item) {
//    html += '<li>' + item + '</li>';
//  });
//  html += '</ul>';
//  return html;
//}
//$('#pagination-container').pagination({
//  dataSource: [1, 2, 3, 4, 5, 6, 7, ...195],
//  callback: function (data, pagination) {
//    var html = simpleTemplating(data);
//    $('#data-container').html(html);
//  },
//});
