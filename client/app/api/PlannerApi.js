import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:8000"
})

export function helloWorld(setPlanData) {
    let res = api.get('/');
    return res;
}

export function getPlans(setPlanData) {
    let promise = api.get('/plans');
    const dataPromise = promise.then((response) => response.data)
    return dataPromise;
}

export function createPlan(planId) {
    let promise = api.put('/createPlan', {'planId': planId});
    const dataPromise = promise.then((response) => response.data)
    return dataPromise;
}