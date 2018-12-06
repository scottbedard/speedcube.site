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
        setSigninIsLoading: 'signinIsLoading',
        setSignoutIsLoading: 'signoutIsLoading',
        setUser: 'user',
    }),
};
