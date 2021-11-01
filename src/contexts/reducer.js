export const initialState = {
    user: null,
    loading: true,
    errorMessage: null
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                ...initialState,
            };
        case "LOGIN_SUCCESS":
            return {
                ...initialState,
                user: action.payload.user,
                loading: false
            };
        case "LOGOUT":
            return {
                ...initialState,
                user: null
            };
        case "LOGIN_ERROR":
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
