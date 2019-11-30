import React, { useState, useContext } from 'react';
import AppContext from './AppContext'

const LoginForm = () => {

    let email, password;

    const [state, setState] = useState(
        {loginSuccess: null}
    )

    const [globalState, setGlobalState] = useContext(AppContext);

    const loginUser = async () => {
        let response = await fetch('http://localhost:3010/users/login', {
            method: 'POST',
            body: JSON.stringify(
                {
                    email: email.value,
                    password: password.value,
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let json = await response.json();   

        if(json.token) {
            // Change the local state
            setState({ ...state, loginSuccess: true});

            // Change the globa state
            setGlobalState({ 
                ...globalState, 
                loggedIn: 'true', 
                userid: json.userid
            });

            sessionStorage.setItem('jwt', json.token);
            sessionStorage.setItem('userid', json.userid);
        }
        
    }

    return(
        <div className="registration-form container">
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input 
                    ref={(inputElem)=>email = inputElem}
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                />

            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input 
                    ref={(inputElem)=>password = inputElem}
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                />
            </div>

            <button 
                onClick={loginUser}
                type="submit" 
                className="btn btn-primary"
            >Login</button>

            {
                state.loginSuccess &&
                <div 
                    className="alert alert-success" 
                    role="alert" 
                >
                    You're now logged in!
                </div>
            }
        </div>        
    )
}
export default LoginForm;