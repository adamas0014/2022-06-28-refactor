import React from 'react'
import { useOutletContext, Link} from 'react-router-dom'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard'
import Feedback from '../Feedback/Feedback'
import Admin from '../Admin/Admin'
import Account from '../Account/Account'
import Home from '../Home/Home'

require('./SideNav.css')


const SideNav = () => {
  const [page, setPage] = React.useState(<Home />)
  const HomeLink = () => {setPage(<Home />)}
  const DashboardLink = () => {setPage(<Dashboard />)}
  const FeedbackLink = () => {setPage(<Feedback />)}
  const AdminLink = () => {setPage(<Admin />)}
  const LoginLink = () => {setPage(<Login />)}


    return(
        <>
        <nav class="nav-wrapper"><img src = {require('../../../link.png')} width='20em'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</nav>
        <ul id="slide-out" class="sidenav sidenav-fixed">
        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src ={require('../../../iot.png')} width = '200em' left-padding="100"/>
        <li><div onClick={HomeLink}> &nbsp; &nbsp; &nbsp;Home</div></li>
        <li><div onClick={DashboardLink}>&nbsp; &nbsp; &nbsp;Dashboard</div></li>
        <li><div onClick={FeedbackLink}>&nbsp; &nbsp; &nbsp;Feedback</div></li>
        <li><div onClick={AdminLink}>&nbsp; &nbsp; &nbsp;Admin Panel</div></li>
        <li><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></li>
        <li><div onClick={LoginLink}>&nbsp; &nbsp; &nbsp;Account</div></li>       
      </ul>
      <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      
      {page}      
      </>
    )
}









export default SideNav
