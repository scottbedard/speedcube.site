// a simple counter to uniquely idenfity alerts
let alertId = 0;

// default options for an alert
const defaultOptions = {
    duration: 5000,
};

//
// actions
//
export default {

    //
    // add an alert
    //
    add({ commit, state }, { message, options }) {
        const id = alertId + 1;

        alertId = id;

        const alert = {
            ...defaultOptions,
            ...options,
            id,
            message,
        };

        commit('addAlert', alert);

        setTimeout(() => {
            if (!state.isPaused) {
                const expired = state.alerts.find(obj => obj.id === id);

                if (expired) {
                    commit('removeAlert', expired);
                }
            }
        }, alert.duration);
    },

    //
    // resume all alerts
    //
    resume({ commit, state }) {
        state.alerts.forEach((alert) => {
            setTimeout(() => {
                if (!state.isPaused) {
                    commit('removeAlert', alert);
                }
            }, alert.duration);
        });
    },
};
