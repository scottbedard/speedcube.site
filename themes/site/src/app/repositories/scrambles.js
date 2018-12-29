import axios from 'axios';

// create a scramble for a puzzle
export function postCreateScramble(puzzle) {
    return axios.post('/api/speedcube/speedcube/scrambles', { puzzle });
}
