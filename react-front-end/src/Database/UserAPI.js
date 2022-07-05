import { stringify } from 'postman-request/lib/url-parse';
import React from 'react'
import ProfileContext from '../Context'


const bcrypt = require('bcryptjs')
var axios = require('axios');


window.onload = function() {
    alert("firstLoad")
    localStorage.clear()
};

const SaveTokenToSession = (jwt) => {jwt.replaceAll('""', ''); localStorage.setItem('jwt', jwt)}
const RemoveTokenFromSession = () => localStorage.removeItem('jwt')
const GetTokenFromSession = () =>  {return localStorage.getItem('jwt')}
const SaveProfileToSession = (profile) => localStorage.setItem('profile', JSON.stringify(profile))
const SaveProfileToContext = (user) => {
    const [profile, setProfile] = React.useContext(ProfileContext)
    setProfile(user)
    return profile
}
const GetProfileFromContext = () => {
    const [profile, setProfile] = React.useContext(ProfileContext)
    const profileCpy = profile //returning copy so context isnt invalid outside of function's scope
    return profileCpy
}
const RemoveProfileFromContext = () => {
    const [user, setUser] = React.useContext(ProfileContext)
    setUser(null)
}
const RemoveProfileFromSession = () => localStorage.removeItem('profile')
const GetProfileFromSession = () => JSON.parse(localStorage.getItem('profile'))
const IsSessionSet = () => { if(JSON.parse(localStorage.getItem('profile')) === null){ return false} else{ return true } }
const IsProfileSet = () => {
    const [user, setUser] = React.useContext(ProfileContext)
    if(user.email) return true
    else return false
}

const AddWidgetToAccount = async (widget) => {
    //console.log('top secret token: ' + 'Bearer ' + GetTokenFromSession())
    return new Promise((resolve, reject) => {
        axios(
            {
                method: 'post',
                url: 'http://127.0.0.1:4000/widgets/add',
                headers: { 
                  'Authorization': 'Bearer ' + GetTokenFromSession(), 
                  'Content-Type': 'application/json'
                },
                data: {widget : JSON.stringify(widget),
                widgetType: "simpleRead"}
              }
        )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            resolve(widget)
        })
        .catch(function (error) {
            console.log(error);
            reject(Error('Unable to add widget to db'))
        });
    })
    
}


const SyncProfileToServer = async (modifiedProfile) => {
    //console.log('top secret token: ' + 'Bearer ' + GetTokenFromSession())
    return new Promise((resolve, reject) => {
        axios(
            {
                method: 'patch',
                url: 'http://127.0.0.1:4000/users/me',
                headers: { 
                  'Authorization': 'Bearer ' + GetTokenFromSession(), 
                  'Content-Type': 'application/json'
                },
                data: modifiedProfile,
                widgetType: "simpleRead"
              }
        )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            resolve(modifiedProfile)
        })
        .catch(function (error) {
            console.log(error);
            reject(Error('Unable to add widget to db'))
        });
    })
    
}
const UpdatePassword = async (modifiedPassword) => {
    //console.log('top secret token: ' + 'Bearer ' + GetTokenFromSession())
    return new Promise((resolve, reject) => {
        axios(
            {
                method: 'patch',
                url: 'http://127.0.0.1:4000/users/password',
                headers: { 
                  'Authorization': 'Bearer ' + GetTokenFromSession(), 
                  'Content-Type': 'application/json'
                },
                data: { password: modifiedPassword } 
              }
        )
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            resolve(modifiedPassword)
        })
        .catch(function (error) {
            console.log(error);
            reject(Error('Unable to replace password in db'))
        });
    })
    
}
const CreateAccount = (profile) => {
    console.log(profile)
    return new Promise((resolve, reject) => {
        
        axios({
            method: 'post',
            url: 'http://127.0.0.1:4000/users/create',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : JSON.stringify(profile)
        })
        .then(function (response) {
                       
            SaveTokenToSession(response.data.token)
            delete response.data.user.tokens
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error);
        });
    })
}

const LoginAccount = (loginForm) => {
    //const [profile, setProfile] = React.useContext(ProfileContext)
    return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: 'http://127.0.0.1:4000/users/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
            "email": loginForm.email,
            "password": loginForm.password
        })
      })
    .then(function (response) {
        
        SaveTokenToSession(response.data.token)
        //setProfile(response.data.user)
        //SaveProfileToContext(response.data.user)
        resolve(response.data.user)
    })
    .catch(function (error) {
        console.log(error);
        reject(error)
    });
})
    
}
const ContactSupport = (email, topic, body) => {

    return new Promise((resolve, reject) => {
        
        axios({
            method: 'post', 
            url: 'http://127.0.0.1:4000/users/support',
            headers: { 
                'Authorization': 'Bearer ' + GetTokenFromSession(), 
                'Content-Type': 'application/json'
            },
            data: {email, topic, body}
        })
        .then(function (response) {
                       
            resolve(response.data);
        })
        .catch(function (error) {
            reject(error);
        });
    })
}

const LogoutAccount = () => {
    alert("Bearer " + localStorage.getItem('jwt'))
    console.log('Bearer ' + GetTokenFromSession())
    return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: 'http://127.0.0.1:4000/users/logout',
        headers: { 
          'Authorization': 'Bearer ' + GetTokenFromSession(), 
          'Content-Type': 'application/json'
        },
        data : '{}'
      })
    .then(function (response) {
        //console.log(JSON.stringify(response.data))
        RemoveTokenFromSession()
        RemoveProfileFromContext()
        resolve()
    })
    .catch(function (error) {
        console.log(error)
        reject(error)
    });
})
}

const GetSessionAccount = () => {
    return new Promise((resolve, reject) => {
    let ret;
    axios({
        method: 'get',
        url: 'http://127.0.0.1:4000/users/me',
        headers: { 
          'Authorization': 'Bearer ' + GetTokenFromSession()
        }
      })
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        resolve(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.log(error);
        reject()
    });
})
    
}


const ModifyAccount = (profile) => {
    //console.log(profile)
    return new Promise((resolve, reject) => {
        
    axios({
        method: 'post',
        url: 'http://127.0.0.1:4000/users/modify',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + GetTokenFromSession()
        },
        data : JSON.stringify(profile)
    })
    .then(function (response) {
        RemoveProfileFromSession()
        SaveProfileToContext(response.data.user)
        console.log(JSON.stringify(response.data))
        resolve(JSON.stringify(response.data));
    })
    .catch(function (error) {
        reject(error);
    });
})
}







export {
    CreateAccount,
    LoginAccount,
    LogoutAccount,
    GetSessionAccount,
    GetProfileFromSession,
    IsProfileSet,
    SaveProfileToSession,
    AddWidgetToAccount,
    ModifyAccount,
    GetProfileFromContext,
    SyncProfileToServer,
    UpdatePassword,
    ContactSupport
}


