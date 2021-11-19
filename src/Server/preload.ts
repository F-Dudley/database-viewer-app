const { contextBridge, ipcRenderer } = require('electron');

declare global {
    interface Window {api: APIRoutes,}
}

window.api = window.api;

interface APIRoutes {
    databaseAPI: {
        send: (channel: string, data: any) => void,
        receive: (channel: string, func: (data: any) => void) => void,
        receiveOnce: (channel: string, func: (data: any) => void) => void,
    }
}

const apis: APIRoutes = {
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
                console.log("Recieved Data From Invalid Channel");
            }
        },
    },
};

const validChannels: string[] = [

];

contextBridge.exposeInMainWorld("api", apis);