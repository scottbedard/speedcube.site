import axios from 'axios';

// get solve
export function getSolve(id) {
    return axios.get(`/api/speedcube/speedcube/solves/${id}`);
}

// get solves
export function getSolves(params = {}) {
    return axios.get('/api/speedcube/speedcube/solves', { params });
}

// create a new solve
export function postCreateSolve(payload) {
    return axios.post('/api/speedcube/speedcube/solves', payload);
}
