import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import WindowScaler from '../WindowComponents/WindowScaler';
import WindowBar from '../WindowComponents/WindowBar';
import MessageContainer from './Components/MessageContainer';

interface ServerProps {

}

const ServerApplication: FC<ServerProps> = () => {
    return (
        <WindowScaler>
            <WindowBar windowName={"ServerWindow"} />
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