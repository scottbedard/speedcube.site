import axios from 'axios';

// fetch configs for the authenticated user
export function getConfigs() {
    return axios.get('/api/speedcube/speedcube/config');
}

// save a configuration
export function postConfig(payload) {
    return axios.post('/api/speedcube/speedcube/config', payload);
}
