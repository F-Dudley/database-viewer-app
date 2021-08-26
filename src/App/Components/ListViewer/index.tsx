import React, { Component } from 'react';

import './ListViewer.scss';

interface ListViewerProps {

}

export default class ListViewer extends Component {

    constructor(props: ListViewerProps) {
        super(props);
        window
    }

    render() {
        return (
            <div className="ListViewer">
                <div className="Searchbar">

                    <div className="Searchbar-SearchContainer">
                        <input type="text" placeholder="Search..." name="search" />
                        <button type="submit">Search</button>
                    </div>

                </div>
            </div>
        )
    }
}
