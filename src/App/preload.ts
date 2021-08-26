const { contextBridge, ipcRenderer } = require('electron');

import { electron } from 'node:process';
import './app-interfaces.ts';

const validChannels: string[] = [
    "TestChannel",
];

contextBridge.exposeInMainWorld("apis", 
    {
        databaseAPI: {

            send: (channel: string, data: any): any => {
                if(validChannels.includes(channel)){
                    ipcRenderer.send(channel, data);
                }
                else return "Channel Not Found.";
            },

            receive: (channel: string, func: any): any => {
                if(validChannels.includes(channel)) {
                    ipcRenderer.on(channel, (sender, data) => func(sender, data));
                }
                else return "Channel Not Found.";
            },
                
            invoke: (channel: string, request: InvokeRequest): any => {
                if(validChannels.includes(channel)) {
                    ipcRenderer.invoke(channel, request)
                    .then((result) => {
                        console.log(result);
                        return result;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }
            },  
        }
    }
);

ipcRenderer.invoke("TestChannel", {})
.then((result) => {
    console.log(result);
})