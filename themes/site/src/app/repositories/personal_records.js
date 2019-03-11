import axios from 'axios';
import { get } from 'axios';

// get personal records
export function getPersonalRecords(params = {}) {
    return axios.get('/api/speedcube/speedcube/records', { params });
}
