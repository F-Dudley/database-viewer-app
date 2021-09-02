// ----
// Owners Types and Interfaces

interface Name {
    First_Name: string;
    Last_Name?: string;
}

interface Address {
    Address_First: string;
    Address_Second?: string;
    Town: string;
    Country: string;

}

export interface OwnersInterface {
    Organisation?: string;
    Job_Title?: string;
    Name: Name;
    Address: Address;
    Telephone: bigint;
    Email?: string;

    Registered: Date;
}

// ----
// Car Registry Types and Interface

type DriveType = 'L' | 'C' | 'R';
type ConditionType = 'Original' | 'Good' | 'Bad' |'Restored' | 'UnRestored' | 'Undriveable' | 'To Be Restored / Being Restored';

interface CarEngine {
    Engine_Make: string;
    Engine_Type: string;
    Engine_No: string;
    Engine_Rating: number;
}

export interface CarRegistryInterface {

    RUM_No: bigint;
    Make: string;
    Invalid_Carriage: boolean;
    REG_No: string;
    Chassis_No: string;
    Manufactured: bigint;
    First_Reg_DVLC: Date;
    First_Reg_RUM: Date;
    Colour: string;
    Drive: DriveType;
    Wheels: bigint;
    Seats: number;
    Engine: CarEngine;
    Condition: ConditionType;    

    Owner_ID: number;
    CurrentOwners: string[];
    OwnerChange: Date;
    PreviousOwners: string[];

    History: string;
    MOT: Date;
    Documentation: string;
    Photos: boolean;

    LastUpdated: Date;
    Scraped: boolean;
}