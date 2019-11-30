import React,{useState} from 'react';

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let emailField;



const Jumbotron=({title, description,subdescription,label})=>{

    const [state, setState] = useState({
        registrationSuccessful: null,
       
    }) 

    const registerUser = () => {
        if( validateEmail(emailField.value)===true && emailField.value.length > 0){
        setState({...state, registration: 'correct'})
    }
    else{
        setState({...state,
            registration: 'incorrect',
            
            })
    }
}
    return(
    <div className="jumbotron">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{description}</p>
        <hr className="my-4"/>
        <p>{subdescription}</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">{label}</a>
    {
     
     <div className="input-group" style={{width: '600px', margin: '0 auto'}}>
     <input  ref={(elem)=>emailField = elem}  type="text" className="form-control" style={{ margin: '10px auto'}}/>
     <button 
     onClick={registerUser}
     className="btn btn-primary" href="#" role="button" style={{ margin: '10px auto'}} >
         Sign Up
     </button>
     
    </div>
    }
 

 { 
     state.registration==='correct' && <div class="alert alert-success" role="alert" style={{width: '600px', margin: '10px auto'}}>
         You have been successfully registered!
     </div> 
 }
 {
    state.registration==='incorrect' && <div class="alert alert-danger" role="alert" style={{width: '600px', margin: '10px auto'}}>
    You have entered an incorrect email address!
    
   </div>
 }
 
     </div>
    
    )
}
export default Jumbotron