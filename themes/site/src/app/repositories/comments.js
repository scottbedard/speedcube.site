import axios from 'axios';

// fetch comments
export function getComments(type, id) {
    return axios.get(`/api/speedcube/speedcube/comments/${type}/${id}`);
}

// create a comment
export function postComment(payload) {
    return axios.post('/api/speedcube/speedcube/comments', payload);
}
