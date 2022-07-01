import React, {useState, useMemo, useCallback} from 'react'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import M from "materialize-css";
import ResourceList from './Videos'


const Learn = () => {

    console.log("lern")
    const formatEmbed = (src) => {
        return <iframe width="300" height="220" src={src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    }

    const generateGrid = useCallback((arr, sectionTitle) => {
        console.log('inside generate')
        let stack = []
        let subStack = []
        arr.forEach(em => {
            subStack.push(<td>{formatEmbed(em.src)} <br /><p style={{fontFamily: 'Trebuchet MS', fontWeight: "bold" , fontSize: "14pt"}}>{em.name}</p> <p style={{fontFamily: 'Trebuchet MS', fontSize: "12pt", fontStyle: "italic" }}>{em.creator}</p> <p><b>{em.length} </b>minutes</p></td>)
            //subStack.push(<td>Hello</td>)
            console.log(subStack)
            if(subStack.length % 3 === 0) {
                subStack.push(<td></td>)
                stack.push(<tr>{subStack}</tr>)
                subStack = []
            }
        }); 
        stack.push(<tr>{subStack}</tr>)
        console.log(stack)
        return <table><tr><tr colSpan="4" style={{border: "0px solid", borderColor: "white"}}><h4>&nbsp;{sectionTitle}</h4></tr></tr>{stack}</table>
    }, [] )
    


    const reactListMemo = useMemo(() => { return generateGrid(ResourceList().React, "React Videos")}, [generateGrid])
    const nodejsListMemo = useMemo(() => { return generateGrid(ResourceList().NodeJS, "NodeJS Videos")}, [generateGrid])
    return(
    <Canvas>
        <Row>
        <Spacer />
        <div class = "col s7 login-canvas card horizontal">
        <h3 style={{marginLeft: "2em"}}> Learning Resources <br /><div style={{fontSize: "22px", color: "grey"}}>Sourced from across the web</div></h3>
        <br />
        </div>
        </Row>
        <Row>
            <Spacer />
            <div class = "col s7 login-canvas card horizontal" >            
                {reactListMemo}                         
            </div>      
        </Row>
        <Row>
            <Spacer />
            <div class = "col s7 login-canvas card horizontal" >
                {nodejsListMemo}
               
                
                              
            </div>
            
        </Row>
    </Canvas>
    )
}


export default Learn