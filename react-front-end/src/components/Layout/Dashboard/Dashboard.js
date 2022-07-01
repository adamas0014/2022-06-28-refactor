import React, { useEffect } from 'react'

import SimpleReadWidget from '../SimpleReadWidget/SimpleReadWidget'
import { CreateAccount, LoginAccount, LogoutAccount, GetSessionAccount, GetProfileFromSession, IsSessionSet } from '../../../Database/UserAPI'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import {GetActiveProfile} from '../Account/Account'
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal'
import ProfileContext from '../../../Context'
import AddWidgetWidget from '../AddWidgetWidget/AddWidgetWidget'
require('./Dashboard.css')



const Dashboard = (props) => {
  
  const [profile, setProfile] = React.useContext(ProfileContext)

  const [view, setView] = React.useState((profile.email !== null) ? 'tile' : 'noLogin')
  const setViewToAdd = () => setView('add')
  const setViewToTile = () => setView('tile')
  console.log("Dashboard: ", view)

  const TileWidgets = () => {
    console.log("TileWidgets")
    if(!profile)
      return(<><p style={{marginLeft: "40em"}}>Please Log In</p></>)

    

    let stack = []
    let subStack = []
    stack.push(<div class = "col s2.5"></div>)

    profile.widgets.forEach((em, i) => {
      
      
      console.log(em)
      subStack.push(<td style={{width: "20em" }}><SimpleReadWidget element={em} /></td>)

     

      if((((i+1) % 5) === 0) && (i > 0)){
        console.log("fifth", i)
        stack.push(<tr style={{border: "0pt solid"}}> { subStack }  <br /></tr>)
        subStack = []
      }
      
    });
    
     
    stack.push(<tr style={{border: "0pt solid"}}>{subStack} <AddWidgetWidget callback={setViewToAdd} /></tr>)

    return (<div class = "container"><Row><Spacer /><table>{stack}</table></Row></div>)
  }


    
    const AddModal = () => {return<><Row><Spacer /><AddWidgetModal view = {setViewToTile}/></Row></>}

    const SetView = () => {
      switch(view){
        case 'tile':{
          return TileWidgets()
          break
        }
        case 'add':{
          return AddModal()
          break;
        }
        case 'edit': {
          return <></>
          break
        }
        case 'noLogin':{
          console.log("ree")
          return (<>
            <Row>
            <Spacer />
            <div class="col s5">
            <div className="login-canvas card horizontal">
            <h4 style={{fontFamily: 'Trebuchet MS', marginLeft: "3em"}} > 
              Please Login To View Your Dashboard 
            </h4> 
            </div>
            </div>
            </Row>
          </>)

          break
        }
      }
    }
    
    return(
      <Canvas>
        {SetView()}
      </Canvas>
    )
}
/*
  
*/

export default Dashboard


/*

const TileWidgets = () => {
      if(widgetList.length !== null){
        console.log("NOT NULL")
        //ret.push(<div class = "col s2.5"></div>)
        for(let i = 0; i < widgetList.length; i++){
          widgetList[i].key = i
          console.log(widgetList[i])
          
          ret.push(<td style={{width: "10rem"}}><SimpleReadWidget element={widgetList[i]} /> </td>)
          console.log("LOOPED")
        }
        ret.push(<td style={{width: "25rem"}}><img style={{width: "20em"}} src={addCol}  onClick = {addCb}></img></td>)
          


      let ret2 = []
      for(let i = 0; i < ret.length; i ++){
        if(i % 5 == 0){
          ret2.push(<br />)
        }
        ret2.push(ret[i])
      }
    

      return <div class = "container">{ret2}</div>
    }


*/

