import axios from 'axios';

// get a highlighted solve
export function getHighlightedSolve() {
    return axios.get('/api/speedcube/speedcube/solves/highlighted');
}

// get solve
export function getSolve(id) {
    return axios.get(`/api/speedcube/speedcube/solves/${id}`);
}

// get solves
export function getSolves(params = {}) {
    return axios.get('/api/speedcube/speedcube/solves', { params });
}

// post a replay watch
export function postReplay(id) {
    return axios.post(`/api/speedcube/speedcube/solves/replay/${id}`);
}

// post a solve
export function postSolve(payload) {
    return axios.post('/api/speedcube/speedcube/solves', payload);
}
