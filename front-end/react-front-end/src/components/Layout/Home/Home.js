import React from 'react'
import {Canvas, Row, Spacer} from '../Canvas/Canvas'
import M from "materialize-css";
require('./Home.css')

const Home = () => {
    React.useEffect(() => {
        M.AutoInit();
       }, []);
    return(
    <Canvas>
        <Row>
        <Spacer />
        <div class = "col s7 login-canvas card horizontal">
        <h3 style={{marginLeft: "2em"}}> Welcome to the McMaster SEPT IoT Dashboard <br /><div style={{fontSize: "22px", color: "grey"}}>Developed through funding provided by the Future Skills Centre (FSC)</div></h3>
        <br />
        </div>
        </Row>
        <Row>
            <Spacer />
            <div class = "col s7 login-canvas card horizontal">
            <div style={{marginLeft: "5em", marginRight: "7em", marginTop: "1em"}}> <h5>About this Project</h5><p> The goal of this project is to develop an open-source IoT platform that can be used by students, educators, and the general public
                to demonstrate IoT concepts like networks, data analysis, and the connection of resource-constrained devices.</p>
                
                <iframe style={{marginLeft: "1em"}} width="560" height="315" src="https://www.youtube.com/embed/c-_vr_RP-ms" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <h5><br />Technologies Used</h5>
    <ul class="collapsible" style={{marginLeft: "1em", marginTop: "2.5em", width: "60em"}}>
    <li>
      <div class="collapsible-header"><i class="material-icons">filter_drama</i>Javascript Programming Language</div>
      <div class="collapsible-body"><span>Javascript is a scripting language that is used to perform dynamic functionality in web browsers such as animations. 
          It works together with HTML and CSS to bring an improved user experience from traditional HTML/CSS web pages. Javascript is dynamically typed when compared
          with more traditional compiled languages like C/C++. This means that a variable which holds an integer value can be re-assigned to a string, boolean, etc.
          Having a dynamically typed language can dramatically reduce the learning curve to adopting the new language. The way that Javascript dynamically 
          modifies web page elements is through events. These events can be <i>onClick, onChange, onChange, etc.</i> When these events are triggered, the parser handles the 
          object replacement, typically through an <i>id</i> identifier. 
          
          <br /><br />
          <ul>
            <li>Codecademy <a href="https://www.codecademy.com/learn/introduction-to-javascript">Here</a></li>
            <li> YouTube <a href="https://youtu.be/PkZNo7MFNFg">Here</a> </li>
          </ul>
          </span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">place</i>React Development Framework</div>
      <div class="collapsible-body"><span>React is a Javascript library that is used to develop web applications. It is focused around 3 primary concepts: 
          <ol><li>Declarative Programming</li><li>Encapsulation of Logic into Components</li><li>Cross-Plaform Support</li></ol>
          <br /> More infomation can be found at the following links:
          <ul><li>React Website <a href="https://reactjs.org/">Here</a></li></ul></span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">whatshot</i>NodeJS Runtime Environment</div>
      <div class="collapsible-body"><span>NodeJS is an asynchronous event-driven Javascript runtime. What this means is that it enables Javascript to 
          run on the server-side back-end of your web application. NodeJS itself, is written in C & C++. 
          <ul><li><br /></li><li>NodeJS Website <a href="https://nodejs.dev/">Here</a></li></ul></span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">whatshot</i>MongoDB No-SQL Database</div>
      <div class="collapsible-body"><span>MongoDB is a database that is popular within the Javascript community because it is focused around objects, and queried with Javascript syntax.
          <ul><li><br /></li><li>MongoDB Website <a href="mongodb.com/what-is-mongodb">Here</a></li></ul></span></div>
    </li>
  </ul>
  <br />
  </div>
            </div>
        </Row>
    </Canvas>
    )
}

export default Home