const movieContainer = document.getElementById("movies");
const popup = document.getElementById("popup");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const description = document.getElementById("description");
const closeBtn = document.getElementById("close");
const search = document.getElementById("search");

let movies = [];

fetch("data/movies.json")
  .then(response => response.json())
  .then(data => {
    movies = data;
    displayMovies(movies);
  });

function displayMovies(movieList) {

  movieContainer.innerHTML = "";

  movieList.forEach(movie => {

    const card = document.createElement("div");
    card.className = "movie";

    card.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <h3>${movie.title}</h3>
    `;

    card.addEventListener("click", () => {
      poster.src = movie.image;
      title.innerText = movie.title;
      description.innerText = movie.description;
      popup.style.display = "flex";
    });

    movieContainer.appendChild(card);

  });

}

closeBtn.onclick = () => {
  popup.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == popup) {
    popup.style.display = "none";
  }
};

search.addEventListener("keyup", () => {

  const value = search.value.toLowerCase();

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(value)
  );

  displayMovies(filtered);

});