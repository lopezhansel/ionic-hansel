"use strict";
var axios = require("axios");
// import { Observable } from 'rxjs/Observable'
var moment = require("moment");
var FitbitApiData = (function () {
    function FitbitApiData() {
        this.userId = '-';
        this.http = axios.create({
            baseURL: 'https://api.fitbit.com/1/',
            headers: {
                "Authorization": FitbitApiData.bearerToken,
                'Accept-Language': 'en_US'
            }
        });
    }
    FitbitApiData.prototype.logNewActivity = function (activity) {
        return this.http.post("user/" + this.userId + "/activities.json", activity);
    };
    FitbitApiData.prototype.getUserInfo = function () {
        return this.http.get("user/-/profile.json");
    };
    FitbitApiData.prototype.getSteps = function () {
        return this.http.get("user/" + this.userId + "/activities/steps/date/today/3m.json");
    };
    FitbitApiData.prototype.getActivityForDay = function () {
        return this.http.get("user/" + this.userId + "/activities/date/today.json");
    };
    FitbitApiData.prototype.getUserActivityList = function () {
        var today = moment().add(1, 'day').format('YYYY-MM-DD');
        this.http.get("user/" + this.userId + "/activities/list.json?beforeDate=" + today + "&sort=desc&limit=20&offset=0");
    };
    FitbitApiData.prototype.getAllActivities = function () {
        var _this = this;
        return this.http.get("activities.json")
            .then(function (res) {
            return res.data.categories
                .filter(_this.unwantedCategories)
                .reduce(_this.flattenAllActivities, []);
        });
    };
    FitbitApiData.prototype.getTcx = function (id) {
        this.http.get("user/" + this.userId + "/activities/4252760842.tcx");
    };
    FitbitApiData.prototype.getCalories = function () {
        this.http.get("user/" + this.userId + "/activities/calories/date/today/3m.json");
    };
    FitbitApiData.prototype.getCaloriesBMR = function () {
        this.http.get("user/" + this.userId + "/activities/caloriesBMR/date/today/3m.json");
    };
    FitbitApiData.prototype.getDistance = function () {
        this.http.get("user/" + this.userId + "/activities/distance/date/today/3m.json");
    };
    FitbitApiData.prototype.getFloors = function () {
        this.http.get("user/" + this.userId + "/activities/floors/date/today/3m.json");
    };
    FitbitApiData.prototype.getElevation = function () {
        this.http.get("user/" + this.userId + "/activities/elevation/date/today/3m.json");
    };
    FitbitApiData.prototype.getMinutesSedentary = function () {
        this.http.get("user/" + this.userId + "/activities/minutesSedentary/date/today/3m.json");
    };
    FitbitApiData.prototype.getMinutesLightlyActive = function () {
        this.http.get("user/" + this.userId + "/activities/minutesLightlyActive/date/today/3m.json");
    };
    FitbitApiData.prototype.getMinutesFairlyActive = function () {
        this.http.get("user/" + this.userId + "/activities/minutesFairlyActive/date/today/3m.json");
    };
    FitbitApiData.prototype.getMinutesVeryActive = function () {
        this.http.get("user/" + this.userId + "/activities/minutesVeryActive/date/today/3m.json");
    };
    FitbitApiData.prototype.getActivityCalories = function () {
        this.http.get("user/" + this.userId + "/activities/activityCalories/date/today/3m.json");
    };
    FitbitApiData.prototype.unwantedCategories = function (category) {
        return (category.name !== 'Wii Games' &&
            category.name !== 'XBOX Games' &&
            category.name !== 'Yoga' &&
            category.name !== 'Custom' &&
            category.name !== 'Transportation' &&
            category.name !== 'Self care' &&
            category.name !== 'Pilates' &&
            category.name !== 'Tailoring' &&
            category.name !== 'Music playing' &&
            category.name !== 'Occupations' &&
            category.name !== 'Miscellaneous' &&
            category.name !== 'Leisure and inactivity' &&
            category.name !== 'Lawn and garden' &&
            category.name !== 'Home repair' &&
            category.name !== 'Home activities' &&
            category.name !== 'Fishing and Hunting');
    };
    FitbitApiData.prototype.flattenAllActivities = function (prev, currentCat) {
        currentCat.activities
            .map(getRidOfLevels);
        // Not all Categories (currentCat) have subCategories
        if (currentCat.subCategories) {
            currentCat.subCategories
                .map(function (_a) {
                var activities = _a.activities;
                return activities.map(getRidOfLevels);
            });
        }
        // this function relies on prev
        function getRidOfLevels(activity) {
            if (!activity.activityLevels) {
                prev.push(activity);
            }
            else {
                activity.activityLevels.map(function (level) {
                    // level.accessLevel = activity.accessLevel
                    level.name = activity.name + " - " + level.name;
                    prev.push(level);
                });
            }
        }
        return prev;
    };
    return FitbitApiData;
}());
FitbitApiData.bearerToken = "";
exports.FitbitApiData = FitbitApiData;
//# sourceMappingURL=FitBitAPI.js.map