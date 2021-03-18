import React, {Fragment} from "react";
import AdminMenu from "../core/AdminMenu";
import {isAuthenticated} from "../auth";
import {Link} from "react-router-dom";

import '../user/UserDashboard.scss';
import profilePic from '../resources/images/DSC_0546-65.jpg';
import Menu from "../core/Menu";

const AdminDashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated();

    const AdminDashboard = () =>
        (
            <div style={{marginLeft:'18%'}}>
            </div>
            /*<div className="dashboard">
                <div className="promo">

                </div>
            </div>*/
        );

    return (
        <Fragment>
            <Menu/>
            <AdminMenu/>
            <div style={{marginLeft: '18%'}}>
                {AdminDashboard()}
            </div>
        </Fragment>

    );
}

export default AdminDashboard;