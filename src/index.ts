import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import * as Path from 'path';

import { QueryRequest, InsertRequest, UpdateRequest, AttributeRequest } from './interfaces/DataParameterInterfaces';
import MySQLConnection from './Server';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

declare const SERVER_WINDOW_WEBPACK_ENTRY: string;
declare const SERVER_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow: BrowserWindow, serverWindow: BrowserWindow;

const createWindows = (): void => {

  mainWindow = new BrowserWindow({

    width: 1280,    
    height: 720,
    show: false,

    minWidth: 800,
    minHeight: 600,

    fullscreen: false,
    fullscreenable: false,
    resizable: false,

    webPreferences: {
      allowRunningInsecureContent: false,   
      contextIsolation: true,
      sandbox: true,      
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },

    title: "Database Viewer Application | Main Window",
    icon: Path.resolve(app.getAppPath(), 'icons/database_icon-64px.ico'),
  });

  serverWindow = new BrowserWindow({

    width: 500,
    height: 720,
    show: false,

    fullscreen: false,
    fullscreenable: false,
    resizable: false,

    webPreferences: {
      allowRunningInsecureContent: false,    
      contextIsolation: true,
      sandbox: true,      
      preload: SERVER_WINDOW_PRELOAD_WEBPACK_ENTRY,      
    },

    title: "Database Viewer Application | Server Window",
    icon: Path.resolve(app.getAppPath(), 'icons/database_icon-64px.ico'),
  });

  // Load Webpacked Version of App.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  serverWindow.loadURL(SERVER_WINDOW_WEBPACK_ENTRY);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    if(isDev) mainWindow.webContents.openDevTools();
  });
  
  serverWindow.once("ready-to-show", () => {
      if(isDev) {
        serverWindow.show();
        serverWindow.webContents.openDevTools();
        serverWindow.resizable = true;
      }
  });

  mainWindow.on("close", () => {
    if(!serverWindow.isDestroyed()){
      serverWindow.close();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindows();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const connection = new MySQLConnection();

ipcMain.on("Ping", () => {
  console.log("Pong");
});

ipcMain.on("RequestDataList", async (event, dataParams: QueryRequest) => {
  connection.RequestQueryList(dataParams)
  .then(results => {
    event.sender.send("RequestDataList", results);
  })
  .catch(error => {
    console.log(error);
    event.sender.send("RequestDataList", []);
  })
});

ipcMain.on("RequestAttributeEdit", async (event, dataParams: AttributeRequest) => {
  connection.RequestAttributeData(dataParams)
  .then(results => {  
    event.sender.send("RequestAttributeEdit", results);
  })
  .catch(error => {
    console.log(error);
    event.sender.send("RequestAttributeEdit", []);
  })
})

ipcMain.on("AppendAttributeEdit", async (event, dataParams: UpdateRequest) => {
  connection.AppendAttributeEdit(dataParams)
  .then(editted => {
    // Return Editted Value.
  })
  .catch(error => {
    console.log(error);
  })
});

ipcMain.on("InsertNewData", async (event, dataParams: InsertRequest) => {
  // Make Server Function For Data Insertion.
});