import apiService from './fetchApi';

const overlayContent = document.querySelector('.overlay-content');
let activeTrailer = 0;
let totalVideo = 0;
const modalWin = document.querySelector('.output-js');

document.querySelector('.overlay').addEventListener('click', closeTrailer);

export function openTrailer(original_title) {
  apiService.getMovieTreiler().then(data => {
    if (data) {
      document.getElementById('myNav').style.width = '100%';
      if (data.results.length > 0) {
        const trailerVideos = [];
        data.results.forEach((video, idx) => {
          let { name, key, site } = video;
          if (site === 'YouTube' && name === 'Official Trailer') {
            trailerVideos.push(
              `<iframe class="movieTreiler hide" src="https://www.youtube.com/embed/${key}"
							title="${name}" frameborder="0" allow="accelerometer; autoplay;
							clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
						</iframe>`
            );
          }
        });
        let contentOfVideo = `
				<h1 class="titel">${original_title}</h1>
				<br/>
				${trailerVideos.join('')}`;

        overlayContent.innerHTML = contentOfVideo;
        showVideo();
      } else {
        document.querySelector('.player-Btn').style.disabled = true;
      }
    }
  });
}

function closeTrailer(e) {
  const trailerMovieWin = document.querySelector('iframe');
  console.dir(trailerMovieWin.attributes.src.value);
  if (e.target.closest('.closebtn') || e.target.closest('.overlay-backdrop')) {
    document.getElementById('myNav').style.width = '0%';
    trailerMovieWin.attributes.src.value = '';
  }
}

function showVideo() {
  const movieTreilerClass = document.querySelectorAll('.movieTreiler');
  totalVideo = movieTreilerClass.length;
  movieTreilerClass.forEach((el, idx) => {
    if (activeTrailer === idx) {
      el.classList.add('show');
      el.classList.remove('hide');
    } else {
      el.classList.add('hide');
      el.classList.remove('show');
    }
  });
}
