import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import WindowScaler from './Components/WindowScaler';
import WindowBar from './Components/WindowBar';
import MessageContainer from './Components/MessageContainer';

interface ServerProps {

}

const ServerApplication: FC<ServerProps> = () => {
    return (
        <WindowScaler>
            <WindowBar />
            <MessageContainer />
        </WindowScaler>
    )
}

export default ServerApplication;

ReactDOM.render(
    <React.StrictMode>
        <ServerApplication />
    </React.StrictMode>,
    document.getElementById("AppRoot")
);