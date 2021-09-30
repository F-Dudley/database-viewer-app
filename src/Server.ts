import { throws } from 'assert';
import * as fs from 'fs';
import { resolve } from 'path/posix';
import { QueryRequest, InsertRequest, UpdateRequest, AttributeRequest } from './interfaces/DataParameterInterfaces';
import { IOwner, ICarRegistry } from './interfaces/DatabaseInterfaces';
import { ICarRegResult, IOwnerResult } from './interfaces/ClientDatabaseInterfaces';

import { ConnectionRequirements } from './interfaces/DataParameterInterfaces';
import { NativeImage } from 'electron';

export default class MySQLConnection {

    private connectionRequirements: ConnectionRequirements;
    private connection: any;

    constructor(connectionData: ConnectionRequirements) {
        this.connectionRequirements = connectionData;
        this.startServerConnection();
    }

    public setConnectionRequiremnts(newConnectionData: ConnectionRequirements): void {
        this.connectionRequirements = newConnectionData;
    }

    public startServerConnection(): boolean {
        let mysql = require('mysql');

        this.connection = mysql.createConnection(this.connectionRequirements);
        this.connection.connect()

        return true;
    }

    public async reloadServerConnection() {
        this.endServerConnection();
        this.startServerConnection();
        console.log("\n--- Restarted Server Connection ---\n");
    }

    public endServerConnection(): void {
        this.connection.end();
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

    public RequestQueryList(request: QueryRequest): Promise<Array<ICarRegResult | IOwnerResult> | Error> {
        return new Promise( (resolve, reject) => {
            let columnTypes: string;
            let columnValues: string;

            let escapedUserData = this.connection.escape(`%${request.searchRequest}%`);
            if(request.database == 'register_of_cars') {
                columnTypes = "`ID`, `Make`, `Model`, `Reg_No`, `Chassis_No`, `Manufactured`, `Colour`, `Drive`, `Wheels`, `Seats`, `Engine_Make`, `Engine_Type`, `Engine_No`, `Engine_Rating`, `Current_Owner`, `Current_Owner`, `Condition`, `MOT`";
                columnValues = `\`ID\` LIKE ${escapedUserData} 
                                OR \`Make\` LIKE ${escapedUserData} 
                                OR \`Model\` LIKE ${escapedUserData} 
                                OR \`Reg_No\` LIKE ${escapedUserData} 
                                OR \`Chassis_No\` LIKE ${escapedUserData} 
                                OR \`Manufactured\` LIKE ${escapedUserData} 
                                OR \`Colour\` LIKE ${escapedUserData}
                                OR \`Drive\` LIKE ${escapedUserData} 
                                OR \`Wheels\` LIKE ${escapedUserData}
                                OR \`Seats\` LIKE ${escapedUserData} 
                                OR \`Engine_Make\` LIKE ${escapedUserData}
                                OR \`Engine_Type\` LIKE ${escapedUserData} 
                                OR \`Engine_No\` LIKE ${escapedUserData} 
                                OR \`Engine_Rating\` LIKE ${escapedUserData}
                                OR \`Current_Owner\` LIKE ${escapedUserData} 
                                OR \`Current_Owner2\` LIKE ${escapedUserData} 
                                OR \`Condition\` LIKE ${escapedUserData}
                                OR \`MOT\` LIKE ${escapedUserData}`;
            }
            else {
                columnTypes = "`ID`, `Name`, `Surname`, `Organisation`, `Job_Title`, `Address_First`, `Address_Second`, `Town`, `County`, `Post_Code`, `Country`, `Email`";
                columnValues = `\`ID\` LIKE ${escapedUserData}
                                OR \`Name\` LIKE ${escapedUserData}
                                OR \`Surname\` LIKE ${escapedUserData}
                                OR \`Organisation\` LIKE ${escapedUserData}
                                OR \`Job_Title\` LIKE ${escapedUserData}
                                OR \`Address_First\` LIKE ${escapedUserData}
                                OR \`Address_Second\` LIKE ${escapedUserData}
                                OR \`Town\` LIKE ${escapedUserData}
                                OR \`County\` LIKE ${escapedUserData}
                                OR \`Post_Code\` LIKE ${escapedUserData}
                                OR \`Country\` LIKE ${escapedUserData}
                                OR \`Email\` LIKE ${escapedUserData}`;
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

    public RequestAttributeData(request: AttributeRequest): Promise<Array<IOwner | ICarRegistry> | Error> {
        return new Promise( (resolve, reject) => {
            if(request.database != null) {
            this.connection.query(
                `SELECT * FROM \`${request.database}\` WHERE \`ID\` = ?;`,
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
            }

        });
    }

    public RequestAttributeCars(request: AttributeRequest): Promise<Array<ICarRegResult> | null> {
        let columnTypes = "`ID`, `Make`, `Model`, `Reg_No`, `Chassis_No`, `Manufactured`, `Colour`, `Drive`, `Wheels`, `Seats`, `Engine_Make`, `Engine_Type`, `Engine_No`, `Engine_Rating`, `Current_Owner`, `Current_Owner`, `Condition`, `MOT`";
        return new Promise( (resolve, reject) => {
            this.connection.query(
                `SELECT ${columnTypes} FROM \`register_of_cars\` WHERE \`Owner_ID\` = ?`,
                [request.attributeID],
                (err: any, rows: []) => {
                    if(err) {
                        reject(err);
                    }
                    else if(rows.length === 0) {
                        resolve(null);
                    }
                    else {
                        resolve(rows);
                    }
                }
            )
        });
    }

    public AppendAttributeEdit(request: UpdateRequest): Promise<boolean | Error> {
        
        return new Promise( (resolve, reject) => {
            this.connection.query(
                `UPDATE \`${request.database}\` SET ? WHERE \`ID\` = '?'`,
                [request.data, request.attributeID],
                (err: any, result: any) => {
                    if(err) {
                        reject(err);
                    }
                    else if(result.affectedRows === 0) {
                        reject(new Error(`No Rows Affected.\nCannot Find Row with ID: ${request.attributeID}`))
                    }
                    else {
                        console.log(`Updated ${result.affectedRows} in ${request.database}`);
                        resolve(true);
                    }
                }
            )
        })
    }

    public InsertNewEntry(request: InsertRequest): Promise<boolean | Error> {
        const parsedKeys: string[] = [];
        const parsedValues: any[] = [];

        for(const [key, value] of Object.entries(request.data)) {
            parsedKeys.push(key);
            if(key == 'Image' || key == 'Image2') {

                const blob = new Blob([value as Buffer], {type: 'image/png'});
                parsedValues.push(blob);
            }
            else {
                parsedValues.push(value);                
            }
        };

        return new Promise( (resolve, reject) => {
            this.connection.query(
                `INSERT INTO \`${request.database}\` (${parsedKeys}) VALUES (?);`,
                [parsedValues],
                (error: any, result: any) => {
                    if(error) {
                        reject(error);
                    }
                    else if(result.affectedRows === 0) {
                        reject(new Error(`No Data was Added to the Table: ${request.database}.`));
                    }
                    else {
                        console.log(`Inserted ${result.affectedRows} in ${request.database}`);
                        resolve(true);
                    }
                }
            )
        })
    }

}