import React, { FC, useState, useEffect} from 'react';

import { DatabaseType, ICarRegResult, IOwnerResult } from '../../../interfaces/ClientDatabaseInterfaces';
import QuerySearchResult from './QuerySearchResult';

import './ListViewer.scss';
import { IOwner } from '../../../interfaces/DatabaseInterfaces';

interface ListViewerProps {
    database: DatabaseType
}

const ListViewer: FC<ListViewerProps> = (props) => {

    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<ICarRegResult | IOwnerResult>>([]);

    useEffect(() => {
        setSearch("");
    }, []);        

    useEffect(() => {

        let typingDelay = setTimeout(() => {

            window.api.databaseAPI.send("RequestDataList", 
            {
                database: props.database,
                searchRequest: search,
                DescendOrder: false,
            });
            window.api.databaseAPI.receiveOnce("RequestDataList", (data: Array<ICarRegResult | IOwnerResult>) => {
                setSearchResults(data);
                console.log(data);
            });
        }, 400);

        return () => clearTimeout(typingDelay)
    }, [search, props.database]);

    return (
        <div className="ListViewer">
            <div className="Searchbar">

                <div className="Searchbar-SearchContainer">
                    <input type="text" autoComplete='off' placeholder="Search Here" name="search"  onChange={e => setSearch(e.target.value)} />
                    <button type="submit" >Search</button>
                </div>

            </div>
            <div className="SearchResults">
                {
                    searchResults.map((searchResult) => {
                        return ( <QuerySearchResult key={searchResult.ID} database={props.database} result={searchResult}/> );
                    })
                }                
            </div>
        </div>
    )
}

export default ListViewer
