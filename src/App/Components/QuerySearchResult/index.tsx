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
            <div className="QuerySearchResult">
                <a onClick={onResultClick}>
                    <div className="ResultList">
                        <label>
                            {results.ID}
                        </label>
                        <div className="vline" />
                        <label>
                            {results.Name}  {results.Surname}
                        </label>
                        <div className="vline" />
                        <label>
                            {results.Organisation}
                        </label>
                        <div className="vline" />
                        <label>
                            {results.County}
                        </label>
                        <div className="vline" />
                        <label>
                            {results.Country}
                        </label>
                    </div>
                </a>
            </div>
        );
    }
    else {
        const results = props.result as ICarRegResult;

        return(
            <div className="QuerySearchResult">
                <a onClick={onResultClick}>
                    <div className="ResultList">
                        <label>{results.ID}</label>
                        <div className="vline" />
                        <label>{results.Make}</label>
                        <div className="vline" />
                        <label>{results.Model}</label>
                        <div className="vline" />
                        <label>{results.Seats}</label>
                    </div>
                </a>
            </div>
        );
    }
}

export default QuerySearchResult