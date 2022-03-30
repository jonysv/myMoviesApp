const BASE_API = "https://reqres.in/"
const BASE_API2 = "https://api.themoviedb.org/3/"
class Api {
    async login(u, p) {
        const resp = await fetch(`${BASE_API}api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: u, password: p})
        })
        const content = await resp.json();
        console.log(content);
        return content;
    }
    
    async movies() {
        const resp = await fetch(`${BASE_API2}movie/popular?api_key=e0beb74fda5c5a616995b8c44754aac4&language=es-ES&page=1`, {
            method: 'GET',
        })
        const content = await resp.json();
        return content;
    }

    async search(keyword) {
        const resp = await fetch(`${BASE_API2}search/movie?api_key=e0beb74fda5c5a616995b8c44754aac4&language=es-ES&page=1&include_adult=false&query=${keyword}`, {
            method: 'GET',
        })
        const content = await resp.json();
        return content;
    }

}
export default new Api();