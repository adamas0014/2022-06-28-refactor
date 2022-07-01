
import React from 'react'
import { AddWidgetToAccount, CreateAccount, LoginAccount, LogoutAccount, GetSessionAccount, GetProfileFromSession, SaveProfileToSession, IsSessionSet } from '../../../Database/UserAPI'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import ProfileContext from '../../../Context'
import { SyncProfileToServer } from '../../../Database/UserAPI'

const AddWidgetModal = (props) => {

  const [profile, setProfile] = React.useContext(ProfileContext)

  
  const [form, setForm] = React.useState({})

  const formChange = (event) => {
    const {id, value} = event.target
    setForm((prevState) => ({...prevState, [id]: value})) // Sets only the changed key:value pair
  }


    const submitHandler = async (event) => {
        event.preventDefault()

        const newWidget = {
            title: form.title,
            location: form.location,
            value: '',
            units: '',
            description: form.descripion
        }
        
        let pCpy = profile
        pCpy.widgets.push(newWidget)
        delete pCpy._id
        delete pCpy.firstName
        delete pCpy.lastName
        delete pCpy.company
        delete pCpy.password
        delete pCpy.tokens
        delete pCpy.deviceTokens
        delete pCpy.__v
        setProfile(pCpy)

        try{
          await SyncProfileToServer(profile)
        }
        catch(e){
          console.log('Unable to sync with server', e)
        }
        
            
       
    setForm({})
        

    }
    

    return(<>
        
        <div class="col s4">
        <div className="login-canvas card horizontal">
              <table style={{width: "30em", marginLeft: "5em"}} >
              <div class="row">
              <form onSubmit={submitHandler}>
              <div>
                  <h3 className="center">Add New Widget</h3>
              </div>
           
           
            <div>
              <div class="input-field">
                <input value = {form.title} onChange={formChange} id="title" type="text" class="validate" required/>
                <label for="title">Title *</label>
              </div>
            </div>
            <div>
              <div class="input-field">
                <input value = {form.location} onChange={formChange} id="location" type="text" class="validate" required/>
                <label for="location">Location *</label>
              </div>
            </div>
            <div>
              <div class="input-field">
                <input value = {form.descripion} onChange = {formChange} id="description" type="text" class="validate" required/>
                <label for="description">Description *</label>
              </div>
            </div>

           
                
                    
                <div class="center">
                <br />
                <button class="btn waves-effect waves-light" name="action">Submit
                      <i class="material-icons right">send</i>
              </button>
              </div>
              <br /> <br />
              
              </form>
              <div class="center">
                <br />
                <button  class="btn waves-effect waves-light center" onClick={props.view} name="action">&nbsp;&nbsp;Exit&nbsp;&nbsp;
                      <i class="material-icons right">block</i>
              </button>
              </div>
              <br /> <br />
              
            </div>
            
            
        </table>
              </div>   </div>    </>
    )


}




/* <
         */














export default AddWidgetModal


