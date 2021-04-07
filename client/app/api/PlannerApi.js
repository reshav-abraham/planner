import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:8000"
})

export default function helloWorld(setPlanData) {
    let res = api.get('/');
    return res;
}