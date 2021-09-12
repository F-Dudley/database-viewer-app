import React, { Component, useEffect, useState} from 'react';
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

    const match = useRouteMatch();
    const [disabled, setDisabled] = useState<boolean>(true);    
    const [attributes, setAttributes] = useState<IOwner>(tempData);

    useEffect(() => {

        window.api.databaseAPI.receive("RequestAttributeEdit", ( data: Array<IOwner> ) => {
            setAttributes(data[0]);
        });        

    });

    const checkDate = (date: Date) => {
        if(date == null) return "";
        else return date.toISOString().split('T')[0];
    }

    return (
        <div className="AttributeEditor">
            <div className="MainValues">
                <table>
                    <tr>
                        <td>
                            <label htmlFor="RumNoInput">
                                ID: <input id="RumNoInput" type="number" value={attributes.ID} disabled={true}/>
                            </label>                                
                         </td>
                        <td>
                            <label htmlFor="OwnerInput">
                                Organisation: <input type="text" value={attributes.Organisation} disabled={disabled}/>
                            </label>                                  
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="ManufacturerInput">
                                Name: <input id="ManufacturerInput" type="text" value={attributes.Name} disabled={disabled}/>
                            </label>
                        </td>
                        <td>
                            <input type="text" id="ModelInput" value={attributes.Surname} disabled={disabled}/>    
                        </td>
                    </tr>
                </table>    
            </div>

            <div className="Tabs">
                <div className="Tabs-Buttons">
                    <NavLink to={`${match.url}/details`} activeClassName="Tabs-ActiveButton">Details</NavLink>
                    <NavLink to={`${match.url}/cars`} activeClassName="Tabs-ActiveButton">Cars</NavLink>
                    <NavLink to={`${match.url}/notes`} activeClassName="Tabs-ActiveButton">Notes</NavLink>
                </div>

                <Route exact path={`${match.url}`}>
                    <Redirect to={`${match.url}/details`} />
                </Route>
                <Route exact path={`${match.url}/details`}>
                    <div className="TableAlign">
                        <table>
                            <tr>
                                <td>
                                    <label htmlFor="JobTitleInput">
                                        Job Title <input type="string" id="JobTitleInput" value={attributes.Job_Title} disabled={disabled}/>
                                    </label>
                                </td>                                        
                            </tr>
                            <tr>                                                    
                                <td>                                                         
                                    <label htmlFor="AddressInput">
                                        Address: <input type="text" id="AddressInput" value={attributes.Address_First} disabled={disabled}/>
                                    </label>
                                </td>
                                <td>
                                    <input type="text" id="AddressInput" value={attributes.Address_Second} disabled={disabled}/>  
                                </td>
                            </tr>
                            <tr>
                                <td>                                                         
                                    <label htmlFor="TownInput">
                                        Town: <input type="text" id="TownInput" value={attributes.Town} disabled={disabled}/>
                                    </label>
                                    </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="CountyInput">
                                        County: <input type="text" id="CountyInput" value={attributes.County} disabled={disabled}/>
                                    </label>                                            
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="PhoneInput">
                                        Telephone: <input type="text" id="PhoneInput" value={attributes.Telephone} disabled={disabled}/>
                                    </label>                                            
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="EmailInput">
                                        Email: <input type="email" id="EmailInput" value={attributes.Email} disabled={disabled}/>
                                    </label>                                            
                                </td>
                            </tr>
                        </table>                                    
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
                    <div className="VerticalAlign">
                        <label htmlFor="">Notes: </label>
                        <textarea id="HistoryInput" cols={50} rows={25} value={attributes.Notes} disabled={disabled}/>                                    
                    </div>
                </Route>
            </div>
        </div>
    )
}


export default AttributeEditorOwners
