//
// state
//
export default function () {
    return {
        // loading state for puzzle configs
        configsAreLoading: false,

        // loading state for user refresh
        freshIsLoading: false,

        // loading state for authentication requests
        signinIsLoading: false,

        // loading state for signout requests
        signoutIsLoading: false,

        // the current user
        user: {
            avatar: null,
        },
    };
}
