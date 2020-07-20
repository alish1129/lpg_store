import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signOut, isAuthenticated} from "../auth";
import './css/menu.scss'

const isActive = (history,path) => {
    if(history.location.pathname === path)
    {
        return {color : "#7d3cd3"};
    }
    else
    {
        return {color: "#ffffff"};
    }
};

const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/')} to="/">HOME</Link>
            </li>

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">SIGN IN</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">SIGN UP</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signOut(() => {history.push('/')})}>
                        SIGN OUT
                    </span>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);