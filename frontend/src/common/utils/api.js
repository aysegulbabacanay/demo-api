import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

function getConfig() {

    let token = window.localStorage.getItem("token");

    return {
        headers: {
            'Authorization': token
        }
    }
}

export const checkAuth = () => {

    return axios
        .get('/users', getConfig());
}