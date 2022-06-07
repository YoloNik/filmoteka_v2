import FetchAPI from './js/fetchApi';
import movieCard from './templates/movieCard.hbs';

const fetchAPI = new FetchAPI();

const searchQuery = document.getElementById(`search-form`);
const errorText = document.querySelector(`.search-error`);
const homeBtn = document.querySelector('.home-btn');
const movieGallery = document.querySelector(`.gallery`);

console.dir(homeBtn);

searchQuery.addEventListener(`click`, onSearchBtn);
homeBtn.addEventListener(`click`, onHomeBtn);
if (movieGallery.childElementCount === 0) {
  fetchAPI.fetchMovie().then(data => {
    fetchAPI.getGenres().then(geners => {
      createCards(data, geners);
      movieGallery.innerHTML = createCards(data);
    });
  });
}
function onHomeBtn(e) {
  document.location = `../index.html`;
}
function onSearchBtn(e) {
  errorText.style.visibility = `hidden`;
  if (e.target.closest(`button`)) {
    e.preventDefault();
    fetchAPI.query = e.currentTarget.elements[0].value;
    fetchAPI.fetchMovie().then(data => {
      fetchAPI.getGenres().then(geners => {
        createCards(data, geners);
      });
      movieGallery.innerHTML = createCards(data);
    });
  }
  if (movieGallery.childElementCount === 0) {
    errorText.style.visibility = `visible`;
  }
}

function createCards(data, geners) {
  //console.log(data.results);
  return data.results
    .map(
      el => {
        //console.log(el);
        //for (let key in geners) {
        //  if (el.genre_ids.includes(key)) {
        return movieCard(el);
      }
      //}
    )
    .join('');
}
//  console.log(movieData);
//  let gener;
//  if (movieData.genre_ids.include(fetchAPI.genres[key])) {
//  }
//}
//	fetchAPI.genres;
//console.log(gener);
