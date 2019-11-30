import React, { useState } from 'react';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const RegistrationForm = () => {

    let firstName, lastName, email, password, occupation, termsConditions;
    
    const [state, setState] = useState(
        {
            errors: [],
            registrationsuccess: false 
        }
    
        
    )

    const validateForm = () => {

        // This array will replace what's inside the state
        const errors = [];

        if(firstName.value.length === 0) {
            errors.push('Please enter your first name')
        }
        if(lastName.value.length === 0) {
            errors.push('Please enter your last name')
        }
        if(!validateEmail(email.value)) {
            errors.push('Please enter a valid email address')
        }
        if(password.value.length < 8 || password.value.length > 16) {
            errors.push('Please enter a password between 8 to 16 characters')
        }
        if(!termsConditions.checked) {
            errors.push('Please accept the Terms & Conditions');
        } 

        setState({ ...state, errors: errors ,success: false })
        return errors;
    }

    const registerUser =  async () => {
        let response = await fetch('http://localhost:3010/users/register', {
            method: 'POST',
            body: JSON.stringify(
                {
                    firstName:firstName.value,
                    lastName:lastName.value,
                    email: email.value,
                    password: password.value,
                    occupation:occupation.value
                }
            ),
            headers: {
                "Content-Type": "application/json"
            }
        });

        let json = await response.json();   

        console.log('response from amingo', json)
    }

    return(
        <div className="registration-form container">
            <div className="form-group">
                <label for="firstName">First Name</label>
                <input 
                    ref={(elem)=>firstName = elem}
                    type="text" 
                    className="form-control" 
                    id="firstName" 
                    placeholder="First Name" 
                />
            </div>
            <div className="form-group">
                <label for="lastName">Last Name</label>
                <input 
                    ref={(elem)=>lastName = elem}
                    type="text" 
                    className="form-control" 
                    id="lastName" 
                    placeholder="Last Name" 
                />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input 
                    ref={(elem)=>email = elem}
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                />
                <small
                    id="emailHelp"
                    className="form-text text-muted">
                        We'll never share your email with anyone else.
                </small>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input 
                    ref={(elem)=>password = elem}
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password" 
                />
            </div>
            <div className="form-group">
                <label for="occupation">Occupation (optional)</label>
                <input 
                    ref={(elem)=>occupation = elem}
                    type="text" 
                    className="form-control" 
                    id="occupation" 
                    placeholder="Optional" 
                />
            </div>
            <div className="form-group form-check">
                <input 
                    ref={(elem)=>termsConditions = elem}
                    type="checkbox" 
                    className="form-check-input" 
                    id="exampleCheck1" 
                />
                <label 
                    className="form-check-label" 
                    for="exampleCheck1">
                I accept the Terms &amp; Conditions
                </label>
            </div>
            {
                !state.registrationsuccess &&
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={registerUser}
                    >Submit</button>
            }
            {  state.errors.length > 0 &&
                <div 
                    className="alert alert-danger" 
                    role="alert" 
                >
                        Please correct the following errors:
                        <ul>
                            {  
                                state.errors.map(
                                    (error)=><li>{error}</li>
                                )
                            }
                        </ul>
                </div>
            } 
            {
                
            state.registrationsuccess === true && 
                    <div class="alert alert-success" role="alert">
                        You account has been created successfully!!
                    </div> 
            }
            
        </div>        
    )
}

export default RegistrationForm;