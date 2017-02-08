"use strict";
var twilio = require("twilio");
var axios = require("axios");
var Twilio = (function () {
    function Twilio() {
    }
    Twilio.init = function () {
        Twilio.client = new twilio.RestClient(Twilio.accountSid, Twilio.authToken);
    };
    Twilio.sendMessagesToThese = function (numbers, message) {
        return Twilio.client.messages
            .create({
            to: numbers,
            from: Twilio.accountPhoneNum,
            body: message
        });
    };
    Twilio.getPhoneNumber = function () {
        return axios.get(Twilio.getPhoneNumbersUrl)
            .then(function (res) {
            var phones = res.data
                .map(function (u) {
                u.phone = Twilio.parsePhoneNumbers(u.phone);
                return u;
            })
                .filter(function (u) { return u.phone.length == 12; })
                .map(function (u) { return u.phone; });
            return phones;
        });
    };
    Twilio.parsePhoneNumbers = function (phone) {
        var test1 = "(123)456-7890";
        var test = "(123) 456-7890";
        return "+1" + phone.replace(/[- )(]/g, '');
    };
    Twilio.getMessages = function () {
        return Twilio.client.sms.messages.get({})
            .then(function (res) {
            console.log('testing:success');
            console.log(JSON.stringify(res));
        })["catch"](function (err) {
            console.log('testing:error');
            console.log(err);
        });
    };
    Twilio.sendMessageToSelf = function () {
        Twilio.sendMessagesToThese([Twilio.accountPhoneNum], "New Message Sent on:  " + new Date().toString());
    };
    return Twilio;
}());
exports.Twilio = Twilio;
//# sourceMappingURL=Twilio.js.map