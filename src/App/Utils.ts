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

const ConvertImageBlob = (blobArray: Uint8Array): Promise<string> => {
    return new Promise((resolve, reject) => {
        if(blobArray == null) {
            reject(new Error("Blob Data was Null"));           
        }

        let blob = new Blob([blobArray], { type: "image/png" });
        resolve(URL.createObjectURL(blob));
    });
}

const CheckNULL = (value: any) => {
    if(value) return value;
    else return null;
}

export { CheckDate, ConvertBit, CheckValue, CheckNULL, ConvertImageBlob }