import { encode } from "punycode";

const CheckDate = (date: Date) => {
    if(date == null) return "";
    else return date.toISOString().split('T')[0];
}

const ConvertBit = (bitData: number): boolean => {
    if(bitData == 0) {
        return false;
    }
    else {
        return true;
    }
}

const CheckValue = (value: any) => {
    if(value != null) return value;
    else return '';
}

const CheckNULL = (value: any) => {
    if(value) return value;
    else return null;
}

export { CheckDate, ConvertBit, CheckValue, CheckNULL }