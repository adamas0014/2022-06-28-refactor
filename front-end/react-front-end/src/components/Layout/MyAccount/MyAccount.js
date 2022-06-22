import React from 'react'

require('./MyAccount.css')
require('./JohnSmith.jpg')


const MyAccount = (props) => {
  const [enteredFirstName, setEnteredFirstName] = React.useState(props.profile.firstName)
  const [enteredLastName, setEnteredLastName] = React.useState(props.profile.lastName)
  const [enteredCompany, setEnteredCompany] = React.useState(props.profile.company)
  const [enteredEmail, setEnteredEmail] = React.useState(props.profile.email)
  const [enteredPassword, setEnteredPassword] = React.useState("")
  const [enteredFile, setEnteredFile] = React.useState(null)

  const firstNameChangeHandler = (event) => {setEnteredFirstName(event.target.value)}
  const lastNameChangeHandler = (event) => {setEnteredLastName(event.target.value)}
  const companyChangeHandler = (event) => {setEnteredCompany(event.target.value)}
  const emailChangeHandler = (event) => {setEnteredEmail(event.target.value)}
  const passwordChangeHandler = (event) => {setEnteredPassword(event.target.value)}

  const onFileChange = (event) => { 
    setEnteredFile({ selectedFile: event.target.files[0] }); 
  }; 

  const submitHandler = (event) => {
      event.preventDefault()
      const formData = new FormData()

      formData.append(
        "picture",
        enteredFile.selectedFile,
        enteredFile.selectedFile.name
      )

      console.log("submitted")
      const profile = {
          firstName: enteredFirstName,
          lastName: enteredLastName,
          company: enteredCompany,
          picture: enteredFile,
          email: enteredEmail,
          password: enteredPassword
      }

      // setEnteredFirstName('')
      // setEnteredLastName('')
      // setEnteredCompany('')
      // setEnteredEmail('')
      // setEnteredPassword('')
      console.log(profile)
      props.callback(profile)
  }   


    let form = [ 
    <div class="row">
        
    <div class="col s4">
    <div className="login-canvas card horizontal">
        
        <table style={{width: "30em", marginLeft: "5em"}} >
    
        
    <div class="row">
    <div>
        <h3 className="center">Manage Account</h3>
    </div>
    
    <div class="card-image">
        <img src={require('./JohnSmith.jpg')} style={{ marginLeft: "10em" , height: "14em"}} />
    </div>

  <form>
    
  <div>
    <div class="input-field">
      <input onChange = {firstNameChangeHandler} value={enteredFirstName} id="first_name" type="text" class="validate" required />
      <label for="first_name">First Name</label>
    </div>
    <div class="input-field">
      <input onChange = {lastNameChangeHandler} value={enteredLastName} id="last_name" type="text" class="validate" required />
      <label for="last_name">Last Name</label>
    </div>
  </div>
  <div>
    <div class="input-field">
        <input onChange = {companyChangeHandler} value={enteredCompany} id="company_name" type="text" class="validate" />
      <label for="company_name">Company Name</label>
    </div>
   
  </div>


  <div class="file-field input-field">
      <div class="btn">
        <span>Profile Picture</span>
        <input type="file" onChange={this.onFileChange} />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" />
      </div>
    </div>

  <div class="input-field">
      <input value={enteredEmail} id="email" type="email" class="validate" required/>
      <label for="email">Email (contact administrator to change)</label>
    </div>
  
  <div>
    <div class="input-field">
      <input onChange = {passwordChangeHandler} id="password" type="password" class="validate" required/>
      <label for="password">Password * (contact administrator to change)</label>
    </div>
  </div>

  <div class="center">
      <br />
      <button class="btn waves-effect waves-light" type="submit" name="action" onClick={submitHandler}>Submit
            <i class="material-icons right">send</i>
    </button>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn waves-effect waves-light" style={{backgroundColor: "yellowGreen"}} onClick={props.lOCallback} name="action">Log Out
            <i class="material-icons right">group</i>
    </button>
    
    <br /><br />
  </div>
  
</form>
</div>
</table>
    </div>

    
  
  
</div></div>]

    return(<>{form}</>)
}

export default MyAccount