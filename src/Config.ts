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
        let configCheck = await this.checkConfig();
        if(configCheck) {
            await this.createConfig();
        }

        await this.loadConfig();
    }

    private checkConfig = async (): Promise<boolean> => {
        let notFound: boolean = false;

        try {
            await fs.access(this.appDataLocation, constants.R_OK);
            console.log("\nConfig Found.\n");
            notFound = false;
        } 
        catch (error) {
            console.log("\nConfig Not Found.\n");
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

        fs.writeFile(this.appDataLocation, JSON.stringify(defaultConfig, null, 4))
        .then((result) => {
            if(result == undefined) console.log("\nCreated Config File.\n");
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

    private setConfig = (newConfig: IConfig) => {
        
    }

    public getConfigData = (): IConfig => {
        return this.configData;
    }

    public getServerConfig = (): ConnectionRequirements => {
        return this.configData.databaseSettings;
    }

    public setServerConfig = (newConfig: ConnectionRequirements): void => {

    }
 
}