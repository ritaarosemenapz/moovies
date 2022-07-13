function saveToWatchList() {
  let watchList = [];
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
    button.addEventListener("click", event => {
      watchList.push(event.target.value);
      localStorage.setItem("Watchlist", JSON.stringify(watchList));
      console.log(watchList);
    });
  });
}

function getTrending() {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=4023134480e7ff0b27cee6e5b3c0ffd3"
  )
    .then(res => res.json())
    .then(data => {
      const searchResults = data.results;
      const movieContainer = document.getElementById("movie-container");

      let randomMovie = Math.floor(Math.random() * searchResults.length);
      const featuredSection = document.getElementById("featured");
      document.getElementById(
        "header"
      ).style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${searchResults[randomMovie].backdrop_path})`;
      featuredSection.innerHTML = `
      <div>
      <h2>${searchResults[randomMovie].title}</h2>
      </div>
      <span class="imdb-logo-container-featured">
      <img class="imdb-logo" src="https://cdn-icons-png.flaticon.com/512/5977/5977585.png"/>
      <p>${searchResults[randomMovie].vote_average.toFixed(2)} / 10</p>
      </span>
      </div>
      <p class="featured-overview">${searchResults[randomMovie].overview}</p>
      <div>
      <button value="${
        searchResults[randomMovie].id
      }" class="btn"><span class="material-symbols-outlined icon">
      add_circle
      </span>Watch Later</button>
      </div>
      </div>

      `;

      for (let movies of searchResults) {
        popularity = movies.popularity.toFixed(2);
        voteAverage = movies.vote_average.toFixed(2);
        voteCount = movies.vote_count;
        releaseDate = new Date(movies.release_date).toLocaleDateString();

        movieContainer.innerHTML += `
        <div class="movie-item">
        <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${movies.poster_path}" />
        <span><p class="release-date">Release: ${releaseDate}</p></span>
        <span class="movie-title"><h3>${movies.title}</h3></span>
        <div class="movie-stats">
        <span class="imdb-logo-container">
        <img class="imdb-logo" src="https://cdn-icons-png.flaticon.com/512/5977/5977585.png"/>
        <p>${movies.vote_average} / 10</p>
        </span>
        </div>
        <div>
        <button value="${movies.id}" class="btn"><span class="material-symbols-outlined icon">
        add_circle
        </span>Watch Later</button>
        </div>
        </div>
        `;

        saveToWatchList();
      }
    });
}

getTrending();

// * WATCHLIST //

function getWatchList() {
  const watchListContainer = document.getElementById("watchlist-container");
  const savedWatchList = JSON.parse(localStorage.getItem("Watchlist"));

  if (saveToWatchList.length === 0) {
    const header = document.getElementById("header");
    const emptyWatchListBanner = document.getElementById("empty-watchlist-banner")
    header.style.display = "none";
    emptyWatchListBanner.style.height = "100vh"
    emptyWatchListBanner.style.background = "url(https://media2.giphy.com/media/g01ZnwAUvutuK8GIQn/giphy.gif?cid=ecf05e47ipzjxq2k3a44mgfeubstqx10rblc8t63z1e20hix&rid=giphy.gif) no-repeat"
    emptyWatchListBanner.style.backgroundSize = "cover"
    emptyWatchListBanner.style.display = "block"
    emptyWatchListBanner.innerHTML = `
    <div class="empty-watchlist-content">
    <button class="btn">Go back</button>
    <h2>Your watchlist is empty :( Try adding some movies</h2>
    </div>
    `
  }

  for (let movies of savedWatchList) {
    fetch(
      `https://api.themoviedb.org/3/movie/${movies}?api_key=4023134480e7ff0b27cee6e5b3c0ffd3&language=en-US`
    )
      .then(response => response.json())
      .then(movies => {
        if (movies.success !== false) {
          watchListContainer.innerHTML += `
          <div>
          <img class="movie-poster" src="https://image.tmdb.org/t/p/original/${movies.poster_path}" />
          </div>
          <div id="${movies.id}" class="watchlist-item">
          <div>
          <span class="movie-title"><h2>${movies.title}</h2></span>
          <span>${movies.production_countries[0].iso_3166_1} / ${movies.release_date} / ${movies.runtime}min</span>
          <span class="imdb-logo-container-watchlist">
          <img class="imdb-logo" src="https://cdn-icons-png.flaticon.com/512/5977/5977585.png"/>
          <span class="vote-average">${movies.vote_average}</span>
          </span>
          <span>
          <h3>Overview</h3>
          ${movies.overview}
          </span>
          <div>
          <span class="providers-grid"> 
          <img src="https://cdn-icons-png.flaticon.com/512/5977/5977590.png"/>
          </span>
          </div>
          <button class="btn btn-remove" value="${movies.id}"><i class="fa-solid fa-circle-minus icon"></i>Remove</button>
          </div>
          </div>
          `;

          deleteFromWatchList();
        }
      });
  }
}
getWatchList();

function deleteFromWatchList() {
  const watchListContainer = document.getElementById("watchlist-container");
  const savedWatchList = JSON.parse(localStorage.getItem("Watchlist"));
  document.querySelectorAll("DIV").forEach(movieItem => {
    movieItem.addEventListener("click", event => {
      if (
        event.target.tagName === "BUTTON" &&
        event.target.value === movieItem.id
      ) {
        let newWatchList = savedWatchList.filter(
          item => item !== event.target.value
        );
        localStorage.setItem("Watchlist", JSON.stringify(newWatchList));
        watchListContainer.removeChild(movieItem);
      }
    });
  });
}
