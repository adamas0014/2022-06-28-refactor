import React from 'react'

const AddWidgetWidget = (props) => {
    return (     
        <div style={{marginTop: "1.5em"}}>
        <div class="card" style={{width: "20rem", height: "31.9rem"}}>
        <div style={{width: "25rem"}}><img style={{width: "20em", marginTop: "6em"}} src={require('./addCol.png')}  onClick = {props.callback}></img></div>    
        </div>
        </div>
        )
}



export default AddWidgetWidget


/*
<div class="card" style={{width: "20rem"}}>
<div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src={require("./tempSensor.jpg")} />
    </div>
    <div class="card-content">
      <span class="card-title grey-text text-darken-4">{props.element.title}<a href="#"><i class="material-icons right">mode_edit</i></a></span>
      <span class="grey-text text-darken-5"> <p>&nbsp;{"Location: " + props.element.location} </p> </span>
      <span class="grey-text text-darken-5"> <p>&nbsp;{"Reading: " + props.element.reading + " " + props.element.units} </p> </span>
      <span><br /></span>
      
      <div class = "activator waves-effect waves-block waves-light"><a href="#">More Info</a></div>

    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">{props.element.title}<i class="material-icons right">close</i></span>
      <p>{props.element.description}</p>
      
          <form>
              <label>MyButton</label>
              <button>Hello</button>
          </form>
      
    </div>
  </div>)
*/