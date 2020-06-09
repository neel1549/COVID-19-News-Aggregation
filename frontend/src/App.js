import React from 'react';
import SplashScreen from './components/SplashScreen'
import {Router,Route,Switch} from 'react-router-dom';
import history from './history';
import HomeScreen from './components/HomeScreen'


const App= function(props) {
    return (
    <div>
        <Router history={history}>
            <Switch>
                <Route path= "/" exact component={SplashScreen}/>
                <Route path= "/home" exact component={HomeScreen}/>
       

            </Switch>


        </Router>
        
        

    </div>
    );




}
export default App;



