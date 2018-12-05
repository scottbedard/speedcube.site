import axios from 'axios';

// create a new solve
export function postCreateSolve(payload) {
    return axios.post('/api/speedcube/speedcube/solves', payload);
}
