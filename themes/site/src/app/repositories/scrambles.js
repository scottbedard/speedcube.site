import axios from 'axios';

// create a scramble for a puzzle
export function postCreateScramble(cubeSize) {
    return axios.post('/api/speedcube/speedcube/scrambles', { cubeSize });
}
