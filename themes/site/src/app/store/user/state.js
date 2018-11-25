//
// state
//
export default function () {
    return {
        // pending configuration changes
        config: {
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
        },

        // loading state for authentication requests
        signinIsLoading: false,

        // loading state for signout requests
        signoutIsLoading: false,

        // the current user
        user: {},
    };
}
