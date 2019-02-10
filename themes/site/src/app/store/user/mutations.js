import { get } from 'lodash-es';
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
        // parse our keyboard configs. we're deliberately not making this
        // jsonable on the backend to avoid auto camel casing and losing
        // case sensitivity
        user.keyboardConfigs = user.keyboardConfigs.map(obj => ({ ...obj, config: JSON.parse(obj.config) }));

        state.user = user;
    },

    // update a user's keyboard config
    updateKeyboardConfig(state, keyboardConfig) {
        state.user.keyboardConfigs = get(state, 'user.keyboardConfigs', [])
            .filter(obj => obj.id !== keyboardConfig.id)
            .concat(keyboardConfig);
    },
};
