import React from 'react';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';


const Sidebar = () => {
    return (
        <div className="Sidebar">
            <ul>
                <li>
                    <NavLink to="/cars" className="LinkButton" activeClassName="LinkButton-Active">
                        <a>
                            Cars
                        </a>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/owners" className="LinkButton" activeClassName="LinkButton-Active">
                        <a>
                            Owners
                        </a>
                    </NavLink>                
                </li>                  
                <li>
                    <NavLink to="/settings" className="LinkButton" activeClassName="LinkButton-Active">
                        <a>
                            Settings
                        </a>                        
                    </NavLink>                    
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
