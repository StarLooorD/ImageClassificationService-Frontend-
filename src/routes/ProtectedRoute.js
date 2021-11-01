import React from "react";
import {Redirect, Route} from "react-router-dom";

import {useAuth} from "../contexts/AuthContext";

export default function ProtectedRoute({ render, ...rest }) {
    const auth = useAuth();

    return auth.loading ? null : (
        <Route {...rest} render={props => {
            return auth.user
                ? render(props)
                : <Redirect to={{pathname: "/login", state: {from: props.location}}} />
        }} />
    );
}
