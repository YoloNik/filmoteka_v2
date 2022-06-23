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

  window.addEventListener(`click`, movieInLocalStorage);

  function movieInLocalStorage(e) {
    const watchedBtn = document.querySelector('[data-action="watched"]');
    const queueBtn = document.querySelector('[data-action="queue"]');
    const library = document.querySelector('.library');

    apiService.getSingleMovie().then(movieData => {
      if (e.target.closest(`[data-action="watched"]`)) {
        const isExist = watched.find(el => {
          return el.id === movieData.id;
        });

        if (!isExist) {
          watchedBtn.innerHTML = 'remove from Watched ';

          watched.push(movieData);
          localStorage.setItem('watched', JSON.stringify(watched));
          library.innerHTML = watched;
        } else {
          watchedBtn.innerHTML = 'add to Watched';
          watched.map(el => {
            localStorage.removeItem('watched', el);

            let idx = watched.indexOf(el);
            if (idx !== -1) {
              watched.splice(idx, 1);
              localStorage.setItem('watched', JSON.stringify(watched));
            }
          });
        }
      }
      if (e.target.closest(`[data-action="queue"]`)) {
        const isExist = queue.find(el => {
          return el.id === movieData.id;
        });

        if (!isExist) {
          queueBtn.innerHTML = 'remove from queue ';
          queue.push(movieData);
          localStorage.setItem('queue', JSON.stringify(queue));
        } else {
          queueBtn.innerHTML = 'add to queue ';
          queue.map(el => {
            localStorage.removeItem('queue', el);

            let idx = queue.indexOf(el);
            if (idx !== -1) {
              queue.splice(idx, 1);
              localStorage.setItem('queue', JSON.stringify(queue));
            }
          });
        }
      }
    });
  }
}
