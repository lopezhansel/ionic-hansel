"use strict";
var SuperStrings = (function () {
    function SuperStrings() {
    }
    SuperStrings.trimHtml = function (str) {
        var checkIfHTML = /<\/?[\w\s="/.':;#-\/]+>/ig;
        var index = str.search(checkIfHTML);
        if (index != -1) {
            str = str.substring(0, index);
        }
        return str;
    };
    SuperStrings.jsonify = function (obj) {
        return '<pre>' + JSON.stringify(obj, null, 2) + '</pre>';
    };
    return SuperStrings;
}());
exports.SuperStrings = SuperStrings;
//# sourceMappingURL=SuperStrings.js.map