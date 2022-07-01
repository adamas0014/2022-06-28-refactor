import React, {useState, useContext, useMemo} from 'react'
import ProfileContext from '../../../../Context'
import { SyncProfileToServer } from '../../../../Database/UserAPI'

const GeneralInformation = () => {
    const [profile, setProfile] = React.useContext(ProfileContext)
    const [form, setForm] = React.useState({firstName: profile.firstName, lastName: profile.lastName, company: profile.company}) //JSON state initialization
    

    const formChange = (event) => {
      const {id, value} = event.target
      setForm((prevState) => ({...prevState, [id]: value})) // Sets only the changed key:value pair
    }

    const submitHandler = (event) => {
      event.preventDefault()
      let profileCpy = profile
      profileCpy.firstName = form.firstName
      profileCpy.lastName = form.lastName
      profileCpy.company = form.company   
      setProfile(profileCpy)
      SyncProfileToServer(form)
    }



    return (<>
        <form onSubmit={submitHandler}>
          <div class="input-field">
            <input onChange = {formChange} value={form.firstName} id="firstName" type="text" class="validate" required />
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field">
            <input onChange = {formChange} value={form.lastName} id="lastName" type="text" class="validate" required />
            <label for="last_name">Last Name</label>
          </div>
          <div class="input-field">
              <input onChange = {formChange} value={form.company} id="company" type="text" class="validate" />
            <label for="company_name">Company Name</label>
          </div>
          <div class="center">
              <br />
              <button class="btn waves-effect waves-light" name="action">Submit
                    <i class="material-icons right">send</i>
            </button>
            <br /> <br />
          </div>
          </form>
        </>)
    
}



/*<div class="file-field input-field">
            <div class="btn">
              <span>Profile Picture</span>
              <input type="file" onChange={formChange} id="profilePicture" />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
          
       */




          /*

             <div>
          <div class="input-field">
            <input onChange = {formChange} value={form.firstName} id="firstName" type="text" class="validate" required />
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field">
            <input onChange = {formChange} value={form.lastName} id="lastName" type="text" class="validate" required />
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div>
          <div class="input-field">
              <input onChange = {formChange} value={form.company} id="company" type="text" class="validate" />
            <label for="company_name">Company Name</label>
          </div>
         
        </div>
      
      
        
        
        <div>
          <div class="input-field">
            <input onChange = {formChange} id="passwordA" type="passwordA" class="validate" required/>
            <label for="password">Password * (contact administrator to change)</label>
          </div>
        </div>


        <div>
          <div class="input-field">
            <input onChange = {formChange} id="passwordB" type="passwordB" class="validate" required/>
            <label for="password">Password * (contact administrator to change)</label>
          </div>
        </div>
      
        <div class="center">
            <br />
            <button class="btn waves-effect waves-light" type="submit" name="action" onClick={submitHandler}>Submit
                  <i class="material-icons right">send</i>
          </button>

          
          <br /><br />
        </div>
          */



export default GeneralInformation