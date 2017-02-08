"use strict";
var sql = require("mssql");
var MsSqlAPI = (function () {
    function MsSqlAPI() {
    }
    MsSqlAPI.setConfig = function (conf, useTrusted) {
        MsSqlAPI.config = conf;
        conf.port = conf.port || 1433;
        if (useTrusted) {
            conf.driver = "msnodesqlv8";
            conf.options = { trustedConnection: true };
        }
    };
    MsSqlAPI.checkConfig = function () {
        var cf = MsSqlAPI.config;
        if (!cf.user && !cf.password && !cf.driver && !cf.options) {
            throw new Error('You must use SqlAPI.setConfig() to set user and password or pass useTrusted parameter.');
        }
    };
    MsSqlAPI.openConnection = function () {
        MsSqlAPI.checkConfig();
        return new sql.Connection(MsSqlAPI.config).connect();
    };
    MsSqlAPI.query = function (query) {
        return MsSqlAPI.openConnection()
            .then(function (connection) {
            return new sql.Request(connection)
                .query(query);
        });
    };
    return MsSqlAPI;
}());
exports.MsSqlAPI = MsSqlAPI;
//# sourceMappingURL=MsSqlAPI.js.map