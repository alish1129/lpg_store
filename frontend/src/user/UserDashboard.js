import React, {Fragment} from "react";
import Menu from "../core/Menu";
import {isAuthenticated} from "../auth";

import './UserDashboard.scss';
import profilePic from '../resources/images/DSC_0546-65.jpg';

const UserDashBoard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated();

    const Dashboard = () =>
    (
        <div className="dashboard">
            <div className="promo">
                <div className="card profile-card-5 text-center">
                    <div className="card-img-block">
                        <img className="card-img-top"
                             src={profilePic}
                             alt="Card image cap"/>
                    </div>

                    <div className="card-body pt-0" style={{width: '100%'}}>
                        <h5 className="card-title">My Profile</h5>
                        <div className="text-left">
                            <p className="card-text"><strong className="col-sm-3" style={{alignItems: 'end'}}>Name: </strong> <span className="col-sm-9">{name}</span></p>
                            <p className="card-text"><strong className="col-sm-3" style={{alignItems: 'end'}}>Email: </strong> <span className="col-sm-9">{email}</span></p>
                            <p className="card-text"><strong className="col-sm-3" style={{alignItems: 'end'}}>Phone: </strong> <span className="col-sm-9">+1 (985) XXX-XXXX</span></p>
                            <p className="card-text">
                                <strong className="col-sm-3" style={{alignItems: 'end'}}>Address: </strong> <span className="col-sm-9">Corona Blvd,Mars, Planet 42417</span>
                            </p>
                            <p className="card-text"><strong className="col-sm-3">Role: </strong> <span className="col-sm-9">{role === 1? 'Admin' : 'Registered User'}</span></p>
                        </div>
                    </div>
                    <div className="card-footer bg-transparent text-center" style={{width: '100%'}}>

                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                    <button type="submit" className="butn butn_accent">Edit Profile</button>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>
                    </div>
                </div>
                <div className="card purchase-card">
                        <div className="card-header" style={{width: '100%'}}>
                            Purchase History
                        </div>

                        <div className="card-body" style={{width: '100%', padding: '0'}}>
                            <table className="table table-dark table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Nepal Gas</td>
                                    <td>Baneshwor,KTM</td>
                                    <td>$125.00</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Lumbini Gas</td>
                                    <td>Hetauda,LUM</td>
                                    <td>$150.00</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Siddhartha Gas</td>
                                    <td>Birgunj,SAR</td>
                                    <td>$200.50</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="card-footer text-muted text-center" style={{width: '100%'}}>
                            Load old history
                        </div>

                </div>
            </div>
        </div>
    );

    return (
        <Fragment>
            <Menu/>
            <div>
                {Dashboard()}
            </div>

            {/*<div className="container">
                <div className="row">
                    <div className="col-md-4 mt-4">
                        <div className="card profile-card-5">
                            <div className="card-img-block">
                                <img className="card-img-top"
                                     src="https://images.unsplash.com/photo-1517832207067-4db24a2ae47c"
                                     alt="Card image cap"/>
                            </div>
                            <div className="card-body pt-0">
                                <h5 className="card-title">Florence Garza</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up
                                    the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>*/}

            {/*<div className="container">
                <div style={{marginTop:'10%'}}>
                    <div className="card mb-5 mt-5">
                        <h3 className="card-header">User Info</h3>
                        <ul className="list-group">
                            <li className="list-group-item">{name}</li>
                            <li className="list-group-item">{email}</li>
                            <li className="list-group-item">{ role === 1? 'Admin' : 'Registered User'}</li>
                        </ul>
                    </div>
                    <div className="card mb-5">
                        <h3 className="card-header">Purchase History</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Purchase 1</li>
                        </ul>
                    </div>
                </div>
            </div>*/}
        </Fragment>

    );
}

export default UserDashBoard;