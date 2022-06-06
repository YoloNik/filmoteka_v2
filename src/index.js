import FetchAPI from './js/fetchApi';
import movieCard from './templates/movieCard.hbs';

const fetchAPI = new FetchAPI();

const searchQuery = document.getElementById(`search-form`);
const movieGallery = document.querySelector(`.gallery`);

//console.log(searchQuery);

searchQuery.addEventListener(`click`, onSearchBtn);

function onSearchBtn(e) {
  if (e.target.closest(`button`)) {
    e.preventDefault();
    fetchAPI.query = e.currentTarget.elements[0].value;
    fetchAPI.fetchMovie().then(data => {
      //createCards(data);
      fetchAPI.getGenres().then(geners => {
        createCards(data, geners);
        //console.log(data, geners);
      });
      movieGallery.innerHTML = createCards(data);
    });
  }
}

function createCards(data, geners) {
  //console.log(data.results);
  let movieData = data.results
    .map(el => {
      console.log(el);
      for (let key in geners) {
        if (el.genre_ids.includes(key)) {
          movieCard(el);
        }
      }
    })
    .join('');
}
//  console.log(movieData);
//  let gener;
//  if (movieData.genre_ids.include(fetchAPI.genres[key])) {
//  }
//}
//	fetchAPI.genres;
//console.log(gener);
