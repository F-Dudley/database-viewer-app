import React, { FC, useState, useEffect} from 'react';

import { DatabaseType, ICarRegResult, IOwnerResult } from '../../../interfaces/ClientDatabaseInterfaces';
import QuerySearchResult from '../QuerySearchResult';

import './ListViewer.scss';
import { IOwner } from '../../../interfaces/DatabaseInterfaces';

interface ListViewerProps {
    database: DatabaseType
}

const ListViewer: FC<ListViewerProps> = (props) => {

    const [search, setSearch] = useState<string>("");
    const [database, setDatabase] = useState<boolean>(true);
    const [searchResults, setSearchResults] = useState<Array<ICarRegResult | IOwnerResult>>([]);

    useEffect(() => {

    }, []);        

    useEffect(() => {

        if(props.database == 'register_of_cars') {
            setDatabase(true);
        }
        else {
            setDatabase(false);
        }

        const typingDelay = setTimeout(() => {

            window.api.databaseAPI.send("RequestDataList", 
            {
                database: props.database,
                searchRequest: search,
                DescendOrder: false,
            });
            window.api.databaseAPI.receiveOnce("RequestDataList", (data: Array<ICarRegResult | IOwnerResult>) => {
                setSearchResults(data);
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
                <table>
                    <thead>
                        <tr>
                            {
                                database
                                ?
                                    <>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Make
                                        </th>
                                        <th>
                                            Model
                                        </th>
                                        <th>
                                            Seats
                                        </th>
                                    </>
                                :
                                    <>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Name
                                        </th>
                                        <th>
                                            Organisation
                                        </th>
                                        <th>
                                            County
                                        </th>
                                        <th>
                                            Country
                                        </th>
                                    </>
                            }
                        </tr>                        
                    </thead>
                    <tbody>
                        {
                            searchResults.map((searchResult) => {
                                return ( <QuerySearchResult key={searchResult.ID} database={props.database} result={searchResult}/> );
                            })
                        }                        
                    </tbody>
                </table>             
            </div>
        </div>
    )
}

export default ListViewer
