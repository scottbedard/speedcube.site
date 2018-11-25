import axios from 'axios';

// fetch configs for the authenticated user
export function getConfigs() {
    return axios.get('/api/speedcube/speedcube/config');
}

// save a configuration
export function postConfig(key, config) {
    return axios.post('/api/speedcube/speedcube/config', { key, config });
}
