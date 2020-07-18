import React from "react";
/* wrap the application routes and make the props available for other nested components*/
import {BrowserRouter} from "react-router-dom";
import {Switch, Route} from "react-router-dom";

import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Home from "./core/Home";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={SignIn}/>
                <Route path="/signup" exact component={SignUp}/>
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;