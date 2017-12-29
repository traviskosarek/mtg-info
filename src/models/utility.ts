export class Utility {
    public static isAlphaNumeric(str: string): boolean {
        let code;

        if (str !== undefined) {
            for (let i = 0; i < str.length; i++) {
                code = str.charCodeAt(i);
                if (
                    !(code >= 48 && code <= 57) && // numeric (0-9)
                    !(code >= 65 && code <= 90) && // upper alpha (A-Z)
                    !(code >= 97 && code <= 122) // lower alpha (a-z)
                ) {
                    return false;
                }
            }
        }
        return true;
    }
}
