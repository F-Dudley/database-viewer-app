type Bit = 0 | 1;

// ----
// Owners Types and Interfaces

export interface IOwner {

    ID: number;
    Name?: string;
    Surname?: string;
    Organisation?: string;
    Job_Title?: string;
    Address_First?: string;
    Address_Second?: string;
    Town?: string;
    County?: string;
    Post_Code?: string;
    Country?: string;
    Email?: string;    
    Telephone?: string;
    Notes?: string;

    First_Registered?: Date;
    Last_Updated?: Date;
    Active?: Bit;
}

// ----
// Car Registry Types and Interface

type DriveType = 'L' | 'C' | 'R';

export interface ICarRegistry {

    ID: number;
    Make?: string;
    Model?: string;
    Invalid_Carriage?: number;
    Reg_No?: string;
    Chassis_No?: string;
    Manufactured?: number;
    First_Reg_DVLC?: Date;
    
    Colour?: string;
    Drive?: DriveType;
    Wheels?: number;
    Seats?: number | string;
    Engine_Make?: string;
    Engine_Type?: string;
    Engine_No?: string;
    Engine_Rating?: number;
    First_Reg_RUM?: Date;     
     
    Owner_ID?: number;
    Current_Owner?: string;
    Current_Owner2?: string;
    Owner_Change?: Date;
    Previous_Owners?: string;

    Condition?: string;
    History?: string;
    MOT?: Date;
    Documentation?: string;
    Photo?: number;

    Image?: Buffer | string;
    Image2?: Buffer | string;

    Last_Updated?: Date;
    Scraped?: Bit;
    Deleted?: Bit;
}