import React, { Component, useEffect, useState, useRef} from 'react';
import { Route, Switch, NavLink, useRouteMatch, Redirect } from 'react-router-dom';

import './AttributeEditor.scss';
import { IOwner } from '../../../interfaces/DatabaseInterfaces';
import { IOwnerResult } from '../../../interfaces/ClientDatabaseInterfaces';

const AttributeEditorOwners = () => {
    let tempData: IOwner;
    let date = new Date();
    tempData = {
        ID: 0,
        Name: "",
        Surname: "",
        Organisation: "",
        Job_Title: "",
        Address_First: "",
        Address_Second: "",
        Town: "",
        County: "",
        Post_Code: "",
        Country: "",
        Email: "",
        Telephone: "",
        Notes: "",

        Registered: date,
        Last_Updated: date,
        Active: 0
    };

    const isMounted = useRef<boolean>(true);
    const match = useRouteMatch();
    const [disabled, setDisabled] = useState<boolean>(true);    
    const [attributes, setAttributes] = useState<IOwner>(tempData);

    useEffect(() => {
        window.api.databaseAPI.receive("RequestAttributeEdit", ( data: Array<IOwner> ) => {
            setAttributes(data[0]);
        });        

        return (): void => {
            isMounted.current = false;
        }
        
    }, []);

    const checkDate = (date: Date) => {
        if(date == null) return "";
        else return date.toISOString().split('T')[0];
    }

    return (
        <div className="AttributeEditor">
            <form action="">
                <div className="MainValues">
                    <div className="SideAlign">
                        <div className="CenteredValues">
                                <label htmlFor="IDInput">ID:</label> 
                                <input id="IDInput" type="number" value={attributes.ID} disabled={true}/>                         
                        </div>
                        <div className="CenteredValues">
                            <label htmlFor="OrganisationInput">Organisation:</label>
                            <input type="text" id="OrganisationInput" value={attributes.Organisation} disabled={disabled}/> 
                        </div>
                    </div>
                    <div className="SideAlign">
                        <div className="CenteredValues">
                            <label htmlFor="NameInput">Name:</label>
                            <div className="SideAlign">
                                <input type="text" id="NameInput"  value={attributes.Name} disabled={disabled}/>
                                <input type="text" id="NameInput" value={attributes.Surname} disabled={disabled}/>
                            </div>                            
                        </div>
                    </div>                
                </div>

                <div className="FormTabs">
                    <div className="FormTabs-Buttons">
                        <NavLink to={`${match.url}/details`} activeClassName="Tabs-ActiveButton">Details</NavLink>
                        <NavLink to={`${match.url}/cars`} activeClassName="Tabs-ActiveButton">Cars</NavLink>
                        <NavLink to={`${match.url}/notes`} activeClassName="Tabs-ActiveButton">Notes</NavLink>
                    </div>

                    <Route exact path={`${match.url}`}>
                        <Redirect to={`${match.url}/details`} />
                    </Route>
                    <Route exact path={`${match.url}/details`}>
                        <div className="VerticalAlign">
                            <div className="CenteredValues">
                                <label htmlFor="JobTitleInput">Job Title:</label>
                                <input type="string" id="JobTitleInput" value={attributes.Job_Title} disabled={disabled}/>                                   
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="AddressInput">Address:</label>
                                <input type="text" id="AddressInput" value={attributes.Address_First} disabled={disabled} size={25}/>
                                <input type="text" id="AddressInput" value={attributes.Address_Second} disabled={disabled} size={25}/>                                                                 
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="TownInput">Town:</label>
                                <input type="text" id="TownInput" value={attributes.Town} disabled={disabled}/>
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="CountyInput">County:</label>
                                <input type="text" id="CountyInput" value={attributes.County} disabled={disabled}/>
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="PhoneInput">Telephone:</label>
                                <input type="text" id="PhoneInput" value={attributes.Telephone} disabled={disabled} size={30}/>
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="EmailInput">Email:</label>
                                <input type="email" id="EmailInput" value={attributes.Email} disabled={disabled} size={30}/>                                     
                            </div>
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/cars`}>
                        <div className="VerticalAlign">
                            <div>
                                {
                                    // Map Owners Cars
                                }
                            </div>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/notes`}>
                        <div className="CenteredValues">
                            <label htmlFor="">Notes: </label>
                            <textarea id="HistoryInput" cols={50} rows={25} value={attributes.Notes} disabled={disabled} />                                    
                        </div>
                    </Route>
                </div>                
            </form>
        </div>
    )
}


export default AttributeEditorOwners
