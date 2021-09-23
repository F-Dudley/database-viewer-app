import React, { FC } from 'react'

type SettingsType = 'database';

interface SettingsCardProps {
    title: string;
    settingsFor: SettingsType;
}

const SettingsCard: FC<SettingsCardProps> = (props) => {

    const onSubmit = () => {

    }

    return (
        <div className="Card">
            <div className="Outer">
                <h3>{props.title}</h3>
                <div className="Inner">
                    <form onSubmit={onSubmit}>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SettingsCard
