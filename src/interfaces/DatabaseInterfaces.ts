type Bit = 0 | 1;

// ----
// Owners Types and Interfaces

export interface IOwner {

    ID: number;
    Name: string;
    Surname?: string;
    Organisation?: string;
    Job_Title?: string;
    Address_First: string;
    Address_Second?: string;
    Town: string;
    County: string;
    Post_Code: string;
    Country: string;
    Email?: string;    
    Telephone: string;
    Notes: string;

    Registered: Date;
    Last_Updated: Date;
    Active: Bit;
}

// ----
// Car Registry Types and Interface

type DriveType = 'L' | 'C' | 'R';

interface CarEngine {
    Engine_Make: string;
    Engine_Type: string;
    Engine_No: string;
    Engine_Rating: number;
}

export interface ICarRegistry {

    ID: number;
    Make: string;
    Model: string;
    Invalid_Carriage: number;
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

    Owner_ID: number;
    Current_Owner: string;
    Current_Owner2: string;
    OwnerChange: Date;
    Previous_Owners: string;

    History: string;
    MOT: Date;
    Documentation: string;
    Photo: number;

    LastUpdated: Date;
    Scraped: Bit;
    Deleted: Bit;
}