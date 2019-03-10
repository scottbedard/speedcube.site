import axios from 'axios';

// update a user's twitter profile
//
// payload
// - {boolean}  broadcasting
// - {string}   handle
export function postTwitter(payload) {
    return axios.post('/api/speedcube/speedcube/profile/twitter', payload);
}
