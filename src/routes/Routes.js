import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import {routes} from "./index";
import ProtectedRoute from "./ProtectedRoute";

const renderComponent = (Layout, Component, props) => {
    if (Layout !== null) {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    } else {
        return (
            <Component {...props} />
        );
    }
};

const routeWithSubRoutes = (routes) =>
    routes.map(({children, path, layout: Layout, component: Component, protectedRoute}, index) => {
        return children ? (
            // Route item with children
            children.map(({path, layout: Layout, component: Component, protectedRoute}, index) => (
                protectedRoute ?
                    <ProtectedRoute key={index} path={path} exact render={props => renderComponent(Layout, Component, props)}/> :
                    <Route key={index} path={path} exact render={props => renderComponent(Layout, Component, props)}/>
            ))) : (
            // Route item without children
            protectedRoute ?
                <ProtectedRoute key={index} path={path} exact render={props => renderComponent(Layout, Component, props)}/> :
                <Route key={index} path={path} exact render={props => renderComponent(Layout, Component, props)}/>
        )
    });

const Routes = () => (
    <Switch>
        {routeWithSubRoutes(routes)},
        <Redirect to="/login"/>
    </Switch>
);

export default Routes;
