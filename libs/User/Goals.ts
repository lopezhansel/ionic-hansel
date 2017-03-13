import * as moment from 'moment'
import * as I from '../../interfaces'
import { Steps } from '../../interfaces/FitBit-API/Steps'

export class StepGoals {

    public static main(steps: I.FitBit.Steps.ActivitiesStep[], startDate?: string, endDate?: string, baseline?: number) {
        let slicedSteps = StepGoals.sliceStepData(steps, startDate, endDate)
        let weeksArr = StepGoals.breakIntoWeeks(slicedSteps);
        let weekObj = StepGoals.createWeekObject(weeksArr, baseline)
        let weekObjWithGoals = StepGoals.addGoalsToWeekObj(weekObj)
        console.log(JSON.stringify(weekObjWithGoals, null, 2))
        return weekObjWithGoals;
    }

    public static createRandomStepData_DevOnly(): I.FitBit.Steps.ActivitiesStep[] {
        let output = []
        let end = (Math.floor(Math.random() * 30) + 30)
        let start = Math.floor(Math.random() * 7) + 1
        for (var i = start; i < Math.floor(Math.random() * 20) + 40; i++) {
            let curr = moment()
                .subtract(i, 'd')
                .format('YYYY-MM-DD')
            let day = {
                dateTime: curr,
                value: Math.floor(Math.random() * 8000) + 6000 + ""
            }
            output.push(day)
        }
        return output.reverse()
    }

    private static sliceStepData(steps: I.FitBit.Steps.ActivitiesStep[], startDate?: string, endDate?: string): I.FitBit.Steps.ActivitiesStep[] {
        if (!startDate && !endDate) return steps;

        let endMoment = (!endDate) ? moment() : moment(endDate);
        let startMoment = moment(startDate);
        let slicedWeek = steps
            .map(el => el) // clone it
            .reduce(weekReducer, []); // reduce from startDate to endDate

        function weekReducer(stepData: I.FitBit.Steps.ActivitiesStep[], currDay: I.FitBit.Steps.ActivitiesStep): I.FitBit.Steps.ActivitiesStep[] {
            let isWithinEndDate = (moment(currDay.dateTime, 'YYYY-MM-DD').diff(endMoment, 'd') > 0)
            if (endDate && stepData.length && isWithinEndDate) return stepData;

            let isWithinStartDate = (moment(currDay.dateTime, 'YYYY-MM-DD').diff(startMoment, 'd') >= 0)
            if (isWithinStartDate || stepData.length) {
                stepData.push(currDay);
            }
            return stepData;
        }
        return slicedWeek;
    }

    private static breakIntoWeeks(steps: I.FitBit.Steps.ActivitiesStep[]): I.FitBit.Steps.ActivitiesStep[][] {
        let arrayOf7Days: I.FitBit.Steps.ActivitiesStep[][] = steps
            .reduce((weeksArray, currDay, index, steps) => {
                weeksArray[weeksArray.length - 1].push(currDay)
                //// Add new week[] if Saturday
                let isCurrTheLastDayOfTheWeek = moment(currDay.dateTime, 'YYYY-MM-DD').weekday() === 6;
                // dont add new week[] if weeksArray[0] is empty
                let isFirstArrayEmpty = !weeksArray[0].length
                // dont add new week[] if on last of steps[]
                let isCurrLastElement = (steps[steps.length - 1] == currDay);
                if (isCurrTheLastDayOfTheWeek && !isFirstArrayEmpty && !isCurrLastElement) {
                    weeksArray.push([])
                }
                return weeksArray
            }, [[]])
        return arrayOf7Days;
    }

    private static createWeekObject(steps: I.FitBit.Steps.ActivitiesStep[][], baseline: number): I.FitBit.Steps.PmWeekObj[] {
        let output: I.FitBit.Steps.PmWeekObj[] = []
        let newSteps = steps.map(e => e)
        if (newSteps[0].length == 7) {
            newSteps.unshift([])
        }
        newSteps.forEach((element, index) => {
            output.push({
                week: index,
                goal: 0,
                baseline: baseline || 0,
                stepData: element
            })
        });
        return output;
    }

