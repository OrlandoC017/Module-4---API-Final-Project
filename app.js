// https://www.omdbapi.com/?i=tt3896198&apikey=2d9420f2&s={search word}


async function main() {
    const movies = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=2d9420f2&s=CARS")
    const moviesData = await movies.json();
    const moviesListEl = document.querySelector(".movie-list");

    moviesListEl.innerHTML = moviesData

    

    moviesData.map(
        (movie) => `<div class="movie__profile">
            <figure class="movie__poster--wrapper">
                <img src="${movie.Poster}" alt="" class="movie__poster--img">
            </figure>
            <h2 class="movie__title">${movie.Title}</h2>
            <h3 class="movie__year">Theatrical Release: ${movie.Year}</h3>
            <h3 class="movie__type">${movie.Type}</h3>
            <form action="https://www.imdb.com/title/${movie.imbdID}/" target="_blank">
                <input class ="movie__imdb click"  type="submit" value="IMDB" />
            </form>
        </div>`
    ).join('')
    
}

main();