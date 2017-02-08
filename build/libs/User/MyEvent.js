"use strict";
var MyEvent = (function () {
    function MyEvent() {
    }
    MyEvent.createEvent = function (ev) {
        var newEvent = {
            name: ev.name,
            timestamp: new Date().toISOString(),
            page: ev.page || "",
            errorMessage: ev.errorMessage || '',
            payload: ev.payload || {}
        };
        return newEvent;
    };
    MyEvent.sendData = function () {
    };
    MyEvent.createThenSendEvent = function () {
    };
    return MyEvent;
}());
exports.MyEvent = MyEvent;
//# sourceMappingURL=MyEvent.js.map