import {
    simplePushers,
    simpleRemovers,
    simpleSetters,
} from 'spyfu-vuex-helpers';

//
// mutations
//
export default {
    ...simplePushers({
        addAlert: 'alerts',
    }),
    ...simpleRemovers({
        removeAlert: 'alerts',
    }),
    ...simpleSetters({
        setIsPaused: 'isPaused',
    }),
};
