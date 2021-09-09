import React from 'react';

import './Sidebar.scss';


const Sidebar = () => {
    return (
        <div className="Sidebar">
            <ul className="Sidebar-List">
                <li className="Sidebar-ListItem">
                    <a className="Sidebar-ListItem-Link">
                        Settings
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
