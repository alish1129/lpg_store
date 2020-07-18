import React,{useState} from "react";
import Layout from "../core/Layout";
import {API} from "../config";
import Menu from "../core/Menu";
import './SignUp.css'

const SignUp = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password} = values;

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    }

    const signupData = user => {
        //console.log(name, email, password);
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => {
            return response.json();
        }).catch(err => {
            console.log(err);
        })
    }

    const submitForm = (event) => {
        event.preventDefault();
        signupData({name, email, password});
    }

    const signUpForm = () => (
        <div className="col-md-8 offset-md-2">
            <div className="container">
                <div className="col-md-6 mx-auto text-center">
                    <div className="header-title">
                        <h2 className="wv-heading--title">
                            Check it out — it’s free!
                        </h2>
                    </div>
                </div>
                <div className="card">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="form">
                                <form>
                                    <div className="form-group">
                                        <input type="text" name="name" onChange={handleChange('name')} className="form-control my-input" id="name"
                                               placeholder="Name"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" onChange={handleChange('email')} className="form-control my-input" id="email"
                                               placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" min="0" name="password" onChange={handleChange('password')} id="password" className="form-control my-input"
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" min="0" name="confirmPassword" id="confirmPassword"
                                               className="form-control my-input"
                                               placeholder="Confirm Password"/>
                                    </div>
                                    <div className="text-center ">
                                        <button type="submit" onClick={submitForm} className="btn btn-block send-button tx-tfm">Submit</button>
                                    </div>
                                    <div className="col-md-12 ">
                                        <div className="login-or">
                                            <hr className="hr-or"/>
                                            <span className="span-or">or</span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <a className="btn btn-block g-button" href="#">
                                            <i className="fa fa-google"></i> Sign up with Google
                                        </a>
                                    </div>
                                    <p className="small mt-3">By signing up, you are indicating that you have read and
                                        agree to
                                        the <a href="#" className="ps-hero__content__link">Terms of Use</a> and <a
                                            href="#">Privacy
                                            Policy</a>.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <Menu/>
            {JSON.stringify(values)}
            {signUpForm()}

        </div>
    )
};

export default SignUp;