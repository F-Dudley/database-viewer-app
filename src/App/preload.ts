const { contextBridge, ipcRenderer } = require('electron');

import * as Interfaces from '../interfaces/DatabaseInterfaces';

declare global {
    interface Window {api: APIRoutes,}
}

window.api = window.api;
let SettingsConfig: any;

interface APIRoutes {
    databaseAPI: {
        send: (channel: string, data: any) => void,
        receive: (channel: string, func: any) => void,
        invoke: (channel: string, request: InvokeRequest) => Promise<any>,
    }
};

let apis: APIRoutes = {
    databaseAPI: {

        send: (channel, data) => {
            if(validChannels.includes(channel)){
                ipcRenderer.send(channel, data);
            }
            else return "Channel Not Found.";
        },

        receive: (channel, func) => {
            if(validChannels.includes(channel)) {
                ipcRenderer.on(channel, (sender, data) => func(sender, data));
            }
            else return "Channel Not Found.";
        },
            
        invoke: async (channel, request) => {
            if(validChannels.includes(channel)) {
                let result = await ipcRenderer.invoke(channel, request);
                
                return result;
            }
        },
        
        
    }
};

const validChannels: string[] = [
    "Ping",
    "RequestDataList",
];

contextBridge.exposeInMainWorld("api", apis);

// ----- //
