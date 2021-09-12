import React, { Component, useEffect, useState} from 'react';
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

    const match = useRouteMatch();
    const [attributes, setAttributes] = useState<ICarRegistry>(tempData);
    const [disabled, setdisabled] = useState<boolean>(true);

    useEffect(() => {

        window.api.databaseAPI.receive("RequestAttributeEdit", ( data: Array<ICarRegistry> ) => {
            setAttributes(data[0]);
        });        

    });

    const checkDate = (date: Date) => {
        if(date == null) return "";
        else return date.toISOString().split('T')[0];
    }

    return (
        <div className="AttributeEditor">
            <form action={''}>
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
                                    Owner: <input type="text" value={attributes.Current_Owner} disabled={disabled}/>
                                </label>                                  
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="ManufacturerInput">
                                    Manufacturer: <input id="ManufacturerInput" type="text" value={attributes.Make} disabled={disabled}/>
                                </label>
                            </td>
                            <td>
                                <label htmlFor="ModelInput">
                                    Model: <input type="text" id="ModelInput" value={attributes.Model} disabled={disabled}/>
                                </label>    
                            </td>
                        </tr>
                    </table>    
                </div>

                    <div className="Tabs">
                        <div className="Tabs-Buttons">
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
                                <div className="TableAlign">
                                    <table>
                                        <tr>
                                            <td>
                                                <label htmlFor="RegNoInput">
                                                    Reg No: <input type="text" id="RegNoInput" value={attributes.Reg_No} disabled={disabled}/>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="ManufDateInput">
                                                    Manufactured Date: <input type="text" id="ManufDateInput" value={attributes.Manufactured} disabled={disabled}/>
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="ChassisNoInput">
                                                    Chassis No: <input type="text" id="ChassisNoInput" value={attributes.Chassis_No} disabled={disabled}/>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>                                                    
                                            <td>                                                         
                                                <label htmlFor="1stRegDVLCInput">
                                                    1st Reg DVLC <input type="date" id="1stRegDVLCInput" value={checkDate(attributes.First_Reg_DVLC)} disabled={disabled}/>
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="ColourInput">
                                                    Colour: <input type="text" id="ColourInput" value={attributes.Colour} disabled={disabled}/>
                                                </label>                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="SeatsInput">
                                                    Seats: <input type="number" id="SeatsInput" value={attributes.Seats} disabled={disabled}/>
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="WheelsInput">
                                                    Wheels: <input type="number" id="WheelsInput" value={attributes.Wheels} disabled={disabled}/>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="MOTInput">
                                                    MOT: <input type="date" id="MOTInput" value={checkDate(attributes.MOT)} disabled={disabled}/>
                                                </label>
                                        </td>
                                        <td>
                                                <label htmlFor="DriveInput">
                                                    Drive: <input type="text" id="DriveInput" value={attributes.Drive} disabled={disabled}/>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="ConditionInput">
                                                    Condition: <input type="text" id="ConditionInput" value={attributes.Condition} disabled={disabled}/>
                                                </label>                                                
                                            </td>
                                        </tr>
                                    </table>                                    
                                </div>
                            </Route>
                            <Route exact path={`${match.path}/engine_details`}>
                                <div className="VerticalAlign">
                                    <label htmlFor="MakeInput">
                                        Make: <input type="text" id="MakeInput" value={attributes.Engine_Make} disabled={disabled}/>
                                    </label>
                                    <label htmlFor="TypeInput">
                                        Type: <input type="text" id="TypeInput" value={attributes.Engine_Type} disabled={disabled}/>
                                    </label>
                                    <label htmlFor="NumberInput">
                                        Number: <input type="text" id="NumberInput" value={attributes.Engine_No} disabled={disabled}/>
                                    </label>
                                    <label htmlFor="RatingInput">
                                        Rating(cc) <input type="text" id="RatingInput" value={attributes.Engine_Rating} disabled={disabled}/>
                                    </label>
                                </div>
                            </Route>
                            <Route exact path={`${match.path}/rum_data`}>
                                <div className="VerticalAlign">
                                    <label htmlFor="RUMRegInput">
                                        1st RUM Registered: <input type="date" id="RUMRegInput" value={checkDate(attributes.First_Reg_RUM)} disabled={disabled}/>
                                    </label>
                                    <label htmlFor="OwnerIDInput">
                                        Owner ID: <input type="number" value={attributes.Owner_ID} disabled={disabled}/>
                                    </label>
                                    <label htmlFor="OwnerChangeInput">
                                        Owner Change: <input type="date" id="OwnerChangeInput" value={checkDate(attributes.OwnerChange)} disabled={disabled}/>
                                    </label>
                                    <label htmlFor="PrevOwnersInput">
                                        Previous Owners: <input type="text" id="PrevOwnersInput" value={attributes.Previous_Owners} disabled={disabled}/>
                                    </label>
                                    <label htmlFor="PhotoInput">
                                        Photo(s): <input type="checkbox" value={attributes.Photo} disabled={disabled}/>
                                    </label>

                                    <label htmlFor="LastUpdateInput">
                                        Last Updated: <input type="date" id="LastUpdateInput" value={checkDate(attributes.LastUpdated)} disabled={disabled}/>
                                    </label>
                                </div>
                            </Route>
                            <Route exact path={`${match.path}/history`}>
                                <div className="VerticalAlign">
                                    <label htmlFor="">History: </label>
                                    <textarea id="HistoryInput" cols={50} rows={25} value={attributes.History} disabled={disabled}/>                                    
                                </div>
                            </Route>
                            <Route exact path={`${match.path}/documentation`}>
                                <div className="VerticalAlign">
                                    <label htmlFor="DocumentationInput">Documentation:</label>
                                    <textarea name="" id="DocumentationInput" cols={50} rows={25} value={attributes.Documentation} disabled={disabled}/>                                    
                                </div>
                            </Route>
                            <Route exact path={`${match.path}/images`}>
                                
                            </Route>
                    </div>
            </form>
        </div>
    )
}


export default AttributeEditorCarReg
