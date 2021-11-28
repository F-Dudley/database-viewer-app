import React, { FC, useEffect, useState } from 'react';

import ServerCallMessage from '../ServerCallMessage';
import UtilButton from '../UtilButton';

import { ServerCall } from '../../../interfaces/ClientDatabaseInterfaces';
import './MessageContainer.scss';

interface MessageContainerProps
{

}

const MessageContainer: FC<MessageContainerProps> = (props) => {

    const [currentCallLog, setCurrentCallLog] = useState<Array<ServerCall>>([])

    useEffect(() => {
        
        window.api.databaseAPI.receive("ReceiveServerCalls", (newServerCall) => {
            setCurrentCallLog([newServerCall as ServerCall].concat(currentCallLog));
        });

        return () => {
            
        }

    }, [])

    return (
        <div className="MainContainer">
            <div className="MessageContainer CenterContainer">
                <div className="MessageContainer_Inner">
                    <ServerCallMessage />
                    {
                        currentCallLog.map((callMessage) => {
                            return (
                                <ServerCallMessage />
                            )
                        })
                    }
                </div>
            </div>
            <div className="UtilButtons CenterContainer">
                <div className="UtilButtons_Inner">
                    <UtilButton buttonTitle={"Restart Database Connection"} onClickFunc={() => {
                        window.api.windowFuncs.send("RestartDatabaseConnection");
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default MessageContainer
