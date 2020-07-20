import {API} from "../config";

export const signupData = user => {
    return fetch(`${API}/signup`, {
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
};

export const signinData = user => {
    return fetch(`${API}/signin`, {
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
};

export const authenticate = (data, next) => {
  if(typeof window != 'undefined')
    {
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
};