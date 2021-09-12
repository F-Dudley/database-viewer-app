
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
    idValue: number
}

export interface InsertRequest {
    database: DatabaseType,
}