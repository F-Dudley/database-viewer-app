import * as fs from 'fs/promises';
import { constants } from 'fs';

import { IConfig, ConnectionRequirements } from './interfaces/DataParameterInterfaces';

export default class ConfigFiles {
    private appDataLocation: string;
    private configData: IConfig;

    constructor( _appDataLocation: string) {
        this.appDataLocation = _appDataLocation;
    }

    public initializeConfig = async () => {
        const configCheck = await this.checkConfig();
        if(configCheck) {
            await this.createConfig();
        }

        await this.loadConfig();
    }

    private checkConfig = async (): Promise<boolean> => {
        let notFound = false;

        try {
            await fs.access(this.appDataLocation, constants.R_OK);
            notFound = false;
        } 
        catch (error) {
            notFound = true;
        }

        return notFound;
    }

    private createConfig = async () => {
        let defaultConfig: IConfig; 
        defaultConfig = {
            databaseSettings: {
                host: 'localhost',
                port: '3307',
                user: 'root',
                password: 'password',
                database: 'rum_data'                
            }
        };

        await this.writeConfig(defaultConfig);
    }

    private writeConfig = async (newConfig: IConfig) => {

        fs.writeFile(this.appDataLocation, JSON.stringify(newConfig, null, 4))
        .then((result) => {
            if(result == undefined) {
                console.log("Writing to Config");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    public loadConfig = async () => {
        await fs.readFile(this.appDataLocation)
        .then(data => {
            this.configData = JSON.parse(data.toString());          
        });
    }

    public setNewConfig = () => {
       this.writeConfig(this.configData);
    }

    public getConfigData = (): IConfig => {
        return this.configData;
    }

    public getServerConfig = (): ConnectionRequirements => {
        return this.configData.databaseSettings;
    }

    public setServerConfig = (newConfig: ConnectionRequirements): void => {
        Object.assign(this.configData.databaseSettings, newConfig);
        this.setNewConfig();
    }
 
}