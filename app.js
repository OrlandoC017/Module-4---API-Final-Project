// https://www.omdbapi.com/?i=tt3896198&apikey=2d9420f2&s={search word}
const moviesListEl = document.querySelector(".movie-list");

async function onSearchChange(event) {
    const searchTerm = document.querySelector('.input').value;
    const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=2d9420f2&s=${searchTerm}`)
    const moviesData = await movies.json();
    const movie = event.target.value
    console.log(searchTerm)

    if (movie.Poster === "N/A") {
        movie.Poster = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
    }

    moviesListEl.innerHTML = moviesData.Search.map((movie) =>
         `<div class="movie__profile">
            <figure class="movie__poster--wrapper">
                <img src="${movie.Poster}" alt="" class="movie__poster--img">
            </figure>
            <h2 class="movie__title">${movie.Title}</h2>
            <h3 class="movie__year">Theatrical Release: ${movie.Year}</h3>
            <h3 class="movie__type">${movie.Type}</h3>
            <form action="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">
                <input class ="movie__imdb click"  type="submit" value="IMDB" />
            </form>
        </div>`
    ).join('')
    
}