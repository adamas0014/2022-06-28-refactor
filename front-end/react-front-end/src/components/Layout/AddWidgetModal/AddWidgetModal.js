
import React from 'react'
import { AddWidgetToAccount, CreateAccount, LoginAccount, LogoutAccount, GetSessionAccount, GetProfileFromSession, SaveProfileToSession, IsSessionSet } from '../../../Database/UserAPI'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'



const AddWidgetModal = (props) => {

    const [enteredTitle, setEnteredTitle] = React.useState("")
    const [enteredLocation, setEnteredLocation] = React.useState("")
    const [enteredDescripion, setEnteredDescription] = React.useState("")
    const [enteredImage, setEnteredImage] = React.useState("")


    const titleChangeHandler = (event) => setEnteredTitle(event.target.value)
    const locationChangeHandler = (event) => setEnteredLocation(event.target.value)
    const descriptionChangeHandler = (event) => setEnteredDescription(event.target.value)
    const imageChangeHandler = (event) => setEnteredImage(event.target.value)

    const submitHandler = async (event) => {
        event.preventDefault()

        const newWidget = {
            title: enteredTitle,
            location: enteredLocation,
            value: '',
            units: '',
            description: enteredDescripion
        }
        
        
        AddWidgetToAccount(newWidget).then(() => {
            let profile = GetProfileFromSession()
            profile.widgets.push(newWidget)
            SaveProfileToSession(profile)
        }).catch((e) => {
            alert(e)
        })
            
       




        setEnteredTitle('')
        setEnteredLocation('')
        setEnteredDescription('')
        setEnteredImage('')

        props.reset('tile')

    }
    const subReset = () =>{ alert('called'); props.reset('tile')}

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
                <input value = {enteredTitle} onChange={titleChangeHandler} id="title" type="text" class="validate" required/>
                <label for="title">Title *</label>
              </div>
            </div>
            <div>
              <div class="input-field">
                <input value = {enteredLocation} onChange={locationChangeHandler} id="location" type="text" class="validate" required/>
                <label for="location">Location *</label>
              </div>
            </div>
            <div>
              <div class="input-field">
                <input value = {enteredDescripion} onChange = {descriptionChangeHandler} id="description" type="text" class="validate" required/>
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
                <button onClick={() =>{subReset('tile')}} class="btn waves-effect waves-light center" name="action">&nbsp;&nbsp;Exit&nbsp;&nbsp;
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


