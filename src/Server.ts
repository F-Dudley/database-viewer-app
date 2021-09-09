import { throws } from 'assert';
import * as fs from 'fs';
import { resolve } from 'path/posix';
import { QueryRequest, InsertRequest, UpdateRequest, AttributeRequest } from './interfaces/DataParameterInterfaces';

interface ConnectionRequirements {
    host: string,
    port?: string | '3306',
    user: string,
    password: string,
    database: string
}

export default class MySQLConnection {

    connectionRequirements: ConnectionRequirements;
    connection: any;

    constructor() {
        this.startServerConnection();
    }

    public startServerConnection(): boolean {
        let mysql = require('mysql');

        this.connection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'password',
            database: 'rum_data'
        });
        this.connection.connect()

        return true;
    }

    private endServerConnection(): void {
        this.connection.end();
    }

    public async reloadServerConnection() {
        this.endServerConnection();
        this.startServerConnection();

    }

    public RequestTableFieldNames(request: QueryRequest): Promise<Array<any> | Error> {
        return new Promise( (resolve, reject) => {
            this.connection.query(
                `SHOW COLUMNS FROM ${request.database}`, 
                (err: any, rows: []) => {
                    if(err) {
                        reject(err);
                    }
                    else if (rows.length === 0) {
                        reject(new Error("No Column Data Was Found."));
                    }
                    else {
                        resolve(rows);
                    }
                }
            )
        });
    }

    public RequestQueryList(request: QueryRequest): Promise<Array<any> | Error> {
        return new Promise( (resolve, reject) => {
            let columnTypes: string;
            let columnValues: string;

            let escapedUserData = `'%${this.connection.escape(request.searchRequest)}%'`;
            if(request.database == 'register_of_cars') {
                columnTypes = "`ID`, `Make`, `Model`, `Reg No`, `Chassis No`, `Manufactured`, `Colour`, `Drive`, `Wheels`, `Seats`, `Engine Make`, `Engine Type`, `Engine No`, `Engine Rating (cc)`, `Current Owner`, `Current Owner2`, `Condition`, `MOT`";
                columnValues = `\`ID\` LIKE ${escapedUserData} 
                                OR \`Make\` LIKE ${escapedUserData} 
                                OR \`Model\` LIKE ${escapedUserData}
                                OR \`Reg No\` LIKE ${escapedUserData}
                                OR \`Chassis No\` LIKE ${escapedUserData}
                                OR \`Manufactured\` LIKE ${escapedUserData}
                                OR \`Colour\` LIKE ${escapedUserData}
                                OR \`Drive\` LIKE ${escapedUserData}
                                OR \`Wheels\` LIKE ${escapedUserData}
                                OR \`Seats\` LIKE ${escapedUserData}
                                OR \`Engine Make\` LIKE ${escapedUserData}
                                OR \`Engine Type\` LIKE ${escapedUserData}
                                OR \`Engine No\` LIKE ${escapedUserData}
                                OR \`Engine Rating (cc)\` LIKE ${escapedUserData}
                                OR \`Current Owner\` LIKE ${escapedUserData}
                                OR \`Current Owner2\` LIKE ${escapedUserData}
                                OR \`Condition\` LIKE ${escapedUserData}
                                OR \`MOT\` LIKE ${escapedUserData}`;
            }
            else {
                columnTypes = "`ID`, `Christian Name`, `Surname`, `Organisation`, `Job Title`, `Address 1`, `Address 2`, `Town`, `County`, `Post Code`, `Country`, `email`";
                columnValues = `\`ID\` LIKE ${escapedUserData}
                                OR \`Christian Name\` LIKE ${escapedUserData}
                                OR \`Surname\` LIKE ${escapedUserData}
                                OR \`Organisation\` LIKE ${escapedUserData}
                                OR \`Job Title\` LIKE ${escapedUserData}
                                OR \`Address 1\` LIKE ${escapedUserData}
                                OR \`Address 2\` LIKE ${escapedUserData}
                                OR \`Town\` LIKE ${escapedUserData}
                                OR \`County\` LIKE ${escapedUserData}
                                OR \`Post Code\` LIKE ${escapedUserData}
                                OR \`Country\` LIKE ${escapedUserData}
                                OR \`email\` LIKE ${escapedUserData}`;
            }

            this.connection.query(
                `SELECT ${columnTypes} FROM ${request.database} WHERE ${columnValues};`,
                (err: any, rows: []) => {
                    if(err) {
                        reject(err);
                    }
                    else if(rows.length === 0) {
                        reject(new Error("No Entries Can Be Found"));
                    }
                    else {
                        resolve(rows);
                    }
                }
            );
        });
    }

    public RequestAttributeData(request: AttributeRequest): Promise<Array<any> | Error> {
        return new Promise( (resolve, reject) => {
            this.connection.query(
                `SELECT * FROM ${request.database} WHERE 'ID' = ?;`,
                [request.attributeID],
                (err: any, rows: []) => {
                    if(err) {
                        reject(err);
                    }
                    else if(rows.length === 0) {
                        reject(new Error(`Could Not Find Attribute With ID = ${request.attributeID}`))
                    }
                    else {
                        resolve(rows);
                    }
                }
            )
        });
    }

    public AppendAttributeEdit(request: UpdateRequest): Promise<boolean | Error> {
        let post = {};
        
        return new Promise( (resolve, reject) => {
            this.connection.query(
                "UPDATE ? SET ? WHERE `ID` = ?",
                [request.database, post, request.idValue],
                (err: any, result: any) => {
                    if(err) {
                        reject(err);
                    }
                    else if(result.affectedRows === 0) {
                        reject(new Error(`No Rows Affected.\nCannot Find Row with ID: ${request.idValue}`))
                    }
                    else {
                        console.log(`Updated ${result.affectedRows} in ${request.database}`);
                        resolve(true);
                    }
                }
            )
        })
    }

}