import React from 'react'
import bcrypt from 'bcryptjs'
import { CreateAccount } from '../../../Database/UserAPI'
import ProfileContext from '../../../Context'

const CreateAccountForm = (props) => {
  const [profile, setProfile] = React.useContext(ProfileContext)

    const [form, setForm] = React.useState({firstName: '', lastName: '', company: '', email: '', password: ''})
    const formChange = (event) => {
      const {id, value} = event.target
      setForm((prevState) => ({...prevState, [id]:value}))
    }

    const submitHandler = function (event) {
        event.preventDefault()
        console.log(JSON.stringify(form))
        const formCpy = form


        CreateAccount(formCpy)
          .then((result) => {setProfile(result); console.log("le profile", result);})
          .catch((e) => console.log("Account not created", e))
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
      <input value={form.firstName} onChange={formChange} id="firstName" type="text" class="validate" required />
      <label for="first_name">First Name *</label>
    </div>
    <div class="input-field">
      <input value={form.lastName} onChange={formChange} id="lastName" type="text" class="validate" required />
      <label for="last_name">Last Name *</label>
    </div>
  </div>
  <div>
    <div class="input-field">
        <input value={form.company} onChange={formChange} id="company" type="text" class="validate" />
      <label for="company_name">Company Name</label>
    </div>
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
      <button class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
    </button>
    <br /><br />
  </div>
  
</form>
</div>
</table>
    </div>

    
  
  
</div>

)
}



export default CreateAccountForm