import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://damp-beyond-66324.herokuapp.com/api/moment'
});

export default instance;