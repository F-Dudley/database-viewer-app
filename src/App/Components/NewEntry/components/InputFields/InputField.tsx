import React, { FC } from 'react'
import { IOwner, ICarRegistry } from '../../../../../interfaces/DatabaseInterfaces';

type TInputType = 'text' | 'number' | 'date' | 'checkbox' | 'email' | 'file';
type TInputName = keyof IOwner | keyof ICarRegistry;

interface IInputFieldProps {
    title: string;
    inputType: TInputType;
    inputName: TInputName;
    size?: number;
}

const InputField: FC<IInputFieldProps> = (props) => {

    return (
        <div className="CenteredValues">
            <label htmlFor={`${props.inputName}Input`} >{props.title}:</label> 
            <input type={props.inputType} id={`${props.inputName}Input`} name={props.inputName} size={props.size} />  
        </div>
    )
}

export default InputField
