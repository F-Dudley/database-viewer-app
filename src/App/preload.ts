const { contextBridge, ipcRenderer } = require('electron');
import { func, string } from "prop-types";

let validChannels: string[] = [];

// Channels
validChannels.push("TestChannel");

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel: string, data: any) => {
            if(validChannels.includes(channel)){
                ipcRenderer.send(channel, data);
            }
            else return "Channel Not Found.";
        },

        receive: (channel: string, func: any) => {
            if(validChannels.includes(channel)) {
                ipcRenderer.on(channel, (sender, data) => func(sender, data));
            }
        },
        
});

console.log("Preloaded ContextBridge for Main Renderer");