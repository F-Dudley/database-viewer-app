import React, { FC } from 'react'
import { DatabaseType, ICarRegResult, IOwnerResult } from '../../../interfaces/ClientDatabaseInterfaces';

import './QuerySearchResults.scss';

interface  QuerySearchResultProps {
    database: DatabaseType;    
    result: ICarRegResult | IOwnerResult | null;
}

const QuerySearchResult: FC<QuerySearchResultProps> = (props) => {

    const onResultClick = () => {
        window.api.databaseAPI.send("RequestAttributeEdit", {database: props.database, attributeID: props.result.ID});            
    }
    
    return (
        <div className="QuerySearchResult">
            <a onClick={onResultClick}>
                <div className="ResultList">
                    {props.result.ID}
                </div>
            </a>
        </div>
    )
}

export default QuerySearchResult
