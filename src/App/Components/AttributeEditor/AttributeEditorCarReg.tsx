import React, { Component, FormEvent, useEffect, useState, useRef } from 'react';
import { Route, Switch, NavLink, useRouteMatch, Redirect } from 'react-router-dom';

import './AttributeEditor.scss';
import { ICarRegistry } from '../../../interfaces/DatabaseInterfaces';

const AttributeEditorCarReg = () => {
    let tempData: ICarRegistry;
    let date = new Date();

    tempData = {
        ID: 0,
        Make: "",
        Model: "",
        Invalid_Carriage: 0,
        Reg_No: "",
        Chassis_No: "",
        Manufactured: 0,
        First_Reg_DVLC: date,
        First_Reg_RUM: date,
        Colour: "",
        Drive: "C",
        Wheels: 0,
        Seats: "",
        Engine_Make: "",
        Engine_Type: "",
        Engine_No: "",
        Engine_Rating: 0,
        Condition: "",

        Owner_ID: 0,
        Current_Owner: "",
        Current_Owner2: "",
        OwnerChange: date,
        Previous_Owners: "",

        History: "",
        MOT: date,
        Documentation: "",
        Photo: 0,

        LastUpdated: date,
        Scraped: 0,
        Deleted: 0
    }

    const isMounted = useRef<boolean>(true)
    const match = useRouteMatch();
    const [attributes, setAttributes] = useState<ICarRegistry>(tempData);
    const [disabled, setdisabled] = useState<boolean>(true);

    useEffect(() => {

        window.api.databaseAPI.receive("RequestAttributeEdit", ( data: Array<ICarRegistry> ) => {
            setAttributes(data[0]);
        });        

        return (): void => {
            isMounted.current = false;
        }
        
    }, []);

    const checkDate = (date: Date) => {
        if(date == null) return "";
        else return date.toISOString().split('T')[0];
    };

    const enableEdit = () => {

    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
    };

    return (
        <div className="AttributeEditor">
            <form method="POST" onSubmit={handleSubmit}>

                <div className="MainValues">
                    <div className="SideAlign">
                        <div className="CenteredValues">
                            <label htmlFor="RumNoInput">ID:</label> 
                            <input id="RumNoInput" type="number" value={attributes.ID} disabled={true}/>                         
                        </div>
                        <div className="CenteredValues">
                            <label htmlFor="OwnerInput">Owner:</label>
                            <input type="text" value={attributes.Current_Owner} disabled={disabled}/>                        
                        </div>                           
                    </div>
                    <div className="SideAlign">
                        <div className="CenteredValues">
                            <label htmlFor="ManufacturerInput">Manufacturer:</label> 
                            <input id="ManufacturerInput" type="text" value={attributes.Make} disabled={disabled}/>                           
                        </div>
                        <div className="CenteredValues">
                            <label htmlFor="ModelInput">Model:</label>
                            <input type="text" id="ModelInput" value={attributes.Model} disabled={disabled}/>                            
                        </div>
                    </div>
                </div>

                <div className="FormTabs">

                    <div className="FormTabs-Buttons">
                        <NavLink to={`${match.url}/vehicle_details`} activeClassName="Tabs-ActiveButton">Vehicle Details</NavLink>
                        <NavLink to={`${match.url}/engine_details`} activeClassName="Tabs-ActiveButton">Engine Details</NavLink>
                        <NavLink to={`${match.url}/rum_data`} activeClassName="Tabs-ActiveButton">RUM Details</NavLink>
                        <NavLink to={`${match.url}/history`} activeClassName="Tabs-ActiveButton">History</NavLink>
                        <NavLink to={`${match.url}/documentation`} activeClassName="Tabs-ActiveButton">Documentation</NavLink>
                        <NavLink to={`${match.url}/images`} activeClassName="Tabs-ActiveButton">Images</NavLink>
                    </div>

                    <Route exact path={`${match.url}`}>
                        <Redirect to={`${match.url}/vehicle_details`} />
                    </Route>

                    <Route exact path={`${match.url}/vehicle_details`}>
                        <div className="CenteredValues">
                            <label htmlFor="RegNoInput">Reg No:</label>
                            <input type="text" id="RegNoInput" value={attributes.Reg_No} disabled={disabled}/>                                    
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="ManufDateInput">
                                    Manufactured Date: 
                                </label>
                                <input type="text" id="ManufDateInput" value={attributes.Manufactured} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="ChassisNoInput">Chassis No:</label>
                                <input type="text" id="ChassisNoInput" value={attributes.Chassis_No} disabled={disabled}/>                                
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="DriveInput">Drive:</label>
                                <input type="text" id="DriveInput" value={attributes.Drive} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="ColourInput">Colour:</label>
                                <input type="text" id="ColourInput" value={attributes.Colour} disabled={disabled}/>                                  
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="SeatsInput">Seats:</label>
                                <input type="number" id="SeatsInput" value={attributes.Seats} disabled={disabled}/>
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="WheelsInput">Wheels:</label>
                                <input type="number" id="WheelsInput" value={attributes.Wheels} disabled={disabled}/>
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="MOTInput">MOT:</label>
                                <input type="date" id="MOTInput" value={checkDate(attributes.MOT)} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="1stRegDVLCInput">1st Reg DVLC:</label>
                                <input type="date" id="1stRegDVLCInput" value={checkDate(attributes.First_Reg_DVLC)} disabled={disabled}/>                                
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="ConditionInput">Condition:</label>
                                <input type="text" id="ConditionInput" value={attributes.Condition} disabled={disabled}/>                                      
                            </div>
                        </div>       
                    </Route>

                    <Route exact path={`${match.path}/engine_details`}>
                        <div className="VerticalAlign">
                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="MakeInput">Make:</label>
                                <input type="text" id="MakeInput" value={attributes.Engine_Make} disabled={disabled}/>                                
                            </div>

                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="TypeInput">Type:</label>
                                <input type="text" id="TypeInput" value={attributes.Engine_Type} disabled={disabled}/>                            
                            </div>
                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="NumberInput">Number:</label>
                                <input type="text" id="NumberInput" value={attributes.Engine_No} disabled={disabled}/>                            
                            </div>
                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="RatingInput">Rating(cc)</label>                            
                                <input type="text" id="RatingInput" value={attributes.Engine_Rating} disabled={disabled}/>
                            </div>                            
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/rum_data`}>
                        <div className="VerticalAlign">
                            <div className="CenteredValues">
                                <label htmlFor="RUMRegInput">1st RUM Registered:</label>
                                <input type="date" id="RUMRegInput" value={checkDate(attributes.First_Reg_RUM)} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="OwnerIDInput">Owner ID:</label>
                                <input type="number" value={attributes.Owner_ID} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="OwnerChangeInput">Owner Change:</label>
                                <input type="date" id="OwnerChangeInput" value={checkDate(attributes.OwnerChange)} disabled={disabled}/>
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="PrevOwnersInput">Previous Owners:</label>
                                <input type="text" id="PrevOwnersInput" value={attributes.Previous_Owners} disabled={disabled}/>
                            </div>
                            <div className="SideAlign">
                                <div className="CenteredValues">
                                    <label htmlFor="PhotoInput">Photo(s):</label>
                                    <input type="checkbox" value={attributes.Photo} disabled={disabled}/>
                                </div>
                                <div className="CenteredValues">
                                    <label htmlFor="LastUpdateInput">Last Updated:</label>
                                    <input type="date" id="LastUpdateInput" value={checkDate(attributes.LastUpdated)} disabled={disabled}/>
                                </div>                                
                            </div>
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/history`}>
                        <div className="CenteredValues">
                            <label htmlFor="">History: </label>
                            <textarea id="HistoryInput" cols={50} rows={25} value={attributes.History} disabled={disabled}/>                                    
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/documentation`}>
                        <div className="CenteredValues">
                            <label htmlFor="DocumentationInput">Documentation:</label>
                            <textarea name="" id="DocumentationInput" cols={50} rows={25} value={attributes.Documentation} disabled={disabled}/>                                    
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/images`}>
                                
                    </Route>
                    
                </div>
                <div className="MainButtons">
                    <div className="SideAlign">
                        {
                            disabled 
                            ?
                                <>
                                    <div className="CenteredValues">
                                        <button>Edit</button>                                        
                                    </div>
                                </>
                            :
                                <>
                                    <div className="CenteredValues">
                                        <button type="button">Cancel</button>                                    
                                    </div>
                                    <div className="CenteredValues">
                                        <button type="submit">Submit</button>                                    
                                    </div>
                                    <div className="CenteredValues">
                                        <button type="reset">Reset</button>                                    
                                    </div>
                                </>
                        }                          
                    </div>
                </div>
            </form>
        </div>
    )
}


export default AttributeEditorCarReg
