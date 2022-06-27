import apiService from './fetchApi';
import Notiflix from 'notiflix';

export default function localStorageMovie() {
  let watched = JSON.parse(localStorage.getItem('watched')) || [];
  let queue = JSON.parse(localStorage.getItem('queue')) || [];

  window.addEventListener(`click`, movieInLocalStorage);

  function movieInLocalStorage(e) {
    const watchedBtn = document.querySelector('[data-action="watched"]');
    const queueBtn = document.querySelector('[data-action="queue"]');

    apiService.getSingleMovie().then(movieData => {
      if (e.target.closest(`[data-action="watched"]`)) {
        const isExist = watched.find(el => {
          return el.id === movieData.id;
        });

        if (!isExist) {
          Notiflix.Notify.success(
            `"${movieData.original_title}" Added to watched`
          );
          watchedBtn.innerHTML = 'remove from Watched ';

          watched.push(movieData);
          localStorage.setItem('watched', JSON.stringify(watched));
        } else {
          Notiflix.Notify.success(
            `"${movieData.original_title}" Removed from watched`
          );
          watchedBtn.innerHTML = 'add to Watched';
          watched = watched.filter(el => el.id !== movieData.id);

          localStorage.setItem('watched', JSON.stringify(watched)) || [];
        }
      }
      if (e.target.closest(`[data-action="queue"]`)) {
        const isExist = queue.find(el => {
          return el.id === movieData.id;
        });

        if (!isExist) {
          Notiflix.Notify.success(
            `"${movieData.original_title}" Added to queue`
          );
          queueBtn.innerHTML = 'remove from queue';
          queue.push(movieData);
          localStorage.setItem('queue', JSON.stringify(queue));
        } else {
          queueBtn.innerHTML = 'add to queue';
          Notiflix.Notify.success(
            `"${movieData.original_title}" Removed from queue`
          );
          queue = queue.filter(el => el.id !== movieData.id);
          localStorage.setItem('queue', JSON.stringify(queue)) || [];
        }
      }
    });
  }
}
