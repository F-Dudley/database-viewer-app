const { contextBridge, ipcRenderer } = require('electron');

import './app-interfaces.ts';

declare global {
    interface Window {apis: APIRoutes,}
}

window.apis = window.apis;

interface APIRoutes {
    databaseAPI: {
        send: (channel: string, data: any) => void,
        receive: (channel: string, func: any) => void,
        invoke: (channel: string, request: InvokeRequest) => any,        
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
                ipcRenderer.invoke(channel, request)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        },  
    }
};

const validChannels: string[] = [
    "Ping",
];

contextBridge.exposeInMainWorld("apis", apis);