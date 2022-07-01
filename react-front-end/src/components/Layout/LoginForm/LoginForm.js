import React from 'react'
import { LoginAccount } from '../../../Database/UserAPI'
import ProfileContext from '../../../Context'
const LoginForm = (props) => {

  const [profile, setProfile] = React.useContext(ProfileContext)

    const [form, setForm] = React.useState({email: '', password: ''}) //JSON state initialization
    

    const formChange = (event) => {
      const {id, value} = event.target
      setForm((prevState) => ({...prevState, [id]: value})) // Sets only the changed key:value pair
    }

    const submitHandler = (event) => {
        event.preventDefault()

        LoginAccount(form) // axios request followed by promises
          .then((result) => {console.log('Login Successful!');  setProfile(result); console.log("le profile", result);}) 
          .catch((e) => {console.log('Login Failed', e)}) 
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
              <input value={form.email} onChange={formChange} id="email" type="email" class="validate" required/>
              <label for="email">Email *</label>
            </div>
          </div>
          <div>
            <div class="input-field">
              <input value={form.password} onChange={formChange} id="password" type="password" class="validate" required/>
              <label for="password">Password *</label>
            </div>
          </div>
    
          <div class="center">
              <br />
              <button class="btn waves-effect waves-light" name="action">Submit
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