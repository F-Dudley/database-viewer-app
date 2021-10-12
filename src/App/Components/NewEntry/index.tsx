import React, { FC, useState, SyntheticEvent } from 'react'

import './NewEntry.scss';
import CarEntry from './components/Car Entry';
import OwnerEntry from './components/Owner Entry';

type DifferentEntryMethods = 'Car Registry' | 'Owner';

const DifferentEntries: FC<{ EntryMethod: DifferentEntryMethods}> = (props) => {

    if(props.EntryMethod == 'Owner') {
        return (
            <>
                <OwnerEntry />
            </>
        )
    }
    else if(props.EntryMethod == 'Car Registry') {
        return (
            <>
                <CarEntry />
            </>
        )
    }
}

const NewEntry: FC = () => {
    const [entryMethod, setEntryMethod] = useState<DifferentEntryMethods>('Car Registry');

    const selectOnChange = (event: SyntheticEvent<HTMLSelectElement>) => {
        const temp = event.currentTarget.value as DifferentEntryMethods;
        setEntryMethod(temp);
    }

    return (
        <div className="NewEntry">
            <div className="CenteredValues">
                <select onChange={selectOnChange}>
                    <option value="Car Registry">Car</option>                    
                    <option value="Owner">Owner</option>                    
                </select>                    
                <div className="line" />
                <DifferentEntries EntryMethod={entryMethod} />
            </div>
        </div>
    )
}

export default NewEntry
