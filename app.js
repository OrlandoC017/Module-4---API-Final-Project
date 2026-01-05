// https://www.omdbapi.com/?i=tt3896198&apikey=2d9420f2&s={search word}
const moviesListEl = document.querySelector(".movie-list");

async function onSearchChange() {
    const searchTerm = document.querySelector('.input').value;
    
    if (!searchTerm) {
        moviesListEl.innterHTML = '';
        return;
    }

    const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=2d9420f2&s=${searchTerm}`)
    const moviesData = await movies.json();
    
    const sortValue = document.querySelector('.filter__sort')?.value || '';

    if (moviesData.Search && Array.isArray(moviesData.Search)) {
        if (sortValue === 'NEWEST_FIRST') {
            moviesData.Search.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        } else if (sortValue === 'OLDEST_FIRST') {
            moviesData.Search.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        } else if (sortValue === 'A_Z') {
            moviesData.Search.sort((a, b) => a.Title.localeCompare(b.Title));
        } else if (sortValue === 'Z_A') {
            moviesData.Search.sort((a, b) => b.Title.localeCompare(a.Title));
        }
    }




    if (moviesData.Search) {
        moviesListEl.innerHTML = moviesData.Search.map((movie) => {
            const posterUrl = movie.Poster === "N/A"
            ? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
            : movie.Poster;

            const typeCapitalized = movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1); 

            return `<div class="movie__profile">
            <figure class="movie__poster--wrapper">
                <img src="${posterUrl}" alt="" onerror="this.onerror = null; this.src = '${posterUrl}'" class="movie__poster--img">
            </figure>
            <h2 class="movie__title">${movie.Title}</h2>
            <h3 class="movie__year">Theatrical Release: ${movie.Year}</h3>
            <h3 class="movie__type">Media: ${typeCapitalized}</h3>
            <form action="https://www.imdb.com/title/${movie.imdbID}/" target="_blank">
                <input class ="movie__imdb click"  type="submit" value="IMDB" />
            </form>
        </div>`
    }).join('')
    } else {
        moviesListEl.innerHTML = `<img src="https://cdn.dribbble.com/userupload/2905341/file/original-e40e0ef8b2d32a9aaf5fcf21679966b4.png?resize=1024x768&vertical=center" alt="No Results Found" class="no__results--img"/>`
    }

       
}


function filterMedia(event) {
    onSearchChange();

}
