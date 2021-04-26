import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:8000"
});

export function helloWorld(setPlanData) {
    let res = api.get('/');
    return res;
}

//PLAN API CALLS
export function getPlans(setPlanData) {
    let promise = api.get('/plans');
    const dataPromise = promise.then((response) => response.data)
    return dataPromise;
}

export function createPlan(planId) {
    if (planId){
        let promise = api.post('/createPlan', {'planId': planId});
        const dataPromise = promise.then((response) => response.data);
        return dataPromise;
    } else {
        console.log("plan id must not be empty string");
        return ""
    }
}

export function deletePlan(planId) {
    let promise = api.delete('/plans?planId='+planId, {'planId': planId});
    const dataPromise = promise.then((response) => response.data)
    return dataPromise;
}

//TASK API CALLS
export function getTasks(planId) {
    let promise = api.get('/tasks?planId='+planId);
    const dataPromise = promise.then((response) => response.data)
    return dataPromise;
}

export function createTask(planId, task, subTasks) {
    let promise = api.put('/createTask?planId='+planId, {'task': task, 'subTasks':subTasks});
    const dataPromise = promise.then((response) => response.data)
    return dataPromise;
}