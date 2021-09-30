import React, { FC, SyntheticEvent, useState, useEffect, useRef, cloneElement} from 'react'

type SettingsType = 'database';

interface SettingsCardProps {
    title: string;

    onSubmitFunc: (event: SyntheticEvent<HTMLFormElement>) => void;
}

const SettingsCard: FC<SettingsCardProps> = (props) => {

    const form = useRef<HTMLFormElement>(null);

    return (
        <div className="Card">
            <div className="Outer">
                <h3>{props.title}:</h3>
                    <form ref={e => form.current = e} onSubmit={props.onSubmitFunc} className="Inner" >
                        {
                            props.children
                        }
                        <div className="MainButtons">
                            <div className="SideAlign">
                                <div className="CenteredValues">
                                    <button type="reset">Reset</button>
                                </div>
                                <div className="CenteredValues">
                                    <button type="submit">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    )
}

export default SettingsCard
