"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utility = (function () {
    function Utility() {
    }
    Utility.isAlphaNumeric = function (str) {
        var code;
        if (str !== undefined) {
            for (var i = 0; i < str.length; i++) {
                code = str.charCodeAt(i);
                if (!(code >= 48 && code <= 57) &&
                    !(code >= 65 && code <= 90) &&
                    !(code >= 97 && code <= 122) &&
                    !(code === 32)) {
                    return false;
                }
            }
        }
        return true;
    };
    return Utility;
}());
exports.Utility = Utility;
//# sourceMappingURL=utility.js.map