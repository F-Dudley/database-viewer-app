import { string } from 'prop-types';
import React from 'react';
import { CarRegistryInterface } from '../../../interfaces/DatabaseInterfaces';

import '../../../interfaces/DatabaseInterfaces.ts';
import './ListViewer.scss';

interface ListViewerProps {

}

export default class ListViewer extends React.Component {

    constructor(props: ListViewerProps) {
        super(props);

        this.state = {
            DataEntries: [],
        }
    }

    TestFunc() {
        window.api.databaseAPI.send("Ping", {});
    }

    render() {
        return (
            <div className="ListViewer">
                <div className="Searchbar">

                    <div className="Searchbar-SearchContainer">
                        <input type="text" placeholder="Search..." name="search" />
                        <button type="submit" onClick={this.TestFunc}>Search</button>
                    </div>

                </div>
            </div>
        )
    }
}
