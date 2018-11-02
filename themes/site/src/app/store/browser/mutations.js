/* eslint-disable no-param-reassign */

//
// mutations
//
export default {
    // set the window dimensions
    setDimensions(state, { height, width }) {
        state.dimensions.height = height;
        state.dimensions.width = width;
    },
};
