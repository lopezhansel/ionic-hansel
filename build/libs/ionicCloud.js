"use strict";
var axios = require("axios");
var IonicCloud = (function () {
    function IonicCloud() {
    }
    IonicCloud.init = function (bearerToken, profile) {
        IonicCloud.ionicProfile = profile;
        IonicCloud.bearerToken = bearerToken;
        IonicCloud.ionicHttp = axios.create({
            baseURL: 'https://api.ionic.io/push/',
            headers: {
                "Authorization": bearerToken,
                "Content-Type": "application/json"
            }
        });
    };
    IonicCloud.sendNotification = function (messageParam, deviceToken) {
        var payload = {
            "tokens": deviceToken,
            "profile": IonicCloud.ionicProfile,
            "notification": {
                // "title": "",
                "message": messageParam
            }
        };
        return IonicCloud.ionicHttp.post('notifications', payload)
            .then(function (response) {
            console.log('success', response.data);
            return response;
        })["catch"](function (err) {
            console.log('error', err);
            throw err;
        });
    };
    IonicCloud.getIosTokensThenSendNotif = function (messageParam, deviceToken) {
        return IonicCloud.ionicHttp.get('tokens')
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            var tokens = response.data.data.filter(function (el) {
                return el.type === 'ios';
            }).map(function (el) {
                return el.token;
            });
            return tokens;
        });
    };
    return IonicCloud;
}());
IonicCloud.ionicProfile = "";
IonicCloud.bearerToken = "";
IonicCloud.ionicHttp = axios.create({
    baseURL: 'https://api.ionic.io/push/',
    headers: {
        "Authorization": IonicCloud.bearerToken,
        "Content-Type": "application/json"
    }
});
exports.IonicCloud = IonicCloud;
//# sourceMappingURL=ionicCloud.js.map