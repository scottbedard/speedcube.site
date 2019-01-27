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
        setUser: 'user',
    }),

    // remove a user's avatar
    removeAvatar(state) {
        state.user.avatar = null;
    },
};
