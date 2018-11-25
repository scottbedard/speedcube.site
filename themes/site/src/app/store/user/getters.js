import { isUndefined } from 'lodash-es';

//
// getters
//
export default {
    // default puzzle configuration
    defaultConfig(state) {
        const coreConfig = {
            colors: [
                '#ffeb3b', // U -> yellow
                '#ff9800', // L -> orange
                '#03a9f4', // F -> blue
                '#f44336', // R -> red
                '#4caf50', // B -> green
                '#eeeeee', // D -> white
            ],
            stickerElevation: 0.03,
            stickerInnerOpacity: 0.3,
            stickerRadius: 0.1,
            stickerScale: 0.9,
            turnDuration: 100,
        };

        let defaultConfig = {};

        // find the default config if the user has one        
        if (!isUndefined(state.user.configs)) {
            const config = state.user.configs.find(cfg => cfg.puzzle === 'default');

            if (config) {
                defaultConfig = config.config;
            }
        }

        // spread the user's default config over the core config
        return { ...coreConfig, ...defaultConfig };
    },

    // determine if the user is authenticated
    isAuthenticated(state) {
        return !isUndefined(state.user.id);
    },

    // configuration for a specific puzzle
    puzzleConfig(state, getters) {
        const { defaultConfig } = getters;

        return (puzzle) => {
            let puzzleConfig = {};

            if (!isUndefined(state.user.configs)) {
                const config = state.user.configs.find(cfg => cfg.puzzle === puzzle);

                if (config) {
                    puzzleConfig = config.config;
                }
            }

            return { ...defaultConfig, ...puzzleConfig };
        }
    },
};
