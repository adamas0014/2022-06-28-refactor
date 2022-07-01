import React, {useState, useContext, useMemo, useReducer} from 'react'

import Home from './components/Layout/Home/Home'
import Dashboard from './components/Layout/Dashboard/Dashboard'
import Account from './components/Layout/Account/Account'
import Admin from './components/Layout/Admin/Admin'
import './App.css'
import ProfileContext from './Context'
import {GetProfileFromContext, IsProfileSet} from './Database/UserAPI'
import Learn from './components/Layout/Learn/Learn'

function ProfileReducer(state, action){
  state = action
  return state
}


function App() {
  const [profile /* state */, setProfile /* action */] = React.useReducer(ProfileReducer, {} )
  const userProfile = useMemo(() => ([profile, setProfile]), [profile, setProfile])

  const [page, setPage] = React.useState(<Home />)
  const HomeLink = () => {setPage(<Home />)}
  const DashboardLink = () => {setPage(<Dashboard />)}
  const LearnLink = () => {setPage(<Learn />)}
  const LoginLink = () => {setPage(<Account />)}



  return (
      <ProfileContext.Provider value={userProfile}>
        <nav class="nav-wrapper"><img src = {require('./link.png')} width='20em'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nav>
        <ul id="slide-out" class="sidenav sidenav-fixed">
        <li><div class="user-view">
      <div class="background">

        <img src={require('./maroonBG.jpg')} />
      </div>
      { (profile) ? (
        <>
          <a href="#"><img class="circle" src={require('./crest.png')} /></a>
          <a href="#"><span class="white-text name">{profile.firstName} {profile.lastName}</span></a>
          <a href="#"><span class="white-text email">{profile.email}</span></a>
        </> ) : (
        <>
          <a href="#"><img class="circle" src={require('./iot3.png')} /></a>
          <a href="#"><span class="white-text name">Please Log In</span></a>
          <a href="#"><span class="white-text email">&nbsp;</span></a>
        </>
      )
      }
      
    </div></li>
       
        <li><a style={{fontSize: "13pt", marginLeft: "-1em"}} href = "#" onClick={HomeLink}> &nbsp; &nbsp; &nbsp;Home</a></li>
        <li><a style={{fontSize: "13pt", marginLeft: "-1em"}} href = "#" onClick={LearnLink}>&nbsp; &nbsp; &nbsp;Learn</a></li>
        <li><a style={{fontSize: "13pt", marginLeft: "-1em"}} href = "https://www.eng.mcmaster.ca/sept" target="_blank">&nbsp; &nbsp; &nbsp;McMaster</a></li>
        <br />  
        <li><div class="divider"></div></li>
        <li><a class="subheader">User</a></li>  
        {(profile.email) ? (<li><a style={{fontSize: "13pt", marginLeft: "-1em"}} href = "#"onClick={DashboardLink}>&nbsp; &nbsp; &nbsp;Dashboard</a></li>) : (console.log())}
        <li><a style={{fontSize: "13pt", marginLeft: "-1em"}} href = "#" onClick={LoginLink}>&nbsp; &nbsp; &nbsp;Account</a></li>  
             
      </ul>
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      
      {page}      

      </ProfileContext.Provider>
  );
}

/*

*/


export default App;