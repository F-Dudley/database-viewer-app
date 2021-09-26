const { contextBridge, ipcRenderer } = require('electron');


import { QueryRequest, AttributeRequest, InsertRequest, UpdateRequest, IConfig } from '../interfaces/DataParameterInterfaces';
import { ICarRegistry, IOwner} from '../interfaces/DatabaseInterfaces';
import { ICarRegResult, IOwnerResult } from '../interfaces/ClientDatabaseInterfaces';
import { MessageBoxOptions, OpenDialogOptions } from 'electron/main';

declare global {
    interface Window {api: APIRoutes,}
}

window.api = window.api;
let SettingsConfig: any;

interface APIRoutes {
    databaseAPI: {
        send: (channel: string, data: QueryRequest | AttributeRequest | InsertRequest | UpdateRequest | Array<Buffer>) => void,
        receive: (channel: string, func: (data: Array<ICarRegistry| IOwner| ICarRegResult | IOwnerResult> | null) => void) => void,
        receiveOnce: (channel: string, func: (data: Array<ICarRegistry| IOwner| ICarRegResult | IOwnerResult | Buffer | string> | null) => void) => void,
    }

    configAPI: {
        send: (channel: string, data?: any) => void,
        receive: (channel: string, func: (data: IConfig) => void) => void,
        receiveOnce: (channel: string, func: (data: any) => void) => void
    }

    requestDialog: (channel: string, messageData: MessageBoxOptions | OpenDialogOptions) => void,
};

let apis: APIRoutes = {
    databaseAPI: {
        send: (channel, dataRequest) => {
            if(validDatabaseChannels.includes(channel)){
                ipcRenderer.send(channel, dataRequest);
            }
            else {
                console.log("Channel Not Found.");
                return null;
            }
        },

        receive: (channel, callback) => {
            if (validDatabaseChannels.includes(channel)) {
                const newCallback = (_: null, data: any[]) => callback(data);
                ipcRenderer.on(channel, newCallback);
            }
            else {
                console.log("Recieved Data From Invalid Channel")
            }
        },

        receiveOnce: (channel, callback) => {
            if (validDatabaseChannels.includes(channel)) {
                const newCallback = (_: null, data: any[]) => callback(data);
                ipcRenderer.once(channel, newCallback);
            }
            else {
                console.log("Recieved Data From Invalid Channel");
            }
        },
    },

    configAPI: {
        send: (channel, dataRequest) => {
            if(validConfigChannels.includes(channel)){
                ipcRenderer.send(channel, dataRequest);
            }
            else {
                console.log("Channel Not Found.");
                return null;
            }
        },

        receive: (channel, callback) => {
            if (validConfigChannels.includes(channel)) {
                const newCallback = (_: null, data: IConfig) => callback(data);
                ipcRenderer.on(channel, newCallback);
            }
            else {
                console.log("Recieved Data From Invalid Channel")
            }
        },

        receiveOnce: (channel, callback) => {
            if (validConfigChannels.includes(channel)) {
                const newCallback = (_: null, data: IConfig) => callback(data);
                ipcRenderer.once(channel, newCallback);
            }
            else {
                console.log("Recieved Data From Invalid Channel");
            }
        },
    },

    requestDialog: (channel, messageData) => {
        if(validDialogChannels.includes(channel)) {
            ipcRenderer.send(channel, messageData);            
        }
        else console.log("Recieved Data From Invalid Channel.");
    } 
};

const validDatabaseChannels: string[] = [
    "RequestDataList",
    "RequestAttributeEdit",
    "RequestAttributeCars",
    "AppendAttributeEdit",
    "InsertNewData",
    "RequestDialogOpen",
    "ConvertToNativeImage",
];

const validConfigChannels: string[] = [
    "RequestConfigData",
    "SetConfigData"
]

const validDialogChannels: string[] = [
    "RequestDialogMessage",
    "RequestDialogOpen",
]

contextBridge.exposeInMainWorld("api", apis);

// ----- //
