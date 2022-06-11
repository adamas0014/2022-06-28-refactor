import { stringify } from 'postman-request/lib/url-parse';
import React from 'react'
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
const RemoveProfileFromSession = () => localStorage.removeItem('profile')
const GetProfileFromSession = () => JSON.parse(localStorage.getItem('profile'))
const IsSessionSet = () => { if(JSON.parse(localStorage.getItem('profile')) === null){ return false} else{ return true } }


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

const CreateAccount = async (profile) => {
    return new Promise((resolve, reject) => {
        
    axios({
        method: 'post',
        url: 'http://127.0.0.1:4000/users',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(profile)
    })
    .then(function (response) {
        SaveTokenToSession(response.data.token)
        SaveProfileToSession(response.data.user)
        resolve(JSON.stringify(response.data));
    })
    .catch(function (error) {
        reject(error);
    });
})
}

const LoginAccount = (email, pass) => {
    
    return new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: 'http://127.0.0.1:4000/users/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
            "email": email,
            "password": pass
        })
      })
    .then(function (response) {
        alert(response.data);
        SaveTokenToSession(response.data.token)
        SaveProfileToSession(response.data.user)
        resolve(response.data.user)
    })
    .catch(function (error) {
        console.log(error);
        reject(error)
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
        RemoveProfileFromSession()
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
        SaveProfileToSession(response.data.user)
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
    IsSessionSet,
    SaveProfileToSession,
    AddWidgetToAccount,
    ModifyAccount
}


