import { ipcRenderer } from 'electron';

import { QueryRequest } from '../interfaces/DataParameterInterfaces';

ipcRenderer.on("RequestData", async (event, dataParams: QueryRequest) => {
    let requestedQuery = false;
    event.sender.send("RequestDataList-Response", requestedQuery);
});
