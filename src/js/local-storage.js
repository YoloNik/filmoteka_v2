import apiService from './fetchApi';

export default function localStorageMovie() {
  let watched = [];
  let queue = [];
  if (localStorage.getItem('watched')) {
    watched = JSON.parse(localStorage.getItem('watched'));
  }
  if (localStorage.getItem('queue')) {
    queue = JSON.parse(localStorage.getItem('queue'));
  }

  window.addEventListener(`click`, addMovie);

  function addMovie(e) {
    apiService.getSingleMovie().then(movieData => {
      if (e.target.closest(`[data-action="watched"]`)) {
        const isExist = watched.find(el => {
          return el.id === movieData.id;
        });
        if (!isExist) {
          watched.push(movieData);
          localStorage.setItem('watched', JSON.stringify(watched));
        }
      }
      if (e.target.closest(`[data-action="queue"]`)) {
        const isExist = queue.find(el => {
          return el.id === movieData.id;
        });
        if (!isExist) {
          queue.push(movieData);
          localStorage.setItem('queue', JSON.stringify(queue));
        }
      }
    });
  }
}
