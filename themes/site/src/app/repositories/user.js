import axios from 'axios';

/**
 * Delete a user's profile photo.
 *
 * @return {Promise}
 */
export function deleteAvatar() {
    return axios.delete('/api/rainlab/user/user/avatar');
}

/**
 * Get the authenticated user.
 *
 * @return {Promise}
 */
export function getAuthenticatedUser() {
    return axios.get('/api/rainlab/user/user');
}

/**
 * Get a user's stats overview.
 *
 * @param  {string}     username
 * @param  {number}     days
 * @return {Promise}
 */
export function getOverview(username, days = 30) {
    return axios.get(`/api/speedcube/speedcube/users/${username}/overview?days=${days}`);
}

/**
 * Sign a user out.
 *
 * @return {Promise}
 */
export function getSignout() {
    return axios.get('/api/rainlab/user/signout');
}

/**
 * Get users.
 *
 * @param  {Object}     params
 * @return {Promise}
 */
export function getUsers(params = {}) {
    return axios.get('/api/speedcube/speedcube/users', { params });
}

/**
 * Upload a profile photo.
 *
 * @param  {Object}     avatar
 * @return {Promise}
 */
export function postProfilePhoto(avatar) {
    const data = new FormData();

    data.append('avatar', avatar);

    return axios.post('/api/rainlab/user/user', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

/**
 * Register a user.
 *
 * @param  {object}     payload
 *         - {string}   name
 *         - {string}   email
 *         - {string}   password
 *         - {string}   password_confirmation
 * @return {Promise}
 */
export function postRegister(payload) {
    return axios.post('/api/rainlab/user/register', payload);
}

/**
 * Reset a user's password.
 *
 * @param  {Object}     payload
 *         - {string}   code
 *         - {string}   password
 * @return {Promise}
 */
export function postResetPassword(payload) {
    return axios.post('/api/rainlab/user/reset-password', payload);
}

/**
 * Submit a password reset request.
 *
 * @param  {Object}     payload
 * @return {Promise}
 */
export function postSendResetEmail(payload) {
    return axios.post('/api/rainlab/user/send-reset-email', payload);
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
    return axios.post('/api/rainlab/user/signin', payload);
}

/**
 * Update a user.
 *
 * @param  {object} payload
 *         - {string?}  name
 *         - {string?}  email
 *         - {string?}  password
 *         - {string?}  password_confirmation
 * @return {Promise}
 */
export function postUser(payload) {
    return axios.post('/api/rainlab/user/user', payload);
}
