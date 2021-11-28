
export type DatabaseType = 'register_of_cars' | 'owners';
type DriveType = 'L' | 'C' | 'R';

export interface ICarRegResult {
    ID: number;
    Make: string;
    Model: string;
    Reg_No: string;
    Chassis_No: string;
    Manufactured: number;
    First_Reg_DVLC: Date;
    First_Reg_RUM: Date;
    Colour: string;
    Drive: DriveType;
    Wheels: number;
    Seats: number | string;
    Engine_Make: string;
    Engine_Type: string;
    Engine_No: string;
    Engine_Rating: number;    
    Condition: string;
    MOT: string;
}

export interface IOwnerResult {
    ID: number;
    Name: string;
    Surname: string;
    Organisation: string;
    Job_Title: string;
    Address_First: string;
    Address_Second: string;
    Town: string;
    County: string;
    Post_Code: string;
    Country: string;
    Email: string;
}

export interface ServerCall
{

    message: string;
    errorOccured: boolean;
}