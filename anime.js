const url_api = "https://api.jikan.moe/v3"

function cariFilm(event) {

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    console.log(query);

    fetch(`${url_api}/search/anime?q=${query}&page=1`)
    .then(res=>{
       console.log(res);
       return res.json()
    })
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data) {

    const searchResults = document.getElementById('search_results');

    searchResults.innerHTML = data.results
    .sort((a,b)=>a.episodes-b.episodes)
    .map(anime => {
        return `
        <div class="col s12 m7">
              <div class="card">
                <div class="card-image">
                  <img src="${anime.image_url}">
                  <span class="card-title">${anime.title}</span>
                </div>
                <div class="card-content">
                  <p>${anime.synopsis}</p>
                </div>
                <div class="card-action">
                  <a href="${anime.url}">Selengkapnya...</a>
                </div>
              </div>
            </div>`;
    })
}

function loadPage() {
    const form = document.getElementById('search_form');
    form.addEventListener("submit", cariFilm);
}


window.addEventListener("load", loadPage);