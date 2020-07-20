import React, {Fragment, useState} from "react";
import Menu from "../core/Menu";
import {signinData, authenticate} from "../auth";
import {Link, Redirect} from "react-router-dom";

import './SignUp&SignIn.scss';

const SignIn = () => {

    const [values, setValues] = useState({
        email: 'k@gmail.com',
        password: 'Loveuu123',
        error: false,
        loading: false,
        redirectToReferrer : false
    });

    const {email, password, loading, error, redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    }

    const submitForm = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        signinData({email, password})
            .then(data => {
                if(data.error)
                {
                    setValues({...values, error: data.error, loading: false});
                }
                else
                {
                    authenticate(data, () => {
                            setValues({...values, redirectToReferrer: true});
                        }
                    );
                }
            })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none', width: '100%', textAlign: 'center'}}>{error}</div>
    );

    const showLoading = () => (
        loading && (
            <div className="alert alert-info" style={{width: '100%'}}>
                Loading...
            </div>
        )
    );

    const redirectUser = () => {
        if(redirectToReferrer)
        {
            return <Redirect to="/" />
        }
    }

    const signInForm = () => (
        <div className="sign_in login">
            <div className="promo">
                <h1 className="title">Get your's delivered early.</h1>
                <div className="subtitle">Start off today and get ahead of the crowd! <br/>Learn more about us and our mission.</div>
                <div className="buttons">
                    <button className="btn btn_outline1">learn more</button>
                    <button className="btn btn_outline">About Us</button>
                </div>
                <div className={`form_container rounded ${error ? 'form_shake' : ''} `}>
                        <div className="form">
                            <h2 className="heading">Welcome back!</h2>
                            <div className="description">Let's get you back in to get your<strong> LPG </strong>
                                products ordered and delivered ahead of others.
                            </div>
                            <form>
                                <input className="input" type="email" name="email" value={email} onChange={handleChange('email')} placeholder="Email Address"/><i
                                className="fa fa-user"></i>
                                <input className="input" type="password" name="password" value={password} onChange={handleChange('password')} placeholder="Password"/>
                                <label>
                                    {/*<input className="input" type="checkbox"/>I agree to
                                <a href="#"> Terms & Conditions</a>*/}
                                </label>
                            </form>
                        </div>
                        <br/>
                        {showLoading()}
                        {showError()}
                        <div className="row" style={{marginTop:'15%'}}>
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <button type="submit" onClick={submitForm} className="btn btn_accent">Sign In</button>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                        <div className="copyright">&copy; 2020 All Rights Reserved.</div>
                    </div>
            </div>
        </div>
    )

    return (
        <div>
            <Menu/>
            <div>
                {signInForm()}
                {redirectUser()}
            </div>
        </div>
    )
};

export default SignIn;