import React, { FC } from 'react'
import { DatabaseType, ICarRegResult, IOwnerResult } from '../../../../interfaces/ClientDatabaseInterfaces';

interface  QuerySearchResultProps {
    database: DatabaseType;    
    result: ICarRegResult | IOwnerResult;
}

const QuerySearchResult: FC<QuerySearchResultProps> = (props) => {
    
    const onResultClick = () => {
        console.log('Gettings ID: ', props.result.ID);
        window.api.databaseAPI.send("RequestAttributeEdit", {database: props.database, attributeID: props.result.ID});
    }
    
    return (
        <div className="QuerySearchResult">
            <a onClick={onResultClick}>
                Click Here: {props.result.ID}
            </a>
        </div>
    )
}

export default QuerySearchResult
