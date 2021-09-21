import Store from 'electron-store';
import { ConnectionRequirements } from './Server';

interface IConfig {

    databaseSettings: ConnectionRequirements;
}

export default class ConfigFiles {

    private store: Store;


    constructor() {
        this.store = new Store();
        if(this.createConfig()) {
            console.log('\n\n\nCreated Config.')
        }
    }

    public createConfig = (): boolean => {
        if(this.store.has('databaseConfig')) return false;        

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

        this.store.set({defaultConfig});
        console.log(this.store.path + '\n\n\n');
    
        return true;
    }

    public loadConfig = (configPath: string) => {
        
    }

}