"use strict";
var moment = require("moment");
var StepGoals = (function () {
    function StepGoals() {
    }
    StepGoals.main = function (steps, startDate, endDate, baseline) {
        var slicedSteps = StepGoals.sliceStepData(steps, startDate, endDate);
        var weeksArr = StepGoals.breakIntoWeeks(slicedSteps);
        var weekObj = StepGoals.createWeekObject(weeksArr, baseline);
        var weekObjWithGoals = StepGoals.addGoalsToWeekObj(weekObj);
        console.log(JSON.stringify(weekObjWithGoals, null, 2));
        return weekObjWithGoals;
    };
    StepGoals.createRandomStepData_DevOnly = function () {
        var output = [];
        var end = (Math.floor(Math.random() * 30) + 30);
        var start = Math.floor(Math.random() * 7) + 1;
        for (var i = start; i < Math.floor(Math.random() * 20) + 40; i++) {
            var curr = moment()
                .subtract(i, 'd')
                .format('YYYY-MM-DD');
            var day = {
                dateTime: curr,
                value: Math.floor(Math.random() * 8000) + 6000 + ""
            };
            output.push(day);
        }
        return output.reverse();
    };
    StepGoals.sliceStepData = function (steps, startDate, endDate) {
        if (!startDate && !endDate)
            return steps;
        var endMoment = (!endDate) ? moment() : moment(endDate);
        var startMoment = moment(startDate);
        var slicedWeek = steps
            .map(function (el) { return el; }) // clone it
            .reduce(weekReducer, []); // reduce from startDate to endDate
        function weekReducer(stepData, currDay) {
            var isWithinEndDate = (moment(currDay.dateTime, 'YYYY-MM-DD').diff(endMoment, 'd') > 0);
            if (endDate && stepData.length && isWithinEndDate)
                return stepData;
            var isWithinStartDate = (moment(currDay.dateTime, 'YYYY-MM-DD').diff(startMoment, 'd') >= 0);
            if (isWithinStartDate || stepData.length) {
                stepData.push(currDay);
            }
            return stepData;
        }
        return slicedWeek;
    };
    StepGoals.breakIntoWeeks = function (steps) {
        var arrayOf7Days = steps
            .reduce(function (weeksArray, currDay, index, steps) {
            weeksArray[weeksArray.length - 1].push(currDay);
            //// Add new week[] if Saturday
            var isCurrTheLastDayOfTheWeek = moment(currDay.dateTime, 'YYYY-MM-DD').weekday() === 6;
            // dont add new week[] if weeksArray[0] is empty
            var isFirstArrayEmpty = !weeksArray[0].length;
            // dont add new week[] if on last of steps[]
            var isCurrLastElement = (steps[steps.length - 1] == currDay);
            if (isCurrTheLastDayOfTheWeek && !isFirstArrayEmpty && !isCurrLastElement) {
                weeksArray.push([]);
            }
            return weeksArray;
        }, [[]]);
        return arrayOf7Days;
    };
    StepGoals.createWeekObject = function (steps, baseline) {
        var output = [];
        var newSteps = steps.map(function (e) { return e; });
        if (newSteps[0].length == 7) {
            newSteps.unshift([]);
        }
        newSteps.forEach(function (element, index) {
            output.push({
                week: index,
                goal: 0,
                baseline: baseline || 0,
                stepData: element
            });
        });
        return output;
    };
    StepGoals.addGoalsToWeekObj = function (steps) {
        // let copy = Object.assign([], steps)
        // steps.map(e => Object.assign({}, e))
        var notCopy = steps // not immutable yet.
            .map(function (el, weekNum, newSteps) {
            if (weekNum === 0) {
                return el; // skip week 0 since we can't create a goal with it
            }
            var nextWeek = newSteps[weekNum + 1];
            if (nextWeek) {
                nextWeek.goal = StepGoals.percentile60(el.stepData);
            }
            return el;
        });
        return notCopy;
    };
    StepGoals.percentile60 = function (sevenDays) {
        if (sevenDays.length !== 7)
            return null;
        return sevenDays
            .map(function (day) { return +day.value; }) // extract numbers only from lastWeek
            .sort(function (a, b) { return a - b; })[4]; // sort the number[][4]; // get the 60th percentile in the week, which is the 5th day
    };
    StepGoals.areThereEnoughDays = function (steps) {
        // moment().weekday(8)// nextMonday if its sunday moment().weekday(1)
        var weekdayNum = moment().weekday();
        if (weekdayNum === 0 || weekdayNum === 7) {
            if (steps.length >= 14) {
                return true; // res.send({ good: 'enough' })
            }
            else {
                return false; // res.send({ nope: "start next week" })
            }
        }
        else {
            var minimum = weekdayNum + 7;
            if (steps.length >= minimum) {
                return true; // res.send({ good: 'enough' })
            }
            else {
                return false; // res.send({ nope: "start next week" })
            }
        }
    };
    StepGoals.goalForThisWeekIs = function (steps) {
        var lastSunday = moment()
            .startOf("week")
            .format('YYYY-MM-DD');
        var lastWeek = steps
            .map(function (el) { return el; }) // clone it
            .reverse() // then reverse it
            .reduce(getLastWeek, []);
        var goal = StepGoals.percentile60(lastWeek);
        return goal;
        function getLastWeek(prev, curr) {
            if (prev.length > 6)
                return prev;
            if (curr.dateTime === lastSunday || prev.length) {
                // skip this week's days till you get to sunday
                prev.push(curr);
            }
            return prev;
        }
    };
    StepGoals.checkIfUserMetGoalLastWeek = function (steps) {
        var newStepData = steps.map(function (day) {
            // day.weekday = moment(day.dateTime, 'YYYY-MM-DD').format('dddd')
            return day;
        });
        // let lastDay = user.stepData[user.stepData.length - 1]
        var lastWeek = steps.slice(steps.length - 8, steps.length - 1);
        var weekBefore = steps.slice(steps.length - 15, steps.length - 8);
        var aGoal = weekBefore
            .map(function (aStep) { return +aStep.value; })
            .sort(function (a, b) { return a - b; })[4];
        var daysMissed = lastWeek.filter(function (day) {
            return +day.value < aGoal;
        });
        if (daysMissed.length) {
        }
        else {
        }
        // let today = moment()//.add(5, 'd') let thisMonday =
        // moment().startOf('week').add(1, 'day') let diffInDays =
        // today.diff(thisMonday, 'day') console.log(diffInDays);
        // console.log(user.stepData) user.startTime = moment().add(-31, 'd');
    };
    return StepGoals;
}());
exports.StepGoals = StepGoals;
// StepGoals.createWeekObject(StepGoals.breakIntoWeeks(StepGoals.createRandomStepData_DevOnly()), 7000)
// let fakeSteps = StepGoals.createRandomStepData_DevOnly();
// StepGoals.main(fakeSteps, moment().add(-31, 'd').toJSON(), '', 7777)
//# sourceMappingURL=Goals.js.map