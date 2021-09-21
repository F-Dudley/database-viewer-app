
import { DatabaseType } from './ClientDatabaseInterfaces';

export interface QueryRequest {
    database: DatabaseType,
    searchRequest: string,
    DescendOrder?: boolean;
}

export interface AttributeRequest {
    database: DatabaseType,
    attributeID: number,
}

export interface UpdateRequest {
    database: DatabaseType,
    attributeID: number,
    data: any
}

export interface InsertRequest {
    database: DatabaseType,
    data: any,
}


type DialogMessageType = "none" | "info" | "error" | "question" | "warning"

export interface DialogMessageRequest {
    title: string;
    message: string;
    type: DialogMessageType;
    buttons?: string[];
}

export interface DialogOpenRequest {
    title: string;
    defaultPath?: string;
    filters: any[];
    properties: string[];
}