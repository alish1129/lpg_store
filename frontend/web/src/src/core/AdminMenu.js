import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signOut, isAuthenticated } from '../auth';
import './css/adminMenu.css';
import logo from '../resources/images/gas.png';

const AdminMenu = () => (
    <div className="sidenav text-center">
        <div className="admintitle">
            <img style={{margin: '-5px 0px 0px -5px'}} src={logo} width="30"
                 className="" alt=""/> SURYA SOLUTION
        </div>
        <hr/>
        <div className="sidebar-heading">
            Core
        </div>
        <div style={{textAlign: 'start'}}>
            <ul style={{listStyleType: 'none', margin: '0', padding:'0'}}>
                <li className="nav-item active">
                    <a className="" href="index.html" style={{fontSize: '1rem'}}>
                        <i className="fa fa-tachometer"></i>
                        <span style={{marginLeft: '10%', display: 'inline'}}>Dashboard</span>
                    </a>
                </li>
            </ul>
        </div>
        <hr/>
        <div className="sidebar-heading">
            Product
        </div>
        <div style={{textAlign: 'start'}}>
            <ul style={{listStyleType: 'none', margin: '0', padding:'0'}}>
                <li className="nav-item" style={{marginBottom: '5%'}}>
                    <a className="" href="index.html" style={{fontSize: '1rem'}}>
                        <i className="fa fa-folder"></i>
                        <span style={{marginLeft: '10%', display: 'inline'}}>Create Categories</span>
                    </a>
                </li>
                <li className="nav-item active" style={{marginBottom: '3%'}}>
                    <a className="" href="index.html" style={{fontSize: '1rem'}}>
                        <i className="fa fa-list"></i>
                        <span style={{marginLeft: '10%', display: 'inline'}}>Create Product</span>
                    </a>
                </li>
            </ul>
        </div>
        <hr/>
    </div>
);

export default withRouter(AdminMenu);
