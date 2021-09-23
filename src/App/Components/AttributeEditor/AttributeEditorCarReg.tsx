import React, { Component, FormEvent, useEffect, useState, useRef, SyntheticEvent } from 'react';
import { Route, Switch, NavLink, useRouteMatch, Redirect } from 'react-router-dom';

import './AttributeEditor.scss';
import { ICarRegistry } from '../../../interfaces/DatabaseInterfaces';
import { CheckValue, CheckDate, ConvertBit, ConvertImageBlob } from '../../Utils';

let tempData: ICarRegistry;
tempData = {
    ID: 0,

}

const AttributeEditorCarReg = () => {
    const isMounted = useRef<boolean>(true);
    const match = useRouteMatch();
    const [disabled, setDisabled] = useState<boolean>(true);
    const [attributes, setAttributes] = useState<ICarRegistry>(tempData);
    const [images, setImages] = useState<Array<string> | null>(null)
    const form = useRef<HTMLFormElement>(null);

    useEffect(() => {
        
        window.api.databaseAPI.receive("RequestAttributeEdit", ( data: Array<ICarRegistry> ) => {
            if(disabled && isMounted) {
                setDisabled(true);
                let dataResult = data[0];
                setAttributes(dataResult);           
            }
        });          

        return (): void => {
            isMounted.current = false;
        }

    }, []);

    useEffect(() => {
        form.current.reset();

        const newImages: Array<string> = [];

        ConvertImageBlob(attributes.Image)
        .then(imageURL => {
            newImages.push(imageURL);
        })
        .catch(error => {
            console.log(error);
        });

        ConvertImageBlob(attributes.Image2)
        .then(imageURL => {
            newImages.push(imageURL);
        })
        .catch(error => {
            console.log(error);
        });

        setImages(newImages); 
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
        let target = event.currentTarget as HTMLFormElement;

        let postData: { [key: string]: any } = {};

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
            window.api.databaseAPI.send("AppendAttributeEdit", {database: 'register_of_cars', attributeID: attributes.ID, data: postData});
            setDisabled(true);
            window.api.databaseAPI.send("RequestAttributeEdit", {database: 'register_of_cars', attributeID: attributes.ID});
        }
    };

    return (
        <div className="AttributeEditor">
            <form method="POST" ref={e => form.current = e} onSubmit={handleSubmit}>

                <div className="MainValues">
                    <div className="SideAlign">
                        <div className="CenteredValues">
                            <label htmlFor="IDInput">ID:</label> 
                            <input type="number" id="IDInput" name={'ID'} value={CheckValue(attributes.ID)} disabled={true}/>                          
                        </div>
                        <div className="CenteredValues">
                            <label htmlFor="OwnerInput">Owner:</label>
                            <input type="text" id="OwnerInput" name={'Owner'} defaultValue={CheckValue(attributes.Current_Owner)} disabled={disabled}/>                        
                        </div>                           
                    </div>
                    <div className="SideAlign">
                        <div className="CenteredValues">
                            <label htmlFor="ManufacturerInput">Manufacturer:</label> 
                            <input type="text" id="ManufacturerInput" name={'Make'} defaultValue={CheckValue(attributes.Make)} disabled={disabled}/>                           
                        </div>
                        <div className="CenteredValues">
                            <label htmlFor="ModelInput">Model:</label>
                            <input type="text" id="ModelInput" name={'Model'} defaultValue={CheckValue(attributes.Model)} disabled={disabled}/>                            
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
                            <input type="text" id="RegNoInput" name={'Reg_No'} defaultValue={CheckValue(attributes.Reg_No)} disabled={disabled}/>                                    
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="ManufDateInput">
                                    Manufactured Date: 
                                </label>
                                <input type="text" id="ManufDateInput" name={'Manufactured'} defaultValue={CheckValue(attributes.Manufactured)} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="ChassisNoInput">Chassis No:</label>
                                <input type="text" id="ChassisNoInput" name={'Chassis_No'} defaultValue={CheckValue(attributes.Chassis_No)} disabled={disabled}/>                                
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="DriveInput">Drive:</label>
                                <input type="text" id="DriveInput" name={'Drive'} defaultValue={CheckValue(attributes.Drive)} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="ColourInput">Colour:</label>
                                <input type="text" id="ColourInput" name={'Colour'} defaultValue={CheckValue(attributes.Colour)} disabled={disabled}/>                                  
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="SeatsInput">Seats:</label>
                                <input type="number" id="SeatsInput" name={'Seats'} defaultValue={CheckValue(attributes.Seats)} disabled={disabled}/>
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="WheelsInput">Wheels:</label>
                                <input type="number" id="WheelsInput" name={'Wheels'} defaultValue={CheckValue(attributes.Wheels)} disabled={disabled}/>
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="MOTInput">MOT:</label>
                                <input type="date" id="MOTInput" name={'MOT'} defaultValue={CheckDate(attributes.MOT)} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="1stRegDVLCInput">1st Reg DVLC:</label>
                                <input type="date" id="1stRegDVLCInput" name={'First_Reg_DVLC'} defaultValue={CheckDate(attributes.First_Reg_DVLC)} disabled={disabled}/>                                
                            </div>
                        </div>
                        <div className="SideAlign">
                            <div className="CenteredValues">
                                <label htmlFor="ConditionInput">Condition:</label>
                                <input type="text" id="ConditionInput" name={'Condition'} defaultValue={CheckValue(attributes.Condition)} disabled={disabled} size={50}/>                                      
                            </div>
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/engine_details`}>
                        <div className="VerticalAlign">
                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="MakeInput">Make:</label>
                                <input type="text" id="MakeInput" name={'Engine_Make'} defaultValue={CheckValue(attributes.Engine_Make)} disabled={disabled}/>                                
                            </div>

                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="TypeInput">Type:</label>
                                <input type="text" id="TypeInput" name={'Engine_Type'} defaultValue={CheckValue(attributes.Engine_Type)} disabled={disabled}/>                            
                            </div>
                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="NumberInput">Number:</label>
                                <input type="text" id="NumberInput" name={'Engine_No'} defaultValue={CheckValue(attributes.Engine_No)} disabled={disabled}/>                            
                            </div>
                            <div className="CenteredValues ExtraMargin">
                                <label htmlFor="RatingInput">Rating(cc)</label>                            
                                <input type="text" id="RatingInput" name={'Engine_Rating'} defaultValue={CheckValue(attributes.Engine_Rating)} disabled={disabled}/>
                            </div>                            
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/rum_data`}>
                        <div className="VerticalAlign">
                            <div className="CenteredValues">
                                <label htmlFor="RUMRegInput">1st RUM Registered:</label>
                                <input type="date" id="RUMRegInput" name={'First_Reg_RUM'} defaultValue={CheckDate(attributes.First_Reg_RUM)} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="OwnerIDInput">Owner ID:</label>
                                <input type="number" id="OwnerIDInput" name={'Owner_ID'} defaultValue={CheckValue(attributes.Owner_ID)} disabled={disabled}/>                                
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="OwnerChangeInput">Owner Change:</label>
                                <input type="date" id="OwnerChangeInput" name={'Owner_Change'} defaultValue={CheckDate(attributes.Owner_Change)} disabled={disabled} />
                            </div>
                            <div className="CenteredValues">
                                <label htmlFor="PrevOwnersInput">Previous Owners:</label>
                                <input type="text" id="PrevOwnersInput" name={'Previous_Owners'} defaultValue={CheckValue(attributes.Previous_Owners)} disabled={disabled}/>
                            </div>
                            <div className="SideAlign">
                                <div className="CenteredValues">
                                    <label htmlFor="PhotoInput">Photo(s):</label>
                                    <input type="checkbox" id="PhotoInput" name={'Photo'} checked={ConvertBit(attributes.Photo)} disabled={disabled}/>
                                </div>
                                <div className="CenteredValues">
                                    <label htmlFor="LastUpdateInput">Last Updated:</label>
                                    <input type="date" id="LastUpdateInput" name={'Last_Updated'} defaultValue={CheckDate(attributes.Last_Updated)} disabled={true}/>
                                </div>                                
                            </div>
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/history`}>
                        <div className="CenteredValues">
                            <label htmlFor="">History: </label>
                            <textarea id="HistoryInput" name={'History'} defaultValue={CheckValue(attributes.History)} disabled={disabled} cols={50} rows={25} />                                    
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/documentation`}>
                        <div className="CenteredValues">
                            <label htmlFor="DocumentationInput">Documentation:</label>
                            <textarea id="DocumentationInput" name={'Documentation'} defaultValue={CheckValue(attributes.Documentation)} disabled={disabled} cols={50} rows={25} />                                    
                        </div>
                    </Route>

                    <Route exact path={`${match.path}/images`}>
                        <div className="CenteredValues">
                            {
                                images
                                ?
                                    images.map((imageURL) => {

                                        return ( <img key={imageURL} src={imageURL} alt={`Image-(${imageURL}) From Database.`} />)
                                    })
                                :
                                    <h2>Could Not Parse Images or was null</h2>
                            }                            
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
                                        <a type="reset" onClick={resetEdit} >Reset</a>
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
