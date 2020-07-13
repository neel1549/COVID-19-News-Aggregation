import React from 'react';
import {Animated} from "react-animated-css";
import Jumbotron from 'react-bootstrap/Jumbotron'
import SignInForm from './SignInForm';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const splash = require('../assets/images/mick-haupt-VE9DQ7zm22Y-unsplash.jpg');
const icon= require('../assets/images/fusion-medical-animation-EAgGqOiDDMg-unsplash.jpg')
const style = {
  width: '100%',
  height: '800px',
  backgroundImage: `url(${splash})`,
  backgroundSize: 'cover',
  opacity: 0.80,
  
  zIndex:-1

};

export default class SplashScreen  extends React.Component {
  render() {
    return (
    <div className='screen'>
        <div className='content'>
            <div className='Header'>
              
              
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} style={{position: 'absolute', zIndex:1, top:'32%',left:'70%' }}>
              
                    <div style={{top:'10%'}} className='container'>
                        
                  
                        <Jumbotron style={{border:'2px solid gray ', opacity:0.80, boxShadow: '5px'}}>
                          <SignInForm/>
                        
                        </Jumbotron>
                        
                    </div>

                   

                </Animated>
                
            </div>
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true} animationInDuration={2000}  style={style}>

            <div style={{zIndex:1,opacity: '0.65', boxShadow:'2px solid gray'}}>
              <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home"><em>COVID-19 Utility Guide</em></Navbar.Brand>
          
            </Navbar>
            </div>
  
            
            </Animated>
    
       </div>
    </div>
    );
  }
}