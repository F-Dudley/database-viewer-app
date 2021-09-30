import React, { FC, useState, useEffect, SyntheticEvent } from 'react'

import EntrySection from '../EntrySection';
import LoadableImage from '../../../LoadableImage';
import { InputField, TextAreaField } from '../../../InputFields';
import { ICarRegistry } from '../../../../../interfaces/DatabaseInterfaces';

import './CarEntry.scss';

const CarEntry: FC = () => {
    const [edited, setEdited] = useState<boolean>(false);
    const [images, setImages] = useState<Array<string>>([])
    const [imageData, setImageData] = useState<Array<Buffer> | null>(null);

    useEffect(() => {
        /*
        if(imageData === null) return;
        let newImages: Array<string>;

        window.api.databaseAPI.send("ConvertToNativeImage", imageData);
        window.api.databaseAPI.receiveOnce("ConvertToNativeImage", (data) => {
            console.log(data);
            if(data != null) {
                newImages = data as Array<string>;                
            }
        });

        setImages(newImages);
        */
    }, [imageData])

    const collectSelectedImageData = () => {
        window.api.requestDialog("RequestDialogOpen", 
        {
            title: "Select Images. (Max Two Images)",
            buttonLabel: "Select File(s)",
            filters: [
                { name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp'] },
                { name: 'All Files', extensions: ['*'] },
            ],
            properties: [
                'openFile',
                'multiSelections',
                'showHiddenFiles',
                'dontAddToRecent',
            ]
        });
        window.api.databaseAPI.receiveOnce("RequestDialogOpen", (openData) => {
            if(openData == null) return;
            console.log(openData);
            let imageData = openData.buffer as Array<Buffer>;
            let imageURLs = openData.src as Array<string>;

            setImageData(imageData);
            setImages(imageURLs);
        });
    }

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        let target = event.currentTarget as HTMLFormElement;

        let attributes: ICarRegistry;
        attributes = {
            ID: null,
            Reg_No: null,
            Make: null,
            Model: null,            
            Manufactured: null,
            Chassis_No: null,
            Drive: null,
            Colour: null,
            Seats: null,
            Wheels: null,
            MOT: null,
            First_Reg_DVLC: null,
            Condition: null,
            Engine_Make: null,
            Engine_Type: null,
            Engine_No: null,
            Engine_Rating: null,
            
            Owner_ID: null,
            Current_Owner: null,
            Current_Owner2: null,
            Photo: null,

            History: null,
            
            Image: null,
            Image2: null,
            
            Documentation: null,
        }

        let postData: { [key: string]: any} = { };

        for (let i = 0; i < target.length; i++) {
            const element = target[i] as HTMLInputElement;

            for(const [key, values] of Object.entries(attributes)) {
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
                            setEdited(true);
                            postData[element.name] = element.value;
                        }
                    }
                }
            }
        }

        if(images[0] != undefined || images[0] != null) {
            postData['Image'] = imageData[0];
        }
        if(images[1] != undefined || images[1] != null) {
            postData['Image2'] = imageData[1];
        }

        if(Object.keys(postData).length == 1 && !edited) {
            window.api.requestDialog("RequestDialogMessage", {title: "No Values Found.", message: "No Data was Found in the Submitted Fields", type: "error"});     
        }
        else {
            window.api.databaseAPI.send("InsertNewData", {database: 'register_of_cars', data: postData});
            console.log({database: 'register_of_cars', data: postData});
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                    <h1>Car Entry</h1>                        
                    <div className="line" />
                    <EntrySection SectionName="Vehicle Details">
                        <InputField title='Reg No' inputType='text' inputName='Reg_No' />
                        <div className="SideAlign">
                            <InputField title='Manufacturer' inputType='text' inputName='Make' />
                            <InputField title='Model' inputType='text' inputName='Model' />                               
                        </div>
                        <div className="SideAlign">
                            <InputField title='Manufactured Date (year)' inputType='number' inputName='Manufactured' />
                            <InputField title='Chassis No' inputType='text' inputName='Chassis_No' />
                        </div>
                        <div className="SideAlign">
                            <InputField title='Drive' inputType='text' inputName='Drive' />
                            <InputField title='Colour' inputType='text' inputName='Colour' />
                        </div>
                        <div className="SideAlign">
                            <InputField title='Seats' inputType='number' inputName='Seats' />
                            <InputField title='Wheels' inputType='number' inputName='Wheels' />
                        </div>
                        <div className="SideAlign">
                            <InputField title='MOT' inputType='date' inputName='MOT' />
                            <InputField title='1st Reg DVLC' inputType='date' inputName='First_Reg_DVLC' />
                        </div>
                        <InputField title='Condition' inputType='text' inputName='Condition' size={50} />                      
                    </EntrySection>
                    <div className="line" />
                    <EntrySection SectionName="Engine Details">
                        <InputField title='Make' inputType='text' inputName='Engine_Make' />
                        <InputField title='Type' inputType='text' inputName='Engine_Type' />
                        <InputField title='Number' inputType='text' inputName='Engine_No' />
                        <InputField title='Rating (cc)' inputType='text' inputName='Engine_Rating' />
                    </EntrySection>
                    <div className="line" />
                    <EntrySection SectionName="RUM Data">
                        <InputField title='Owner ID' inputType='number' inputName='Owner_ID' />
                        <div className="SideAlign">
                            <InputField title='Owner 1' inputType='text' inputName='Current_Owner' />
                            <InputField title='Owner 2' inputType='text' inputName='Current_Owner2' />                            
                        </div>
                        <InputField title='Photo(s)' inputType='checkbox' inputName='Photo' />
                    </EntrySection>
                    <div className="line" />
                        <TextAreaField title='History' inputName='History' cols={50} rows={10} />
                    <div className="line" />
                    <EntrySection SectionName="Images Upload (Max 2 Upload)">
                        <a onClick={collectSelectedImageData}>Select Images</a>
                        <div>
                            {
                                images.map((image, index) => {
                                    return ( <LoadableImage title={`Image${index}`} imageSRC={image} imageALT={`Image${index} Selected From Local Storage.`}/>)
                                })    
                            }                  
                        </div>
                    </EntrySection>
                    <div className="line" />
                        <TextAreaField title='Documentation' inputName='Documentation' cols={50} rows={10} />
                    <div className="line" />

                    <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default CarEntry
