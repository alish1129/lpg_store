import React from "react";
/* wrap the application routes and make the props available for other nested components*/
import {BrowserRouter, Switch, Route} from "react-router-dom";
import PrivateRoute from "./auth/privateRoute";
import AdminRoute from "./auth/adminRoute";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";

import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Home from "./core/Home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <PrivateRoute path='/UserDashboard' exact component={UserDashboard} />
                <AdminRoute path='/admin/Dashboard' exact component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;