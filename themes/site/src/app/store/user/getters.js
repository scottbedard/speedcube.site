import { get, isUndefined } from 'lodash-es';
import { puzzles } from '@/app/constants';

//
// getters
//
export default {
    // determine if the user has an avatar
    hasAvatar(state, getters) {
        return getters.isAuthenticated && state.user.avatar !== null;
    },

    // determine if the user is authenticated
    isAuthenticated(state) {
        return !isUndefined(state.user.id);
    },

    // get the user's keyboard config for a given puzzle
    keyboardConfigForPuzzle(state, getters) {
        return (puzzle) => {
            const defaultKeyboardConfig = get(puzzles, `${puzzle}.defaultKeyboardConfig`, {});

            if (getters.isAuthenticated) {
                const userConfig = state.user.keyboardConfigs.find(config => config.puzzle === puzzle);

                if (userConfig) {
                    return { ...defaultKeyboardConfig, ...userConfig.config };
                }
            }

            return defaultKeyboardConfig;
        };
    },
};
