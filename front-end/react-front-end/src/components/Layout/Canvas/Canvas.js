import React from 'react'

const Canvas = (props) => {
    return ( 
    <>
        
            {props.children}
        
        </>
    )
}

const Row = (props) => {
    return(
        <div class="row">
            {props.children}
        </div>
    )
}
const Spacer = () =>{
    return(<div class="col s2">Spacer</div>)
}
export {
    Canvas,
    Row,
    Spacer
}


/*


*/ 