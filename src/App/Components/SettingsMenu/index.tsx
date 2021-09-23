import React, { FC, useState, useEffect } from 'react'
import SettingsCard from './Components/SettingsCard';

import './SettingsMenu.scss';
import { IConfig } from '../../../interfaces/DataParameterInterfaces';

const SettingsMenu: FC = () => {

    const [configSettings, setconfigSettings] = useState<IConfig>(null);
    const [disabled, setDisabled] = useState<boolean>(true);

    useEffect(() => {
        
        window.api.configAPI.send("RequestConfigData", {});
        window.api.configAPI.receiveOnce("RequestConfigData", data => {
            setconfigSettings(data);
            console.log(configSettings);
        })

        return () => {
            
        }
    }, [])

    const onDatabaseSubmit = () => {

    }

    return (
        <div className="SettingsMenu">
            <div className="CardsContainer">
                <div className="Card">
                    <form onSubmit={onDatabaseSubmit}>
                        <div className="Outer">
                            <h3>Database:</h3>
                            <div className="Inner">
                                    <div>
                                        <label>Host:</label>
                                        <input type="text" name={'host'} disabled={disabled} />
                                    </div>
                                    <div>
                                        <label>Port:</label>
                                        <input type="text" name={'port'} disabled={disabled} />
                                    </div>
                                    <div>
                                        <label>Database:</label>
                                        <input type="text" name={'database'} disabled={disabled} />
                                    </div>                            
                                    <div>
                                        <label>User:</label>
                                        <input type="text" name={'user'} disabled={disabled} />
                                    </div>
                                    <div>
                                        <label>Password:</label>
                                        <input type="text" name={'password'} disabled={disabled} />
                                    </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SettingsMenu
