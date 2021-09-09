
type Database = 'register_of_cars' | 'owners'

export interface QueryRequest {
    database: Database,
    searchRequest: string,
    DescendOrder?: boolean;
}

export interface AttributeRequest {
    database: Database,
    attributeID: number,
}

export interface UpdateRequest {
    database: Database,
    idValue: number
}

export interface InsertRequest {
    database: Database,
}