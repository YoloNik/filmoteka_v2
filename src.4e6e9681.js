parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"nMoD":[function(require,module,exports) {
"use strict";function e(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;class t{constructor(){e(this,"BASE_URL","https://api.themoviedb.org/3"),e(this,"API_KEY","87f9885ae1efa5e26738121aab64796c"),this.searchQuery="",this.page=1,this.genres={},this.movieId=""}async getTrendMovies(){let e=this.searchQuery?`${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${encodeURIComponent(this.searchQuery)}`:`${this.BASE_URL}/trending/movie/week?api_key=${this.API_KEY}&page=${this.page}`;return await fetch(e).then(e=>{if(404===e.status)throw new Error;return e.json()}).then(e=>e).catch(e=>console.log(e))}get query(){return this.searchQuery}set query(e){this.searchQuery=e}async getGenres(){return await fetch(`${this.BASE_URL}/genre/movie/list?api_key=${this.API_KEY}`).then(e=>e.ok?e.json():Promise.reject(new Error("Error"))).then(e=>{const t=e.genres.reduce((e,{id:t,name:r})=>({...e,[t]:r}),{});return this.genres=t,t}).catch(e=>console.log(e))}get genresValue(){return this.genres}async getSingleMovie(){return await fetch(`${this.BASE_URL}/movie/${this.movieId}?api_key=${this.API_KEY}`).then(e=>{if(404===e.status)throw new Error;return e.json()}).then(e=>e).catch(e=>console.log(e))}}const r=new t;var s=r;exports.default=s;
},{}],"hrl4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i,exports.createCards=n;var e=t(require("./fetchApi"));function t(e){return e&&e.__esModule?e:{default:e}}const r=document.querySelector(".gallery"),s=document.querySelector(".search__error");function i(){s.style.visibility="hidden",e.default.getGenres(),e.default.getTrendMovies().then(t=>{const i=e.default.genresValue,a=t.results.map(e=>e.genre_ids.map(e=>{if(i[e])return i[e]}).join(", "));0===t.total_results?(r.innerHTML="",s.style.visibility="visible"):r.innerHTML=n(t.results,a)})}function n(e,t){return e.map((e,r)=>{return document.createElement("div").innerHTML=`<div class="movie-card">\n<img src="${e.poster_path?"https://image.tmdb.org/t/p/w500"+e.poster_path:"https://expresspost.in///website/images/reporter_image/default.png"}" data-id="${e.id}" alt="There should be a poster 😮">\n  <div class="movie-card__title">\n\t\t<span>${e.title}</span>\n\t<div class="movie-card__info-item">\n\t\t<span>${t[r]} | ${e.release_date.substr(0,4)}</span>\n\t</div>\n  </div>\n</div>`}).join("")}
},{"./fetchApi":"nMoD"}],"KQvi":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var t=e(require("./fetchApi"));function e(t){return t&&t.__esModule?t:{default:t}}const l=document.querySelector(".output-js");async function a(){return await t.default.getSingleMovie().then(t=>{const e=t.genres.map(t=>t.name).join(", ");i(t,e)})}function i(t,e){return l.innerHTML=`<img class="modal-content__img"\n\t\t\tsrc="${t.poster_path?"https://image.tmdb.org/t/p/w500"+t.poster_path:"https://expresspost.in///website/images/reporter_image/default.png"}" alt="${t.original_title}" />\n    <div class="wrap">\n      <h2 class="modal-content__title">${t.original_title}</h2>\n      <div class="info-wrap modal-content__info-wrap">\n        <ul class="category-list">\n          <li class="category-list__item">Vote / Votes</li>\n          <li class="category-list__item">Popularity</li>\n          <li class="category-list__item">Original Title</li>\n          <li class="category-list__item">Genre</li>\n        </ul>\n        <ul class="category-value-list modal-content__category-value-list">\n          <li class="category-value-list__item">\n\t\t\t\t\t\t<p class="category-value-list__item_bg-color">${t.vote_average} </p>\n\t\t\t\t\t\t<p class="category-value-list__item_font-color"> / ${t.vote_count} </p> </li>\n          <li class="category-value-list__item">${t.popularity}</li>\n          <li class="category-value-list__item">${t.title}</li>\n          <li class="category-value-list__item">${e}</li>\n        </ul>\n      </div>\n\t\t\t   <h3 class="modal-content__subtitle">About</h3>\n      <p class="modal-content__description">${t.overview}</p>\n      <div class="btn-wrap content__btn-wrap">\n          <button class="btn-wrap__btn active" data-action="watched">add to Watched</button>\n          <button class="btn-wrap__btn " data-action="queue">add to Queue</button>\n        </div>\n    `}
},{"./fetchApi":"nMoD"}],"yGjV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=a;var e=t(require("./fetchApi"));function t(e){return e&&e.__esModule?e:{default:e}}function a(){let t=[],a=[];localStorage.getItem("watched")&&(t=JSON.parse(localStorage.getItem("watched"))),localStorage.getItem("queue")&&(a=JSON.parse(localStorage.getItem("queue"))),window.addEventListener("click",function(o){e.default.getSingleMovie().then(e=>{if(o.target.closest('[data-action="watched"]')){const a=t.find(t=>t.id===e.id);a||(t.push(e),localStorage.setItem("watched",JSON.stringify(t)))}if(o.target.closest('[data-action="queue"]')){const t=a.find(t=>t.id===e.id);t||(a.push(e),localStorage.setItem("queue",JSON.stringify(a)))}})})}
},{"./fetchApi":"nMoD"}],"Focm":[function(require,module,exports) {
"use strict";var e=a(require("./js/fetchApi")),t=a(require("./js/markup-movie-card")),r=a(require("./js/markup-modal")),n=a(require("./js/local-storage"));function a(e){return e&&e.__esModule?e:{default:e}}const d=document.getElementById("search__form"),o=document.querySelector(".header__home-btn"),l=document.querySelector(".header__library-btn"),c=document.getElementById("gallery"),u=document.querySelector(".movie-card"),s=document.querySelector(".backdrop-modal");function i(r){r.target.closest("button")&&(r.preventDefault(),e.default.query=r.currentTarget.elements[0].value,(0,t.default)())}function m(t){if(window.addEventListener("keydown",f),t.target.closest(".movie-card")){let a=t.target.dataset.id;e.default.movieId=a,(0,r.default)(),s.style.display="block",(0,n.default)()}}function y(e){(e.target.closest(".modal-content__close-btn")||"backdrop-modal"===e.target.className)&&(s.style.display="none")}function f(e){"Escape"===e.code&&(s.style.display="none",window.removeEventListener("keydown",f))}s.addEventListener("click",y),c.addEventListener("click",m),d.addEventListener("click",i),(0,t.default)();
},{"./js/fetchApi":"nMoD","./js/markup-movie-card":"hrl4","./js/markup-modal":"KQvi","./js/local-storage":"yGjV"}]},{},["Focm"], null)
//# sourceMappingURL=/filmoteka_v2/src.4e6e9681.js.map