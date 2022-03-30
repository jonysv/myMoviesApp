const BASE_API = "https://reqres.in/"

// import Store from './store.js'
class Api {
    async login(u, p) {
        console.log('calling');
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

}
export default new Api();