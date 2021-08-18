import React, { useState } from 'react';

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

