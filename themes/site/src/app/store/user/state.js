//
// state
//
export default function () {
    return {
        // loading state for authentication requests
        signinIsLoading: false,

        // loading state for signout requests
        signoutIsLoading: false,

        // the current user
        user: {},
    };
}
