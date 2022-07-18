const API_KEY="74f93e7781dc08e6c879b7393a26a388";
const BASE_PATH="https://api.themoviedb.org/3";

export  function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response)=>response.json()
    )
}