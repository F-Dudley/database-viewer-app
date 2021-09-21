import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';


const Sidebar = () => {
    return (
        <div className="Sidebar">
            <ul>
                <li>
                    <NavLink to="/cars" className="LinkButton" activeClassName="LinkButton-Active">
                        Cars
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/owners" className="LinkButton" activeClassName="LinkButton-Active">
                        Owners
                    </NavLink>                
                </li>
                <li>
                    <NavLink to="/newentry" className="LinkButton" activeClassName="LinkButton-Active">
                        Add Entry
                    </NavLink>
                </li>                
                <li>
                    <NavLink to="/settings" className="LinkButton" activeClassName="LinkButton-Active">
                        Settings
                    </NavLink>                    
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
