import { ipcRenderer } from 'electron';
import MySQLServer from './Server';
import { QueryRequest } from '../interfaces/DataParameterInterfaces';

const server = new MySQLServer();

ipcRenderer.on("RequestData", async (event, dataParams: QueryRequest) => {
    let requestedQuery = await server.requestListData(dataParams)
    event.sender.send("RequestDataList-Response", requestedQuery);
});
