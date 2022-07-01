import React, {useState} from 'react'
import LoginForm from '../LoginForm/LoginForm'
import CreateAccountForm from '../CreateAccountForm/CreateAccountForm'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import { ModifyAccount, CreateAccount, LoginAccount, LogoutAccount, GetSessionAccount, GetProfileFromSession, IsProfileSet } from '../../../Database/UserAPI'
import MyAccount from '../MyAccount/MyAccount'
//require('./Login.css')



const Login = () => {
  

  const SelectView = () => {
    if(IsProfileSet()){
      return <MyAccount />
    } 
    else{ 
      return <><LoginForm title="Login" /><CreateAccountForm title="Create Account"  /> </>
    }
  }

  

    return(         
     <Canvas>
        <Row>
          <Spacer />

          {SelectView()} 
          
          
        </Row>  
      </Canvas>    
    )
}

/*
          
            

           callback={loginCb}
*/




export default Login
