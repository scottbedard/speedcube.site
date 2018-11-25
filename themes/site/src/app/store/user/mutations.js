import { simpleSetters } from 'spyfu-vuex-helpers';

//
// mutations
//
export default {
    ...simpleSetters({
        setConfigColors: 'config.colors',
        setConfigStickerElevation: 'config.stickerElevation',
        setConfigStickerInnerOpacity: 'config.stickerInnerOpacity',
        setConfigStickerRadius: 'config.stickerRadius',
        setConfigStickerScale: 'config.stickerScale',
        setSigninIsLoading: 'signinIsLoading',
        setSignoutIsLoading: 'signoutIsLoading',
        setUser: 'user',
    }),
};
