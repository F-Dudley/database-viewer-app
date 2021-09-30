import React, { FC, useState, useEffect, SyntheticEvent } from 'react'
import SettingsCard from './Components/SettingsCard';

import './SettingsMenu.scss';
import { IConfig } from '../../../interfaces/DataParameterInterfaces';
import InputField from '../InputFields/InputField';

    const temp: IConfig = {
        databaseSettings: {
            host: '',
            port: '',
            database: '',

            user: '',
            password: '',
        },
    };

const SettingsMenu: FC = () => {

    const [configSettings, setconfigSettings] = useState<IConfig>(temp);

    const requestConfigData = (): void => {
        window.api.configAPI.send("RequestConfigData", {});
        window.api.configAPI.receiveOnce("RequestConfigData", data => {          
            setconfigSettings(data);
        })
    }

    useEffect(() => {
        
        requestConfigData();

        return () => {
            
        }

    }, [])

    const onDatabaseSubmit = (event: SyntheticEvent<HTMLFormElement> ) => {
        event.preventDefault();

        const target = event.target as HTMLFormElement;
        let postData: { [key: string]: any} = { };

        for (let i = 0; i < target.length; i++) {
            const element = target[i] as HTMLInputElement;
            
            for (const [key, value] of Object.entries(configSettings.databaseSettings)) {
                if(key == element.name && value != element.value) {
                    postData[element.name] = element.value;
                }
            }
        }

        window.api.configAPI.send("SetDatabaseConfig", postData);
        requestConfigData();
    }

    return (
        <div className="SettingsMenu">
            <div className="CardsContainer">
                <SettingsCard title="Database" onSubmitFunc={onDatabaseSubmit}>
                    <div className="SideAlign">
                        <InputField title="Host" inputType="text" inputName={"host"} defaultValue={configSettings.databaseSettings.host} />
                        <InputField title="Port" inputType="number" inputName={"port"} defaultValue={configSettings.databaseSettings.port} />
                        <InputField title="Database" inputType="text" inputName={"database"} defaultValue={configSettings.databaseSettings.database} />
                    </div>
                    <div className="SideAlign">
                        <InputField title="Username" inputType="text" inputName={"user"} defaultValue={configSettings.databaseSettings.user} />
                        <InputField title="Password" inputType="password" inputName={"password"} defaultValue={configSettings.databaseSettings.password} />                        
                    </div>
                </SettingsCard>

            </div>
        </div>
    )
}

export default SettingsMenu
