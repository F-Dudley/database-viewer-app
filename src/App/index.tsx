import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.scss';
import ListViewer from './Components/ListViewer';
import Sidebar from './Components/Sidebar';
import {AttributeEditorCarReg, AttributeEditorOwners} from './Components/AttributeEditor';

import NewEntry from './Components/NewEntry';

const App = () => {
    return (
        <div className="App">
            <Router>            
                <Sidebar />
                <Switch>
                    <Route path='/cars'>
                        <ListViewer database='register_of_cars' />
                        <AttributeEditorCarReg />                    
                    </Route>
                    <Route path='/owners'>
                        <ListViewer database='owners'/>
                        <AttributeEditorOwners />
                    </Route>
                    <Route path='/newentry'>
                        <NewEntry />
                    </Route>
                    <Route path='/settings'>
                        
                    </Route>
                    <Route path='*'>
                        <Redirect to='/cars'/>
                    </Route>             
                </Switch>
            </Router>
        </div>                     
    )
}

export default App

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("AppRoot")
);

/* 
    If you looking at this Code Don't Go Any Further Than This.
    For Your Own Sake TBF.

    I Can Tell In The Future This Will Make Me Laugh.

    Contact Me if u need help with this:
    
    Linked-In: https://www.linkedin.com/in/finn-dudley-517292197/

*/