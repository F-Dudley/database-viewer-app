import React, { FC } from 'react'
import { IOwner, ICarRegistry } from '../../../interfaces/DatabaseInterfaces';

type TInputType = 'text' | 'number' | 'date' | 'checkbox';
type TInputName = keyof IOwner | keyof ICarRegistry;

interface ITextAreaFieldProps {
    title: string;
    inputName: TInputName;
    cols?: number;
    rows?: number;
}

const TextAreaField: FC<ITextAreaFieldProps> = (props) => {
    return (
        <div className="CenteredValues">
            <label htmlFor={`${props.inputName}Input`} >{props.title}:</label> 
            <textarea id={`${props.inputName}Input`} name={props.inputName} cols={props.cols} rows={props.rows} />  
        </div>
    )
}

export default TextAreaField
