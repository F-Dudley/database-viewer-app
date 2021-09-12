const { contextBridge, ipcRenderer } = require('electron');


import { QueryRequest, AttributeRequest, InsertRequest,  UpdateRequest } from '../interfaces/DataParameterInterfaces';
import { ICarRegistry, IOwner} from '../interfaces/DatabaseInterfaces';
import { ICarRegResult, IOwnerResult } from '../interfaces/ClientDatabaseInterfaces';

declare global {
    interface Window {api: APIRoutes,}
}

window.api = window.api;
let SettingsConfig: any;

interface APIRoutes {
    databaseAPI: {
        send: (channel: string, data: QueryRequest | AttributeRequest | InsertRequest | UpdateRequest) => void,
        receive: (channel: string, func: (data: Array<ICarRegistry| IOwner| ICarRegResult | IOwnerResult> | null) => void) => void,
        receiveOnce: (channel: string, func: (data: Array<ICarRegistry| IOwner| ICarRegResult | IOwnerResult> | null) => void) => void,
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
            else {
                console.log("Recieved Data From Invalid Channel")
            }
        },

        receiveOnce: (channel, callback) => {
            if (validChannels.includes(channel)) {
                const newCallback = (_: null, data: any[]) => callback(data);
                ipcRenderer.once(channel, newCallback);
            }
            else {
                console.log("Recieved Data From Invalid Channel")
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
