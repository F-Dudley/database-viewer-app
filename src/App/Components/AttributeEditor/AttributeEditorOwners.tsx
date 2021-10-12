import React, { Component, useEffect, useState, useRef, SyntheticEvent, LegacyRef, EventHandler, FormEvent } from 'react';
import { Route, Switch, NavLink, useRouteMatch, Redirect, useLocation } from 'react-router-dom';

import './AttributeEditor.scss';
import { IOwner } from '../../../interfaces/DatabaseInterfaces';
import { IOwnerResult, ICarRegResult } from '../../../interfaces/ClientDatabaseInterfaces';
import { CheckDate, CheckValue } from '../../Utils';
import QuerySearchResult from '../QuerySearchResult/index';

    let tempData: IOwner;
    tempData = {
        ID: 0,
    };

const AttributeEditorOwners = () => {
    const isMounted = useRef<boolean>(true);
    const match = useRouteMatch();
    const [disabled, setDisabled] = useState<boolean>(true);    
    const [attributes, setAttributes] = useState<IOwner>(tempData);
    const [cars, setCars] = useState<Array<ICarRegResult> | null>([]);
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        
        window.api.databaseAPI.receive("RequestAttributeEdit", ( data: Array<IOwner> ) => {
            if(disabled && isMounted.current) {
                setDisabled(true);
                const dataResult = data[0];
                setAttributes(dataResult);
                window.api.databaseAPI.send("RequestAttributeCars", {database: 'register_of_cars', attributeID: data[0].ID});
                window.api.databaseAPI.receiveOnce("RequestAttributeCars", (carData: ICarRegResult[] | null) => {
                    if(carData !== null) setCars(carData);
                    else setCars([]);
                });            
            }
        });

        return (): void => {
            isMounted.current = false;
        }

    }, []);

    useEffect(() => {
        form.current.reset();
    }, [attributes])

    const enableEdit = () => {
        setDisabled(false);
    };

    const resetEdit = () => {
        form.current.reset();
    }

    const cancelEdit = () => {
        resetEdit();
        setDisabled(true);
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLFormElement;

        const postData: { [key: string]: any} = { };

        for (let i = 0; i < target.length; i++) {
            const element = target[i] as HTMLInputElement;

            for(const [key, value] of Object.entries(attributes)) {
                if(key == element.name) {
                    if(element.type == 'checkbox') {

                        element.checked
                        ?
                            postData[element.name] = 1
                        :
                            postData[element.name] = 0
                    }                   
                    else {
                        if(element.value != '') {
                            postData[element.name] = element.value;
                        }
                    }
                }
            }
        }

        if(Object.keys(postData).length == 0) {
            cancelEdit();
            window.api.requestDialog("RequestDialogMessage", {title: "Attribute Edit Error", message: "No Changed were Found with the Submitted Data.", type: "error"});     
        }
        else {
            window.api.databaseAPI.send("AppendAttributeEdit", {database: 'owners', attributeID: attributes.ID, data: postData});
            setDisabled(true);
            window.api.databaseAPI.send("RequestAttributeEdit", {database: 'owners', attributeID: attributes.ID});            
        }
    };

    return (
        <div className="AttributeEditor">
            <form action="" ref={e => form.current = e}onSubmit={handleSubmit}>
                <div className="MainValues">
                    <div className="SideAlign">
                        <div className="CenteredValues">
                                <label htmlFor="IDInput">ID:</label> 
                                <input type="number" id="IDInput" name={'ID'} value={CheckValue(attributes.ID)} disabled={true}/>                         
                        </div>
                        <div className="CenteredValues">
                            <label htmlFor="OrganisationInput">Organisation:</label>
                            <input type="text" id="OrganisationInput" name={'Organisation'} defaultValue={CheckValue(attributes.Organisation)} disabled={disabled}/> 
                        </div>
                    </div>
                    <div className="SideAlign">
                        <div className="CenteredValues">
                            <label htmlFor="NameInput">Name:</label>
                            <div className="SideAlign">
                                <input type="text" id="NameInput" name={'Name'} defaultValue={CheckValue(attributes.Name)} disabled={disabled} />
                                <input type="text" id="NameInput" name={'Surname'} defaultValue={CheckValue(attributes.Surname)} disabled={disabled}/>
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
                                <input type="string" id="JobTitleInput" name={'Job_Title'} defaultValue={CheckValue(attributes.Job_Title)} disabled={disabled}/>                                   
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="AddressInput">Address:</label>
                                <input type="text" id="AddressInput" name={'Address_First'} defaultValue={CheckValue(attributes.Address_First)} disabled={disabled} size={25}/>
                                <input type="text" id="AddressInput" name={'Address_Second'} defaultValue={CheckValue(attributes.Address_Second)} disabled={disabled} size={25}/>                                                                 
                            </div>
                            <div className="SideAlign">
                                <div className="CenteredValues">
                                    <label htmlFor="TownInput">Town:</label>
                                    <input type="text" id="TownInput" name={'Town'} defaultValue={CheckValue(attributes.Town)} disabled={disabled}/>
                                </div>
                                <div className="CenteredValues">
                                    <label htmlFor="CountyInput">County:</label>
                                    <input type="text" id="CountyInput" name={'County'} defaultValue={CheckValue(attributes.County)} disabled={disabled}/>
                                </div>                                
                            </div>
                            <div className="SideAlign">
                                <div className="CenteredValues">
                                    <label htmlFor="PostCodeInput">Post Code:</label>
                                    <input type="text" id="PostCodeInput" name={'Post_Code'} defaultValue={CheckValue(attributes.Post_Code)} disabled={disabled}/>
                                </div>
                                <div className="CenteredValues">
                                    <label htmlFor="CountryInput">Country:</label>
                                    <input type="text" id="CountryInput" name={'Country'} defaultValue={CheckValue(attributes.Country)} disabled={disabled}/>                                
                                </div>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="PhoneInput">Telephone:</label>
                                <input type="text" id="PhoneInput" name={'Telephone'} defaultValue={CheckValue(attributes.Telephone)} disabled={disabled} size={30}/>
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="EmailInput">Email:</label>
                                <input type="email" id="EmailInput" name={'Email'} defaultValue={CheckValue(attributes.Email)} disabled={disabled} size={30}/>                                     
                            </div>
                            <div className="SideAlign">
                                <div className="CenteredValues">
                                    <label htmlFor="FirstRegInput">First Registered:</label>
                                    <input type="text" id="FirstRegInput" value={CheckDate(attributes.First_Registered)} disabled={true} /> 
                                </div>
                                <div className="CenteredValues">
                                    <label htmlFor="LastUpdateInput">Last Updated:</label>
                                    <input type="text" id="LastUpdateInput" value={CheckDate(attributes.Last_Updated)} disabled={true} /> 
                                </div>
                            </div>
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/cars`}>
                        <div className="OwnerCars">
                            <div className="CarResults">
                                {
                                    cars.map(car => {
                                        return ( <QuerySearchResult key={car.ID} database={null} result={car}/> )
                                    })
                                }                                
                            </div>
                        </div>
                    </Route>
                    <Route exact path={`${match.path}/notes`}>
                        <div className="CenteredValues">
                            <label htmlFor="">Notes: </label>
                            <textarea id="HistoryInput" name={'Notes'} defaultValue={CheckValue(attributes.Notes)} disabled={disabled} cols={50} rows={25}/>                                    
                        </div>
                    </Route>
                </div>
                <div className="MainButtons">
                    <div className="SideAlign">
                        {
                            disabled 
                            ?
                                <>
                                    <div className="CenteredValues">
                                        <a onClick={enableEdit}>Edit</a>                                        
                                    </div>
                                </>
                            :
                                <>
                                    <div className="CenteredValues">
                                        <a onClick={cancelEdit}>Cancel</a>                                    
                                    </div>
                                    <div className="CenteredValues">
                                        <button type="submit">Submit</button>                                    
                                    </div>
                                    <div className="CenteredValues">
                                        <a type="reset" onClick={resetEdit}>Reset</a>                                   
                                    </div>
                                </>
                        }                          
                    </div>
                </div>                
            </form>
        </div>
    )
}


export default AttributeEditorOwners
