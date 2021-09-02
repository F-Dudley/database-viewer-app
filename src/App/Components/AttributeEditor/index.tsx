import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './AttributeEditor.scss';
import { CarRegistryInterface } from '../../../interfaces/DatabaseInterfaces';

interface AttributeEditorProps {

}

export default class AttributeEditor extends Component {

    constructor(props: AttributeEditorProps) {
        super(props);

        this.state = {
            count: 0,
            entryData: {},
            dataTest: 'This Works',
        }

    }

    private handleSubmit() {

    }

    private testButton() {
        console.log()
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
                            <Link to="/Vehicle_Details">Vehicle Details</Link>
                            <Link to="/Engine_Details">Engine Details</Link>
                            <Link to="/RUM_Data">RUM Details</Link>
                            <Link to="/History">History</Link>
                            <Link to="/Documentation">Documentation</Link>
                            <Link to="/Images">Images</Link>
                        </div>

                        <Switch>
                            <Route path="/Vehicle_Details">
                                <div className="TableAlign">
                                    <table>
                                        <tr>
                                            <td>
                                                <label htmlFor="">
                                                    Reg No: <input type="text" />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">
                                                    Manufactured Date: <input type="date" id="" value={'2000-12-04'}/>
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="">
                                                    Chassis No: <input type="text" id="" value={'test'} />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>                                            
                                                <label htmlFor="">
                                                    1st Reg DVLC <input type="date" id="" value={'1962-10-17'} />
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="">
                                                    Colour: <input type="text" id="" value={'BLUE/WHITE'}/>
                                                </label>                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">
                                                    Seats: <input type="number" id="" value={2+2} />
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="">
                                                    Wheels: <input type="number" id="" value={4} />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">
                                                    MOT: <input type="text" id="" value={''} />
                                                </label>
                                            </td>
                                            <td>
                                                <label htmlFor="">
                                                    Drive: <input type="text" id="" value={''} />
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="">
                                                    Condition: <input type="text" id="" value={''}/>
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
