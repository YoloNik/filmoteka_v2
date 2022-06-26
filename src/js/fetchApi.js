class fetchAPI {
  BASE_URL = 'https://api.themoviedb.org/3';
  API_KEY = `87f9885ae1efa5e26738121aab64796c`;
  YOUTUBE_KEY = 'AIzaSyAqwBPstw0ee4duUd71wGhCECpWChRe6Rs';
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPages = null;
    this.totalResults = null;
    this.genres = {};
    this.movieId = '';
    this.movieName = '';
    this.movieTreilerId = '';
  }

  async getTrendMovies() {
    let URLQuery = this.searchQuery
      ? `${this.BASE_URL}/search/movie?api_key=${
          this.API_KEY
        }&language=en-US&page=${
          this.page
        }&include_adult=false&query=${encodeURIComponent(this.searchQuery)}`
      : `${this.BASE_URL}/trending/movie/week?api_key=${this.API_KEY}&page=${this.page}`;

    return await fetch(URLQuery)
      .then(response => {
        if (response.status === 404) throw new Error();

        return response.json();
      })
      .then(data => {
        this.totalPages = data.total_pages;
        this.totalResults = data.total_results;

        return data;
      })
      .catch(error => console.log(error));
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get numOfPageGet() {
    this.page;
  }
  set numOfPageSet(newPage) {
    this.page = newPage;
  }

  getGenres() {
    return fetch(`${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}`)
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        return Promise.reject(new Error('Error'));
      })
      .then(data => {
        const normaGenres = data.genres.reduce((acc, { id, name }) => {
          return { ...acc, [id]: name };
        }, {});
        this.genres = normaGenres;
        return normaGenres;
      })
      .catch(error => console.log(error));
  }
  get genresValue() {
    return this.genres;
  }
  getSingleMovie() {
    return fetch(
      `${this.BASE_URL}/movie/${this.movieId}?api_key=${this.API_KEY}`
    )
      .then(response => {
        if (response.status === 404) throw new Error();

        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => console.log(error));
  }
  getMovieTreiler() {
    return fetch(
      `${this.BASE_URL}/movie/${this.movieId}/videos?api_key=${this.API_KEY}`
    )
      .then(response => {
        if (response.status === 404) throw new Error();

        return response.json();
      })
      .then(data => {
        this.movieId = data.id;
        return data;
      })
      .catch(error => console.log(error));
  }
}

const apiService = new fetchAPI();
export default apiService;
