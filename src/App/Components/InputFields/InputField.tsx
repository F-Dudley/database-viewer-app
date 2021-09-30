import React, { FC } from 'react'
import { IOwner, ICarRegistry } from '../../../interfaces/DatabaseInterfaces';

type TInputType = 'text' | 'number' | 'password' | 'date' | 'checkbox' | 'email' | 'file';

export interface IInputFieldProps {
    title: string;
    inputType: TInputType;
    inputName: any;
    size?: number;

    defaultValue?: string;
    disabled?: boolean;
}

const InputField: FC<IInputFieldProps> = (props) => {

    return (
        <div className="CenteredValues">
            <label htmlFor={`${props.inputName}Input`} >{props.title}:</label> 
            <input type={props.inputType} id={`${props.inputName}Input`} name={props.inputName} size={props.size} defaultValue={props.defaultValue} disabled={props.disabled} />  
        </div>
    )
}

export default InputField
