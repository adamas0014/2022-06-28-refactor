import React, { useEffect } from 'react'

import SimpleReadWidget from '../SimpleReadWidget/SimpleReadWidget'
import { CreateAccount, LoginAccount, LogoutAccount, GetSessionAccount, GetProfileFromSession, IsSessionSet } from '../../../Database/UserAPI'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import {GetActiveProfile} from '../Account/Account'
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal'
require('./Dashboard.css')

const addCol = require('./addCol.png')


const Dashboard = (props) => {
  
  const [enabledView, setView] = React.useState('tile')
  useEffect(() => {})
  
  let widgetList = GetProfileFromSession().widgets
  console.log(JSON.stringify(widgetList))
    let addWidgetTemplate = (<div class = "col s2">
    <a class=" waves-effect waves-light" style={{paddingLeft: "3em", paddingTop: "6em", alignContent: "center"}}><img src={require('./addCol.png')} style={{width: "20em"}}/></a>
    </div>)
    const addCb = () => {alert('clicked'); setView('add')}
    let ret = []
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
          
    
      }else{
        return <h1>hjhfigfhsuhfusihf</h1>
      }
      console.log("returning")

      let ret2 = []
      for(let i = 0; i < ret.length; i ++){
        if(i % 5 == 0){
          ret2.push(<br />)
        }
        ret2.push(ret[i])
      }
    

      return <div class = "container">{ret2}</div>
    }

    const wModal = () => {return<><Row><Spacer /><AddWidgetModal reset = {setView}/></Row></>}

    const SetView = (view) => {
      switch(view){
        case 'tile':{
          return <>{TileWidgets()}</>
        }
        case 'add':{
          return <>{wModal()}</>
        }
      }
    }
    
    return(
      <Canvas>
        {SetView(enabledView)}
      </Canvas>
    )
}
/*
*/

export default Dashboard