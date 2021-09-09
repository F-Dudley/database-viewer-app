const { contextBridge, ipcRenderer } = require('electron');


import { QueryRequest, InsertRequest } from '../interfaces/DataParameterInterfaces';

declare global {
    interface Window {api: APIRoutes,}
}

window.api = window.api;
let SettingsConfig: any;

interface APIRoutes {
    databaseAPI: {
        send: (channel: string, data: QueryRequest | InsertRequest) => void,
        receive: (channel: string, func: (data: Array<any> | null) => void) => void,
        receiveOnce: (channel: string, func: (data: Array<any> | null) => void) => void,
    }
};

let apis: APIRoutes = {
    databaseAPI: {

        send: (channel, dataRequest) => {
            if(validChannels.includes(channel)){
                ipcRenderer.send(channel, dataRequest);
            }
            else {
                console.log("Channel Not Found.");
                return null;
            }
        },

        receive: (channel, callback) => {
            if (validChannels.includes(channel)) {
                const newCallback = (_: null, data: any[]) => callback(data);
                ipcRenderer.on(channel, newCallback);
            }
        },

        receiveOnce: (channel, callback) => {
            if (validChannels.includes(channel)) {
                const newCallback = (_: null, data: any[]) => callback(data);
                ipcRenderer.once(channel, newCallback);
            }
        },

    }
};

const validChannels: string[] = [
    "Ping",
    "RequestDataList",
    "RequestAttributeEdit",
    "AppendAttributeEdit",
    "InsertNewData"
];

contextBridge.exposeInMainWorld("api", apis);

// ----- //
