import React, { FC } from 'react'
import { DatabaseType } from '../../../interfaces/ClientDatabaseInterfaces';

import './ServerCallMessage.scss';

interface CallMessageProps {
    responseMessage: 200 | 500;
    databaseRequest: DatabaseType;
}

const ServerCallMessage: FC<CallMessageProps> = (props) => {
    return (
        <tr className="CallMessage">
            <td>
                200
            </td>
            <td>
                owner
            </td>
            <td>
                Test tes
            </td>
        </tr>
    )
}

export default ServerCallMessage
