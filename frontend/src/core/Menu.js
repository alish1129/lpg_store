import React from "react";
import {Link, withRouter} from "react-router-dom";
import './css/menu.scss'

const isActive = (history,path) => {
    if(history.location.pathname === path)
    {
        return {color : "#ff9900"};
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
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">SIGN IN</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">SIGN UP</Link>
            </li>
        </ul>
    </div>
);

export default withRouter(Menu);