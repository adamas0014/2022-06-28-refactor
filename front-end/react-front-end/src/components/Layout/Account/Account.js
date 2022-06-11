import React, {useState} from 'react'
import LoginForm from '../LoginForm/LoginForm'
import CreateAccountForm from '../CreateAccountForm/CreateAccountForm'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import { ModifyAccount, CreateAccount, LoginAccount, LogoutAccount, GetSessionAccount, GetProfileFromSession, IsSessionSet } from '../../../Database/UserAPI'
import MyAccount from '../MyAccount/MyAccount'
//require('./Login.css')



const Login = () => {
  const logOutCallback = () => {
    setRefresh(1)
  }
  const [refresh, setRefresh] = useState('')
  useState(() => {})

  const loginCb = (userProfile) => {
    console.log(userProfile)
  
    let ret = LoginAccount(userProfile.email, userProfile.password)
    if(ret){
      console.log("SETTED the current user: " + JSON.stringify(userProfile))
      setRefresh('1')
    }
    console.log("LoginResponse: " + JSON.stringify(ret))
    
  }
  
  const logOutCb = () => {
    alert("Logged Out")
    setRefresh('2')
    LogoutAccount()
    
  }

  const createCb = (createProfile) => {
    console.log('insideModifyProfile')  
    CreateAccount(createProfile).then(() => {
      setRefresh('3')
    console.log(GetSessionAccount())
    }).catch((e) => {
      console.log(e)
    })
    
  }
  const modifyProfile = (profile) => {
    console.log('inside modify profile')
    ModifyAccount(profile).then(console.log('completed')).catch((e) => console.log(e))
  }

  const SelectView = (profile) => {
    console.log("SELECT view ran: " + JSON.stringify(profile))
    if(IsSessionSet()){alert(JSON.stringify(profile)); return <MyAccount profile = {profile} callback = {modifyProfile} lOCallback={logOutCb}/>} else{ return <><LoginForm title="Login" callback={loginCb} logOutCb={logOutCallback}/><CreateAccountForm title="Create Account" callback={createCb} /> </>}
  }

  

    return(         
     <Canvas>
        <Row>
          <Spacer />

          {SelectView(GetProfileFromSession())} 
          
          
        </Row>  
      </Canvas>    
    )
}

/*
          
            

           callback={loginCb}
*/




export default Login
