import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Redirect } from "react-router-dom";





class FacebookAuth extends React.Component {
 

    constructor(props){
        super(props);
        this.state={auth:false,name:"",picture:""}

    }
    

    ResponseFacebook=(response) => {
        console.log(response);
        this.setState({auth:true,name: response.name,picture: response.picture.url });
 
            // Implement backend pushing user login to backend API endpoint

        
    
    
        
    }
    render(){

        if (this.state.auth==false){
  
            return(
               <div>
                <FacebookLogin
                    appId="924907974589378"
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,user_friends"
                    callback={this.ResponseFacebook}
                    icon="fa-facebook" />
                </div>

            
          
            


        )
        }
    else{
        return(
            <Redirect to="/home"></Redirect>
        )
    }
        }
    
}

export default FacebookAuth