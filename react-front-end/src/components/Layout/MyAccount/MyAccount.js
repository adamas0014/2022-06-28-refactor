import React, {useState} from 'react'
import { GetProfileFromContext, LogoutAccount } from '../../../Database/UserAPI'
import M from 'materialize-css'
import GeneralInformation from './ManageAccount/GeneralInformation'
import ManagePassword from './ManagePassword/ManagePassword'
require('./MyAccount.css')
require('./JohnSmith.jpg')


const MyAccount = () => {


  const [view, setView] = React.useState(0)
  console.log("view", view)
  const viewA = () => setView(0)
  const viewB = () => setView(1)
  const viewC = () => setView(2)

  
  const changeView = () => {
    switch(view){
      case 0: {
        return (<GeneralInformation />)
      }
      case 1: {
        return (<h4>Still needs to be implemented</h4>)
      }
      case 2: {
        return (<ManagePassword />)
      }
    }
  } 



  return (
    <div class="row"> 
      <div class="col s4">
        <div className="login-canvas card horizontal">
          <table style={{margin: "2em"}}>
            <tr><td colSpan="3"><h3 className="center">Manage Account</h3></td></tr>
            <tr>
              <td>
                <p style={{marginLeft: "4em", fontWeight: 'bold', color: '#808080'}} onClick={viewA}>General</p>
              </td>
              <td>
                <p style={{marginLeft: "4em", fontWeight: 'bold', color: '#808080'}} onClick={viewB}>Profile Picture</p>
              </td>
              <td>
                <p style={{marginLeft: "4em", fontWeight: 'bold', color: '#808080'}} onClick={viewC}>Password</p>
              </td>
            </tr>

            <tr>
              <td colSpan="3">
                {changeView()}
              </td>
            </tr>
          
          </table>
        </div> 
      </div>
    </div>)

    
}

export default MyAccount


