import React, {useState, useContext, useMemo, useEffect} from 'react'
import {ContactSupport} from '../../../Database/UserAPI'
import ProfileContext from '../../../Context'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import M from 'materialize-css'


const Support = () => {
    const [profile, setProfile] = React.useContext(ProfileContext)

    const [form, setForm] = React.useState({email: '', password: ''})
    
    const formChange = (event) => {
        const {id, value} = event.target
        setForm((prevState) => ({...prevState, [id]: value})) // Sets only the changed key:value pair
      }
  
      const submitHandler = (event) => {
        event.preventDefault()
        if(form.body != null){
            ContactSupport(form.email, form.topic, form.body)
            alert('Email sent!')
        }
        
      }
      M.AutoInit();

      const setTopicToGeneral = () => {let tmpForm = form; tmpForm.topic = 'General'; setForm(tmpForm); console.log('set Topic to General');}
      const setTopicToForgotPassword = () => {let tmpForm = form; tmpForm.topic = 'Forgot Password'; setForm(tmpForm); console.log('set Topic to Forgot Password');}
      const setTopicToSiteIssue = () => {let tmpForm = form; tmpForm.topic = 'Site Issue'; setForm(tmpForm); console.log('set Topic to Site Issue');}

    return (<>
    <Canvas>
        <Row>
          <Spacer />
    <div class="col s4">
      <div className="login-canvas card horizontal">
            <table style={{width: "30em", marginLeft: "5em"}} >
            <div class="row">
            <form onSubmit={submitHandler}>
            <div>
                <h3 className="center">Contact Support</h3>
            </div>
         
         
          <div>
            <div class="input-field">
              <input value={form.email} onChange={formChange} id="email" type="email" class="validate" required/>
              <label for="email">Email *</label>
            </div>
          </div>
          
         
 
        <div class="input-field">
            <div>
              <input value={form.topic} onChange={formChange} id="topic" type="text" class="validate" required/>
              <label for="topic">Topic</label>
            </div>
        </div>
          <div class="input-field">
          <textarea id="body" value={form.body} onChange={formChange} class="materialize-textarea" required></textarea>
          <label for="textarea1">Body *</label>
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
    </Row>
    </Canvas>
    </>)
}



export default Support
