import React from 'react'
import bcrypt from 'bcryptjs'


const CreateAccountForm = (props) => {

    const [enteredFirstName, setEnteredFirstName] = React.useState("")
    const [enteredLastName, setEnteredLastName] = React.useState("")
    const [enteredCompany, setEnteredCompany] = React.useState("")
    const [enteredEmail, setEnteredEmail] = React.useState("")
    const [enteredPassword, setEnteredPassword] = React.useState("")

    const firstNameChangeHandler = (event) => {setEnteredFirstName(event.target.value)}
    const lastNameChangeHandler = (event) => {setEnteredLastName(event.target.value)}
    const companyChangeHandler = (event) => {setEnteredCompany(event.target.value)}
    const emailChangeHandler = (event) => {setEnteredEmail(event.target.value)}
    const passwordChangeHandler = (event) => {setEnteredPassword(event.target.value)}

    const submitHandler = (event) => {
        event.preventDefault()
        const profile = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            company: enteredCompany,
            email: enteredEmail,
            password: bcrypt.hashSync(enteredEmail, 8)
        }

        setEnteredFirstName('')
        setEnteredLastName('')
        setEnteredCompany('')
        setEnteredEmail('')
        setEnteredPassword('')

        props.callback(profile)
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
      <input value={enteredFirstName} onChange={firstNameChangeHandler} id="first_name" type="text" class="validate" required />
      <label for="first_name">First Name *</label>
    </div>
    <div class="input-field">
      <input value={enteredLastName} onChange={lastNameChangeHandler} id="last_name" type="text" class="validate" required />
      <label for="last_name">Last Name *</label>
    </div>
  </div>
  <div>
    <div class="input-field">
        <input value={enteredCompany} onChange={companyChangeHandler} id="company_name" type="text" class="validate" />
      <label for="company_name">Company Name</label>
    </div>
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