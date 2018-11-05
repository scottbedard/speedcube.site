import axios from 'axios';

/**
 * Sign a user out.
 *
 * @return {Promise}
 */
export function getSignout() {
    return axios.get('/api/givingteam/auth/signout');
}

/**
 * Register a user.
 *
 * @param  {object} payload
 *         - {string}   name
 *         - {string}   email
 *         - {string}   password
 *         - {string}   password_confirmation
 * @return {Promise}
 */
export function postRegister(payload) {
    return axios.post('/api/givingteam/auth/register', payload);
}

/**
 * Authenticate a user.
 *
 * @param  {object} payload
 *         - {string}    login
 *         - {string}    password
 *         - {boolean}   remember
 * @return {Promise}
 */
export function postSignin(payload) {
    return axios.post('/api/givingteam/auth/signin', payload);
}
