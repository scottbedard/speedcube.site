import {
    getAuthenticatedUser,
    getSignout,
    postResetPassword,
    postSendResetEmail,
    postSignin,
    postUser,
} from '@/app/repositories/user';

import {
    getConfigs,
    postConfig,
} from '@/app/repositories/config';

//
// actions
//
export default {
    // refresh the current user
    fresh({ commit }) {
        commit('setFreshIsLoading', true);

        const request = getAuthenticatedUser();

        request.then((response) => {
            // success
            commit('setUser', response.data.user);
        }).finally(() => {
            // complete
            commit('setFreshIsLoading', false);
        });

        return request;
    },

    // save a user's puzzle configuration
    saveConfig({ commit }, payload) {
        const request = postConfig(payload);

        request.then((response) => {
            // success
            commit('setConfigs', response.data.configs);
        });

        return request;
    },

    // reset a user's password
    resetPassword(context, { code, password }) {
        return postResetPassword({ code, password });
    },

    // authenticate a user
    signin({ commit, dispatch }, payload) {
        commit('setSigninIsLoading', true);

        const authRequest = postSignin(payload);

        authRequest.then((response) => {
            // success
            commit('setUser', response.data);

            return Promise.all([
                dispatch('syncConfigs'),
            ]);
        }).finally(() => {
            // complete
            commit('setSigninIsLoading', false);
        });

        return authRequest;
    },

    // sign a user out
    signout({ commit }) {
        commit('setSignoutIsLoading', true);

        const request = getSignout();

        request.then(() => {
            // success
            commit('setUser', {});
        }).finally(() => {
            // complete
            commit('setSignoutIsLoading', false);
        });

        return request;
    },

    // send a user a password reset link
    sendPasswordResetEmail(context, email) {
        return postSendResetEmail({ email });
    },

    // sync a user's configs
    syncConfigs({ commit }) {
        const request = getConfigs();

        commit('setConfigsAreLoading', true);

        request.then((response) => {
            // success
            commit('setConfigs', response.data.configs);
        }).finally(() => {
            // complete
            commit('setConfigsAreLoading', false);
        });

        return request;
    },

    // update a user
    update({ commit }, payload) {
        const request = postUser(payload);

        request.then((response) => {
            // success
            commit('setUser', response.data);
        });

        return request;
    },
};
