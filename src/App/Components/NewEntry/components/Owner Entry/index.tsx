import React, { FC, SyntheticEvent } from 'react'
import EntrySection from '../EntrySection/index';

import { InputField, TextAreaField } from '../../../InputFields';
import { IOwner } from '../../../../../interfaces/DatabaseInterfaces';

const OwnerEntry = () => {

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const target = event.currentTarget as HTMLFormElement;

        let attributes: IOwner;
        attributes = {
            ID: null,
            Name: null,
            Surname: null,
            Organisation: null,
            Job_Title: null,
            Address_First: null,
            Address_Second: null,
            Town: null,
            County: null,
            Country: null,
            Post_Code: null,
            Telephone: null,
            Email: null,
            Notes: null,
            
        }

        const postData: { [key: string]: any} = { };

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
                            postData[element.name] = element.value;
                        }
                    }
                }
            }
        }

        if(Object.keys(postData).length == 0) {
            window.api.requestDialog("RequestDialogMessage", {title: "No Values Found.", message: "No Data was Found in the Submitted Fields", type: "error"});     
        }
        else {
            window.api.databaseAPI.send("InsertNewData", {database: 'owners', data: postData as IOwner});
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <h1>Owner Entry</h1>
                <div className="line" />

                <EntrySection SectionName="Details">
                    <div className="SideAlign">
                        <InputField title='Name' inputType='text' inputName='Name' />
                        <InputField title='Surname' inputType='text' inputName='Surname' />
                    </div>
                    <div className="SideAlign">
                        <InputField title='Organisation' inputType='text' inputName='Organisation' />
                        <InputField title='Job Title' inputType='text' inputName='Job_Title' />                        
                    </div>
                </EntrySection>

                <div className="line" />

                <EntrySection SectionName='Location'>
                    <div className="SideAlign">
                        <InputField title='Address First' inputType='text' inputName='Address_First' />
                        <InputField title='Address Second' inputType='text' inputName='Address_Second' />
                    </div>
                    <InputField title='Town' inputType='text' inputName='Town' />
                    <InputField title='County' inputType='text' inputName='County' size={30} />
                    <InputField title='Post Code' inputType='text' inputName='Country' />
                    <InputField title='Country' inputType='text' inputName='Country' />              
                </EntrySection>

                <div className="line" />

                <EntrySection SectionName='Contact Info'>
                    <InputField title='Telephone' inputType='text' inputName='Telephone' size={30} />
                    <InputField title='Email' inputType='email' inputName='Email' size={30} />             
                </EntrySection>

                <div className="line" />

                <TextAreaField title='Notes' inputName='Notes' cols={50} rows={10} />
                
                <div className="line" />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default OwnerEntry
