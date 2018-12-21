import axios from 'axios';

/**
 * Delete a user's profile photo.
 * 
 * @return {Promise}
 */
export function deleteAvatar() {
    return axios.delete('/api/givingteam/auth/user/avatar');
}

/**
 * Sign a user out.
 *
 * @return {Promise}
 */
export function getSignout() {
    return axios.get('/api/givingteam/auth/signout');
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

    return axios.post('/api/givingteam/auth/user', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
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
    return axios.post('/api/givingteam/auth/user', payload);
}
