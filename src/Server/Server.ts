import * as fs from 'fs';
import { MysqlError } from 'mysql';
const mysql = require('mysql');

import { QueryRequest } from '../interfaces/DataParameterInterfaces';

interface ConnectionRequirements {
    host: string,
    port?: string | '3306',
    user: string,
    password: string,
    database: string
}

export default class MySQLServer {

    connection: any;
    config: ConnectionRequirements;

    constructor() {
        this.loadConnection();
    }

    private async loadConnection() {
        
        // Add MySQL Connection Data from Config File.
        this.config = {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'password',
            database: 'REM_data'
        };

        this.connection = mysql.createConnection(this.config);
        this.startConnection();
    }

    private startConnection() {
        this.connection.connect();
    }

    private endConnection() {
        this.connection.end();
    }

    public async requestListData(queryRequest: QueryRequest) {
        let sql = 'SELECT * from';
        if(queryRequest.DescendOrder) sql += 'DESC';

        this.connection.query(sql, async (error: MysqlError, results: any) => {
            if(error) {
                console.log(error);
                throw error;
            } 
            else {
                console.log('Queried Data is:')
                console.log(results);

                return results;
            }
        });
    }

}