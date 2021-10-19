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

    if(props.database == 'owners') {
        const results = props.result as IOwnerResult;
        return(
            <tr className="QuerySearchResult" onClick={onResultClick}>
                <td>
                    {results.ID}
                </td>
                <td>
                    {results.Name}
                </td>
                <td>
                    {results.Organisation}
                </td>
                <td>
                    {results.County}
                </td>
                <td>
                    {results.Country}
                </td>
            </tr>
        );
    }
    else {
        const results = props.result as ICarRegResult;

        return(
            <tr className="QuerySearchResult" onClick={onResultClick}>
                <td>
                    {results.ID}
                </td>
                <td>
                    {results.Make}
                </td>
                <td>
                    {results.Model}
                </td>
                <td>
                    {results.Seats}
                </td>
            </tr>
        );
    }
}

export default QuerySearchResult