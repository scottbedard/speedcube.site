import { simpleSetters } from 'spyfu-vuex-helpers';

//
// mutations
//
export default {
    ...simpleSetters({
        setConfig: 'config',
        setConfigColors: 'config.colors',
        setConfigStickerElevation: 'config.stickerElevation',
        setConfigStickerInnerOpacity: 'config.stickerInnerOpacity',
        setConfigStickerRadius: 'config.stickerRadius',
        setConfigStickerScale: 'config.stickerScale',
        setConfigs: 'user.configs',
        setConfigsAreLoading: 'configsAreLoading',
        setSigninIsLoading: 'signinIsLoading',
        setSignoutIsLoading: 'signoutIsLoading',
    }),

    // remove a user's avatar
    removeAvatar(state) {
        state.user.avatar = null;
    },

    // set the user
    setUser(state, user) {
        const { keyboardConfigs } = user;

        if (keyboardConfigs) {
            // parse our keyboard configs. we're deliberately not making this
            // jsonable on the backend to avoid auto camel casing and losing
            // case sensitivity
            user.keyboardConfigs = user.keyboardConfigs.map(obj => ({ ...obj, config: JSON.parse(obj.config) }));
        } else {
            user.keyboardConfigs = [];
        }

        state.user = user;
    },

    // update a user's keyboard config
    updateKeyboardConfig(state, keyboardConfig) {
        const { keyboardConfigs } = state.user;

        if (keyboardConfigs) {
            state.user.keyboardConfigs = keyboardConfigs
                .filter(obj => obj.id !== keyboardConfig.id)
                .concat(keyboardConfig);
        }
    },
};
