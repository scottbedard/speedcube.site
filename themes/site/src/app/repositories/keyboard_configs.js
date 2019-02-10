import axios from 'axios';

// create or update a keyboard config
export function postKeyboardConfig({ config, puzzle }) {
    return axios.post('/api/speedcube/speedcube/keyboardconfig', { config, puzzle });
}
