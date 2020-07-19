import React,{useState} from "react";
import Menu from "../core/Menu";
import {useHistory} from "react-router-dom";
import {signupData} from "../auth";

import './SignUp.css';
import './SignUp.scss';

const SignUp = () => {

    const history = useHistory();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    }

    const submitForm = (event) => {
        event.preventDefault();
        return signupData({name, email, password})
            .then(data => {
                if(data.error)
                {
                    setValues({...values, error: data.error,success: false});
                }
                else
                {
                    setValues({...values, name: '', email: '', password: '',error: '', success: true});
                    history.push('/signin');
                }
            })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none', width: '100%', textAlign: 'center'}}>{error}</div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>New account is created</div>
    )

    const signUpForm = () => (
        <div className="sign_in">
                <div className="promo">
                    <h1 className="title">Save your spot in line.</h1>
                    <div className="subtitle">Start off today and get ahead of the crowd! <br/>Getting started is only a few click
                        away.</div>
                    <div className="buttons">
                        <button className="btn btn_outline1">learn more</button>
                        <button className="btn btn_outline">About Us</button>
                    </div>
                    <div className="form_container rounded">
                        <div className="form">
                            <h2 className="heading">Let's get you started!</h2>
                            <div className="description">Getting started is quick and simple, just fill out the info
                                below!
                            </div>
                            <form>
                                <input className="input" type="text" name="name" value={name} onChange={handleChange('name')} placeholder="Name"/>
                                <input className="input" type="email" name="email" value={email} onChange={handleChange('email')} placeholder="Email Address"/>
                                <input className="input" type="password" name="password" value={password} onChange={handleChange('password')} placeholder="Password"/>
                                <label>
                                    <input className="input" type="checkbox"/>I agree to
                                    <a href="#"> Terms & Conditions</a>
                                </label>

                            </form>

                        </div>
                        {showSuccess()}
                        {showError()}
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <button type="submit" onClick={submitForm} className="btn btn_accent">Register</button>
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
                {signUpForm()}
            </div>
        </div>
    )
};

export default SignUp;