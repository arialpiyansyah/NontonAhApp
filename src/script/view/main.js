import "../component/search-bar.js";
import "../component/search-result.js";
import "../component/trending-movie.js";
import axios from "axios";
import { async } from "regenerator-runtime";

const main = () => {
  const api_key = "ae62837e09b109890a932989d57f1f1b";
  const image_path = "https://image.tmdb.org/t/p/w500";

  // Trending Movies
  const trendingMovieElement = document.querySelector("trending-movie");
  const shadowTrendingMovieElement = trendingMovieElement.shadowRoot;

  const getTrendingMovies = async () => {
    const response =
      await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}
    `);
    shadowTrendingMovieElement.children[1].innerHTML = `<h2>Lagi Trending Nih!</h2>`;
    shadowTrendingMovieElement.lastElementChild.innerHTML =
      response.data.results
        .map((e) => {
          return `
      <div class="card" id="${e.id}">
              <div class="poster">
                <img
                  src="${image_path + e.poster_path}"
                />
              </div>
              <div class="info">
                <div class="movie-title">
                  <h2>${e.title}</h2>
                </div>
                <div class="movie-detail">
                  <p>⭐ ${e.vote_average}/10</p>
                  <p>${e.release_date}</p>
                </div>
              </div>
          </div>
          `;
        })
        .join("");
    const movieCards = shadowTrendingMovieElement.querySelectorAll(".card");
    onCardClicked(movieCards);
  };
  getTrendingMovies();

  // Search Movies
  const searchElement = document.querySelector("search-bar");
  const searchMovieElement = document.querySelector("search-result");
  const shadowSearchMovieElement = searchMovieElement.shadowRoot;

  const getMovieBySearch = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchElement.value}`
    );
    if (response.data.results[0]) {
      shadowSearchMovieElement.children[1].innerHTML = `<h2>Hasil Pencarian ${searchElement.value}...</h2>`;
      shadowSearchMovieElement.lastElementChild.innerHTML =
        response.data.results
          .map((e) => {
            return `
        <div class="card" id="${e.id}">
              <div class="poster">
                <img
                  src="${image_path + e.poster_path}"
                />
              </div>
              <div class="info">
                <div class="movie-title">
                  <h2>${e.title}</h2>
                </div>
                <div class="movie-detail">
                  <p>⭐ ${e.vote_average}/10</p>
                  <p>${e.release_date}</p>
                </div>
              </div>
          </div>
          `;
          })
          .join("");
      const movieCards = shadowSearchMovieElement.querySelectorAll(".card");
      onCardClicked(movieCards);
    } else {
      shadowSearchMovieElement.children[1].innerHTML = `<h2>Maaf ${searchElement.value} Tidak Ditemukan...</h2>`;
      shadowSearchMovieElement.lastElementChild.innerHTML =
        "<p>Coba Kata Kunci Yang Lain!</p>";
    }
  };
  searchElement.clickEvent = getMovieBySearch;

  // Show Pop-up
  const popupContainer = document.querySelector(".popup-container");

  const onCardClicked = (movieCards) => {
    movieCards.forEach((card) => {
      card.addEventListener("click", () => {
        popupContainer.classList.add("show-popup");
        showPopup(card);
      });
    });
  };

  const showPopup = async (card) => {
    const movieId = card.getAttribute("id");
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`
    );

    popupContainer.innerHTML = `
        <div class="close-btn">&#10006</div>
        <div class="popup-poster">
          <img src="${image_path + response.data.poster_path}">
        </div>
        <div class="popup-content">
          <div class="popup-movies-info">
            <h1>${response.data.title}</h1>
            <p><strong>Rating:</strong> ⭐ ${response.data.vote_average}/10</p>
          </div>
          <div class="popup-movies-genres">
            ${response.data.genres.map((e) => `<p>${e.name}</p>`).join("")}
          </div>
          <p><strong>Release Date:</strong> ${response.data.release_date}</p>
          <p><strong>Language:</strong>  ${
            response.data.spoken_languages[0].name
          }</p>
          <p><strong>Duration:</strong>  ${response.data.runtime} min</p>
          <p><strong>Overview:</strong>  ${response.data.overview}</p>
        </div>`;

    const closeButton = document.querySelector(".close-btn");
    closeButton.addEventListener("click", () =>
      popupContainer.classList.remove("show-popup")
    );
  };
};
export default main;
