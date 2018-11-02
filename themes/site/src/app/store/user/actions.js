import { postSignin } from '@/app/repositories/user';

//
// actions
//
export default {
    signin({ commit }, payload) {
        commit('setSigninIsLoading', true);

        const request = postSignin(payload);

        request.then((response) => {
            // success
            console.log('hooray', response.data);
        }, (err) => {
            // failure
            console.error('crap', err);
        }).finally(() => {
            // complete
            commit('setSigninIsLoading', false);
        });

        return request;
    },
};
