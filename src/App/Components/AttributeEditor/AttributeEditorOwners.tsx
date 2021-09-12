import React, { Component, useEffect, useState} from 'react';
import { Route, Switch, NavLink, useRouteMatch, Redirect } from 'react-router-dom';

import './AttributeEditor.scss';
import { IOwner } from '../../../interfaces/DatabaseInterfaces';
import { IOwnerResult } from '../../../interfaces/ClientDatabaseInterfaces';

const AttributeEditorOwners = () => {
    const match = useRouteMatch();
    const [attributes, setAttributes] = useState<IOwner>(null);
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        console.log("Connecting to Channel.");
        window.api.databaseAPI.receive("RequestAttributeEdit", ( data: Array<IOwner> ) => {
            console.log(data);
            setAttributes(data[0]);
        });        

    }, []);

    return (
        <div className="AttributeEditor">
            <div className="MainValues">
                <table>
                    <tr>
                        <td>
                            <label htmlFor="RumNoInput">
                                ID: <input id="RumNoInput" type="number" value={attributes.ID} disabled={disabled} />
                            </label>                                
                         </td>
                        <td>
                            <label htmlFor="OwnerInput">
                                Owner: <input type="text" value={''} disabled={disabled}/>
                            </label>                                  
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="ManufacturerInput">
                                Manufacturer: <input id="ManufacturerInput" type="text" value={'MANUFACTURER HERE'} />
                            </label>
                        </td>
                        <td>
                            <label htmlFor="ModelInput">
                                Model: <input type="text" id="ModelInput" value={'Car Model'}/>
                            </label>    
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
                                            <label htmlFor="OrganisationInput">
                                                Organisation: <input type="text" id="OrganisationInput" value={'test'}/>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="JobTitleInput">
                                                Job Title <input type="string" id="JobTitleInput" value={'2000-12-04'}/>
                                            </label>
                                        </td>                                        
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="NameInput">
                                                Name: <input type="text" id="NameInput" value={'test'} /> 
                                            </label>
                                        </td>
                                        <td>
                                            <input type="text" id="NameInput" value={'test'} />
                                        </td>
                                    </tr>
                                    <tr>                                                    
                                        <td>                                                         
                                            <label htmlFor="AddressInput">
                                                Address: <input type="text" id="AddressInput" value={'1962-10-17'} />
                                            </label>
                                        </td>
                                        <td>
                                            <input type="text" id="AddressInput" value={'BLUE/WHITE'}/>  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>                                                         
                                            <label htmlFor="TownInput">
                                                Town: <input type="text" id="TownInput" value={'1962-10-17'} />
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="CountyInput">
                                                County: <input type="text" id="CountyInput" value={'1962-10-17'} />
                                            </label>                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="PhoneInput">
                                                Telephone: <input type="text" id="PhoneInput" value={'1962-10-17'} />
                                            </label>                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="EmailInput">
                                                Email: <input type="email" id="EmailInput" value={''} />
                                            </label>                                            
                                        </td>
                                    </tr>
                                </table>                                    
                            </div>
                        </Route>
                        <Route exact path={`${match.path}/cars`}>
                            <div className="VerticalAlign">
                                <label htmlFor="MakeInput">
                                    Make: <input type="text" id="MakeInput" value={'Engine Make'}/>
                                </label>
                                <label htmlFor="TypeInput">
                                    Type: <input type="text" id="TypeInput" value={'Engine Type'}/>
                                </label>
                                <label htmlFor="NumberInput">
                                    Number: <input type="text" id="NumberInput" value={'Engine Number'} />
                                </label>
                                <label htmlFor="RatingInput">
                                    Rating(cc) <input type="text" id="RatingInput" value={'Engine CC Rating'} />
                                </label>
                            </div>
                        </Route>
                        <Route exact path={`${match.path}/notes`}>
                            <div className="VerticalAlign">
                                <label htmlFor="">History: </label>
                                <textarea id="HistoryInput" cols={50} rows={25} />                                    
                            </div>
                        </Route>
                </div>

        </div>
    )
}


export default AttributeEditorOwners
