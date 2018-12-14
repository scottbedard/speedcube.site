import axios from 'axios';

// get solve
export function getSolve(id) {
    return axios.get(`/api/speedcube/speedcube/solves/${id}`);
}

// get solves
export function getSolves(params = {}) {
    return axios.get('/api/speedcube/speedcube/solves', { params });
}

// post a solve
export function postSolve(payload) {
    return axios.post('/api/speedcube/speedcube/solves', payload);
}
