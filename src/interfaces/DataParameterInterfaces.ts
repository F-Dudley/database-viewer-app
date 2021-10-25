
import { DatabaseType } from './ClientDatabaseInterfaces';
import { ICarRegistry, IOwner } from './DatabaseInterfaces';

export interface TableRequest {
    database: DatabaseType,
}

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
    data: ICarRegistry | IOwner,
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

export interface IConfig {
    databaseSettings?: ConnectionRequirements;
}

export interface ConnectionRequirements {
    host: string,
    port: string | '3306',
    user: string,
    password: string,
    database?: string
}