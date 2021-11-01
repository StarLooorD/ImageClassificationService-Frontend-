import {createContext, useContext, useEffect, useReducer} from "react";

import {auth} from "../adapters/firebase";
import {AuthReducer, initialState} from "./reducer";

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [authState, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            dispatch({type: "LOGIN_SUCCESS", payload: {user: user}});
        });
        return unsubscribe;
    }, []);

    const authorize = () => {
        return authState.user.getIdToken();
    };

    const signIn = (body) => {
        let promise = new Promise(function (resolve, reject) {
            dispatch({ type: "REQUEST_LOGIN" });
            auth.signInWithEmailAndPassword(body.email, body.password)
                .then((ref) => {
                    resolve(ref);
                })
                .catch((error) => {
                    dispatch({ type: "LOGIN_ERROR", error: error });
                    reject(error);
                });
        });
        return promise;
    };

    const signOut = () => {
        let promise = auth.signOut();
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        return promise;
    };

    const resetPassword = (body) => {
        let promise = new Promise(function (resolve, reject) {
            auth.sendPasswordResetEmail(body.email)
                .then(() => {
                    resolve(`Password Reset Email sent to ${body.email}`);
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return promise;
    };

    const value = {
        ...authState,
        signIn: props.signIn || signIn,
        signOut: props.signOut || signOut,
        resetPassword: props.resetPassword || resetPassword,
        dispatch: dispatch,
        authorize: authorize,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
