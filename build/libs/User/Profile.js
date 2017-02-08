"use strict";
var moment = require("moment");
var Profile = (function () {
    function Profile(firstName, email, password, passcode, userId, lastName, username, gender, bio, birthday, dateRegistered // "YYYY-MM-DDThh:mm:ss.sssZ"
    ) {
        if (dateRegistered === void 0) { dateRegistered = moment().toISOString(); } // "YYYY-MM-DDThh:mm:ss.sssZ"
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.passcode = passcode;
        this.userId = userId;
        this.lastName = lastName;
        this.username = username;
        this.gender = gender;
        this.bio = bio;
        this.birthday = birthday;
        this.dateRegistered = dateRegistered; // "YYYY-MM-DDThh:mm:ss.sssZ"
        this.setLastModified();
    }
    Profile.prototype.setLastModified = function () {
        this.lastModified = new Date().toISOString();
        return this.lastModified;
    };
    Profile.prototype.getLastModified = function () {
        return this.lastModified;
    };
    Profile.prototype.getWeeksSinceRegistered = function () {
        return moment().diff(moment(this.getLastModified()), 'w');
    };
    Profile.prototype.getDaysSinceRegistered = function () {
        return moment().diff(moment(this.dateRegistered), 'd');
    };
    Profile.prototype.logMe = function () {
        console.log(this);
    };
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map