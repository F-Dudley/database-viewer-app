import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './App.scss';
import AttributeEditor from './Components/AttributeEditor';
import ListViewer from './Components/ListViewer';
import Sidebar from './Components/Sidebar';

const App = () => {
    return (
        <div className="App">
            <Sidebar />
            <ListViewer />
            <AttributeEditor />
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
