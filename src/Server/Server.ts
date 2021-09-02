import * as fs from 'fs';
const mysql = require('mysql');

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

    public requestListData() {
        
    }

}