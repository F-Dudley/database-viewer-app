import React, { FC, useState, useEffect} from 'react';

import './ListViewer.scss';

const ListViewer: FC = () => {

    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Array<any>>([]);
    
    useEffect(() => {
        if (search == "" || search == null) {
            setSearch("*");
        }

        let typingDelay = setTimeout(() => {

            window.api.databaseAPI.send("RequestDataList", 
            {
                database: 'register_of_cars',
                searchRequest: search,
                DescendOrder: false,
            });
            window.api.databaseAPI.receiveOnce("RequestDataList", (data: Array<any>) => {
                setSearchResults(data);
                console.log(data[0]);
            });
        }, 400);

        return () => clearTimeout(typingDelay)
    }, [search])

    return (
        <div className="ListViewer">
            <div className="Searchbar">

                <div className="Searchbar-SearchContainer">
                    <input type="text" autoComplete='off' placeholder="Search Here" name="search" onChange={e => setSearch(e.target.value)} />
                    <button type="submit" >Search</button>
                </div>

            </div>

            {JSON.stringify(searchResults[0])}
        </div>
    )
}

export default ListViewer
