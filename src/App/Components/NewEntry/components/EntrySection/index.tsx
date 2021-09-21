import React, { FC } from 'react'

interface IEntrySectionProps {
    SectionName: string;
}

const EntrySection: FC<IEntrySectionProps> = (props) => {
    return (
        <div className="CenteredValues">
            <h2>{props.SectionName}</h2>
            {props.children}
        </div>
    )
}

export default EntrySection
