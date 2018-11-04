import { simpleSetters } from 'spyfu-vuex-helpers';

//
// mutations
//
export default {
    ...simpleSetters({
        setSigninIsLoading: 'signinIsLoading',
        setUser: 'user',
    }),
};
