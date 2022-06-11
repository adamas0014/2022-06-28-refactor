import React from 'react'


const LoginForm = (props) => {
   
    const [enteredEmail, setEnteredEmail] = React.useState("")
    const [enteredPassword, setEnteredPassword] = React.useState("")
    
   
    const emailChangeHandler = (event) => {setEnteredEmail(event.target.value)}
    const passwordChangeHandler = (event) => {setEnteredPassword(event.target.value)}
    

    const submitHandler = (event) => {
        event.preventDefault()
        //console.log("Entered Password: "+enteredPassword)
        
        //let salt = bcrypt.genSaltSync(10)
        //let hashedPass = bcrypt.hashSync(enteredPassword, salt)
        let hashedPass = enteredPassword

        console.log("Hash: " + hashedPass)
        const loginProfile = {
            email: enteredEmail,
            password: enteredPassword
        }

        
        setEnteredEmail('')
        setEnteredPassword('')

        props.callback(loginProfile)

    }





    return(
        <div class="col s4">
      <div className="login-canvas card horizontal">
            <table style={{width: "30em", marginLeft: "5em"}} >
            <div class="row">
            <form onSubmit={submitHandler}>
            <div>
                <h3 className="center">{props.title}</h3>
            </div>
         
         
          <div>
            <div class="input-field">
              <input value={enteredEmail} onChange={emailChangeHandler} id="email" type="email" class="validate" required/>
              <label for="email">Email *</label>
            </div>
          </div>
          <div>
            <div class="input-field">
              <input value={enteredPassword} onChange={passwordChangeHandler} id="password" type="password" class="validate" required/>
              <label for="password">Password *</label>
            </div>
          </div>
    
          <div class="center">
              <br />
              <button class="btn waves-effect waves-light" onClick={props.logOutCb} name="action">Submit
                    <i class="material-icons right">send</i>
            </button>
            <br /> <br />
          </div>
          
        </form>
      </div></table>
            </div>   </div>
      
    )
}


export default LoginForm