    private static addGoalsToWeekObj(steps: I.FitBit.Steps.PmWeekObj[]) {// hlopez: mutable
        // let copy = Object.assign([], steps)
        // steps.map(e => Object.assign({}, e))
        let notCopy = steps// not immutable yet.
            .map((el, weekNum, newSteps) => {
                if (weekNum === 0) {
                    return el; // skip week 0 since we can't create a goal with it
                }
                let nextWeek = newSteps[weekNum + 1]
                if (nextWeek) {
                    nextWeek.goal = StepGoals.percentile60(el.stepData)
                }
                return el
            })
        return notCopy;
    }

    private static percentile60(sevenDays: I.FitBit.Steps.ActivitiesStep[]): number {
        if (sevenDays.length !== 7) return null;

        return sevenDays
            .map(day => + day.value) // extract numbers only from lastWeek
            .sort((a, b) => a - b)[4] // sort the number[][4]; // get the 60th percentile in the week, which is the 5th day
    }

    private static areThereEnoughDays(steps: I.FitBit.Steps.ActivitiesStep[]): boolean {
        // moment().weekday(8)// nextMonday if its sunday moment().weekday(1)
        let weekdayNum = moment().weekday();
        if (weekdayNum === 0 || weekdayNum === 7) { // IF ITS SUNDAY:0
            if (steps.length >= 14) {
                return true // res.send({ good: 'enough' })
            } else {
                return false // res.send({ nope: "start next week" })
            }
        } else {
            let minimum = weekdayNum + 7;
            if (steps.length >= minimum) {
                return true // res.send({ good: 'enough' })
            } else {
                return false // res.send({ nope: "start next week" })
            }
        }
    }

    private static goalForThisWeekIs(steps: I.FitBit.Steps.ActivitiesStep[]): number {
        let lastSunday = moment()
            .startOf("week")
            .format('YYYY-MM-DD');
        let lastWeek = steps
            .map<I.FitBit.Steps.ActivitiesStep>(el => el) // clone it
            .reverse() // then reverse it
            .reduce(getLastWeek, []);
        let goal = StepGoals.percentile60(lastWeek)
        return goal;

        function getLastWeek(prev: I.FitBit.Steps.ActivitiesStep[], curr: I.FitBit.Steps.ActivitiesStep) {
            if (prev.length > 6) return prev;

            if (curr.dateTime === lastSunday || prev.length) {
                // skip this week's days till you get to sunday
                prev.push(curr);
            }
            return prev;
        }
    }

    private static checkIfUserMetGoalLastWeek(steps: I.FitBit.Steps.ActivitiesStep[]) {
        let newStepData = steps.map(day => {
            // day.weekday = moment(day.dateTime, 'YYYY-MM-DD').format('dddd')
            return day
        })
        // let lastDay = user.stepData[user.stepData.length - 1]
        let lastWeek = steps.slice(steps.length - 8, steps.length - 1)
        let weekBefore = steps.slice(steps.length - 15, steps.length - 8)
        let aGoal = weekBefore
            .map(aStep => + aStep.value)
            .sort((a, b) => a - b)[4];

        let daysMissed = lastWeek.filter(day => {
            return + day.value < aGoal
        });

        if (daysMissed.length) {
            // let randBaselineMessage = messages.metBaseline[Math.floor(Math.random() *
            // messages.metBaseline.length)];
            // Lib.IonicCloud.sendNotification(randBaselineMessage, user.deviceToken);
        } else {
            // let ranGoalMessage = messages.metGoal[Math.floor(Math.random() *
            // messages.metGoal.length)]; Lib.IonicCloud.sendNotification(ranGoalMessage,
            // user.deviceToken)
        }

        // let today = moment()//.add(5, 'd') let thisMonday =
        // moment().startOf('week').add(1, 'day') let diffInDays =
        // today.diff(thisMonday, 'day') console.log(diffInDays);
        // console.log(user.stepData) user.startTime = moment().add(-31, 'd');
    }

}
// StepGoals.createWeekObject(StepGoals.breakIntoWeeks(StepGoals.createRandomStepData_DevOnly()), 7000)
// let fakeSteps = StepGoals.createRandomStepData_DevOnly();
// StepGoals.main(fakeSteps, moment().add(-31, 'd').toJSON(), '', 7777)

