// 1. dengan menggunakan async await

const button = document.querySelector('#search-button');
button.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('#search-input');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
});

// fungsi untuk mendapatkan data dari API
function getMovies(keyword) {
    return fetch(`http://omdbapi.com/?apikey=9bd9431f&s=${keyword}`)
        .then(response => response.json())
        .then(response => response.Search);
}

// fungsi untuk membersihkan tampilan
function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('#movie-container');
    movieContainer.innerHTML = cards;
}

// menggunakan event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        moviesDetail = await getMovieDetail(imdbid)
        updateUIDetail(moviesDetail)
    }
})

// fungsi untuk mengambil fetch movie detail
function getMovieDetail(imdbid) {
    return fetch(`http://omdbapi.com/?apikey=dca61bcc&i=${imdbid}`)
        .then(response => response.json())
        .then(m => m)
}

// update tampilan UI
function updateUIDetail(m) {
    const movieDetail = showDetails(m);
    const modalBody = document.querySelector('.modal-body')
    modalBody.innerHTML = movieDetail;
}

// fungsi untuk menampilkan card element
function showCards(m) {
    return `
        <div class="col-md-4">
            <div class="card mb-3">
                <img src="${m.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <button type="button" data-imdbid="${m.imdbID}" class=" detail-button btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Show Detail
                    </button>
                </div>
            </div>
        </div>
    `
}

// fungsi untuk mengambil detail movie
function showDetails(m) {
    return `
 <div class="container-fluid">
    <div class="row">
        <div class="col-md-4">
            <img src="` + m.Poster + `" class="img-fluid">
        </div>
        <div class="col-md-8">
            <ul class="list-group">
                <li class="list-group-item"><h3>` + m.Title + `</h3></li>
                <li class="list-group-item">Released : ` + m.Released + `</li>
                <li class="list-group-item">Genre : ` + m.Genre + `</li>                 
                <li class="list-group-item">Director : ` + m.Director + `</li>                 
                <li class="list-group-item">Director : ` + m.Actors + `</li>                 
                <li class="list-group-item">Director : ` + m.Plot + `</li>                 
            </ul>
        </div>
    </div>
</div>
    `
}