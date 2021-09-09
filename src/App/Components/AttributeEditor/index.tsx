import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import './AttributeEditor.scss';
import { CarRegistryInterface } from '../../../interfaces/DatabaseInterfaces';

interface AttributeEditorProps {

}

export default class AttributeEditor extends Component {

    constructor(props: AttributeEditorProps) {
        super(props);

        this.state = {

        }

    }

    private handleSubmit() {
        
    }

    render() {
        return (
            <div className="AttributeEditor">
                <div className="MainValues">
                    <table>
                        <tr>
                            <td>
                                <label htmlFor="RumNoInput">
                                    Rum No: <input id="RumNoInput" type="number" value={1} />
                                </label>                                
                            </td>
                            <td>
                                <label htmlFor="OwnerInput">
                                    Owner: <input type="text" value={'OWNER NAME HERE'} />
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

                <Router>
                    <div className="Tabs">
                        <div className="Tabs-Buttons">
                            <NavLink to="/Vehicle_Details" activeClassName="Tabs-ActiveButton">Vehicle Details</NavLink>
                            <NavLink to="/Engine_Details" activeClassName="Tabs-ActiveButton">Engine Details</NavLink>
                            <NavLink to="/RUM_Data" activeClassName="Tabs-ActiveButton">RUM Details</NavLink>
                            <NavLink to="/History" activeClassName="Tabs-ActiveButton">History</NavLink>
                            <NavLink to="/Documentation" activeClassName="Tabs-ActiveButton">Documentation</NavLink>
                            <NavLink to="/Images" activeClassName="Tabs-ActiveButton">Images</NavLink>
                        </div>

                        <Switch>
                            <Route path="/Vehicle_Details">
                                <div className="TableAlign">
                                    <table>
                                        <tr>
                                            <td>
                                                <label htmlFor="RegNoInput">
                                                    Reg No: <input type="text" id="RegNoInput" value={'test'}/>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="ManufDateInput">
                                                    Manufactured Date: <input type="date" id="ManufDateInput" value={'2000-12-04'}/>
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="ChassisNoInput">
                                                    Chassis No: <input type="text" id="ChassisNoInput" value={'test'} />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>                                                    
                                            <td>                                                         
                                                <label htmlFor="1stRegDVLCInput">
                                                    1st Reg DVLC <input type="date" id="1stRegDVLCInput" value={'1962-10-17'} />
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="ColourInput">
                                                    Colour: <input type="text" id="ColourInput" value={'BLUE/WHITE'}/>
                                                </label>                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="SeatsInput">
                                                    Seats: <input type="number" id="SeatsInput" value={2+2} />
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="WheelsInput">
                                                    Wheels: <input type="number" id="WheelsInput" value={4} />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="MOTInput">
                                                    MOT: <input type="text" id="MOTInput" value={''} />
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="DriveInput">
                                                    Drive: <input type="text" id="DriveInput" value={''} />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="ConditionInput">
                                                    Condition: <input type="text" id="ConditionInput" value={''}/>
                                                </label>                                                
                                            </td>
                                        </tr>
                                    </table>                                    
                                </div>
                            </Route>
                            <Route path="/Engine_Details">
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
                            <Route path="/RUM_Data">
                                <div className="VerticalAlign">
                                    <label htmlFor="RUMRegInput">
                                        1st RUM Registered: <input type="date" id="RUMRegInput" value={"2000-12-04"} />
                                    </label>
                                    <label htmlFor="OwnerIDInput">
                                        Owner ID: <input type="number" value={100} />
                                    </label>
                                    <label htmlFor="OwnerChangeInput">
                                        Owner Change: <input type="date" id="OwnerChangeInput" value={"2000-12-04"}/>
                                    </label>
                                    <label htmlFor="PrevOwnersInput">
                                        Previous Owners: <input type="text" id="PrevOwnersInput" value={"Adam, Ryan"} />
                                    </label>
                                    <label htmlFor="PhotoInput">
                                        Photo(s): <input type="checkbox" value={"Check"}  />
                                    </label>

                                    <label htmlFor="LastUpdateInput">
                                        Last Updated: <input type="date" id="LastUpdateInput" value={"1999-12-04"} />
                                    </label>
                                </div>
                            </Route>
                            <Route path="/History">
                                <div className="VerticalAlign">
                                    <label htmlFor="">History: </label>
                                    <textarea id="HistoryInput" cols={50} rows={25} />                                    
                                </div>
                            </Route>
                            <Route path="/Documentation">
                                <div className="VerticalAlign">
                                    <label htmlFor="DocumentationInput">Documentation:</label>
                                    <textarea name="" id="DocumentationInput" cols={50} rows={25} />                                    
                                </div>
                            </Route>
                            <Route path="/Images">

                            </Route>
                        </Switch>                        
                    </div>
                </Router>
            </div>
        )
    }
}
