import { ServerCall } from "../interfaces/ClientDatabaseInterfaces";

const { contextBridge, ipcRenderer } = require('electron');


interface APIRoutes {
    databaseAPI: {
        send: (channel: string, data: any) => void,
        receive: (channel: string, func: (data: ServerCall) => void) => void,
        receiveOnce: (channel: string, func: (data: any) => void) => void,
    }

    windowFuncs: {
        send: (channel: string) => void,
        receive: (channel: string,  func: (data: any) => void) => void,
        receiveOnce: (channel: string, func: (data: any) => void) => void
    }
}

const apis: APIRoutes = {
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
                const newCallback = (_: null, data: ServerCall) => callback(data);
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

    windowFuncs: {
        send: (channel) => {
            if (validWindowFuncs.includes(channel)) {
                ipcRenderer.send(channel);
            }
            else console.log("Received Message for Invalid Channel.");
        },

        receive: (channel, callback) => {
            if (validWindowFuncs.includes(channel)) {
                const strippedCallback = (_: null,  data: any) => callback(data);
                ipcRenderer.on(channel, strippedCallback);
            }
            else console.log("Recieved Data For Invalid Channel.");
        },

        receiveOnce: (channel, callback) => {
            if (validWindowFuncs.includes(channel)) {
                const strippedCallback = (_: null, data: any) => callback(data);
                ipcRenderer.once(channel, strippedCallback);
            }
            else console.log("Recieved Data For Invalid Channel.");
        }
    }
};

const validDatabaseChannels: string[] = [
    "ReceiveServerCalls",
]

const validWindowFuncs: string[] = [
    "ServerWindow-Quit",
    "ServerWindow-Minimise"
]

contextBridge.exposeInMainWorld("api", apis);