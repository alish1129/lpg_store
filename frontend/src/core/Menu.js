import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {signOut, isAuthenticated} from "../auth";
import './css/menu.scss';
import logo from '../resources/images/gas.png';

const isActive = (history,path) => {
    if(history.location.pathname === path)
    {
        return {color : "#ffffff", backgroundColor: '#7d3cd3' };
    }
    else
    {
        return {color: "#ffffff"};
    }
};

const returnStyleForTitle = (history,path) => {
    if(history.location.pathname === '/UserDashBoard')
    {
        return {
            color: 'rgb(180,35,41)',
            height: '42px',
            fontWeight: 'bold',
            transition: 'box-shadow .3s',
            boxShadow: '0 0 11px rgba(33,33,33,.2)',
            backgroundColor:'white'
        };
    }
    else if(history.location.pathname !== path)
    {
        return {
            color: 'rgb(180,35,41)', border: '1px solid #fff', height: '42px', fontWeight: 'bold',
            backgroundColor: '#fff', boxShadow: '6px 8px 16px 0px rgba(92,44,44,0.95)',
        };
    }
    else
    {
        return {
            color: 'rgb(180,35,41)',height: '42px'
        };
    }

}

const test = () => {
    if(isAuthenticated())
    {
        return true;
    }
    else
    {
        return false;
    }
}

const Menu = ({history}) => (
    <div className="navbarMenu">
        <ul className="nav nav-pills fixed-top">
            <li className={`nav-item ${isAuthenticated()? '' : 'mr-auto'}`}>
                <Link className="nav-link" style={returnStyleForTitle(history,'/')} to="/">
                    <img style={{margin: '-5px 0px 0px -5px'}} src={logo} width="30"
                         className="" alt=""/> SURYA SOLUTION
                </Link>
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
                <li className="nav-item dropdown ml-auto">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"  role="button"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"
                             className="rounded-circle"
                             alt="avatar image" width="30"/> {isAuthenticated().user.name.toUpperCase()}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/UserDashBoard">Profile</Link>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <span className="dropdown-item" style={{cursor: 'pointer', color: 'red'}} onClick={() => signOut(() => {history.push('/')})}>
                            Sign Out
                        </span>
                    </div>
                </li>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);