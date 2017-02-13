import * as I from '../../interfaces';
import { Steps } from '../../interfaces/FitBit-API/Steps';
export declare class StepGoals {
    static main(steps: I.FitBit.Steps.ActivitiesStep[], startDate?: string, endDate?: string, baseline?: number): Steps.PmWeekObj[];
    static createRandomStepData_DevOnly(): I.FitBit.Steps.ActivitiesStep[];
    private static sliceStepData(steps, startDate?, endDate?);
    private static breakIntoWeeks(steps);
    private static createWeekObject(steps, baseline);
    private static addGoalsToWeekObj(steps);
    private static percentile60(sevenDays);
    private static areThereEnoughDays(steps);
    private static goalForThisWeekIs(steps);
    private static checkIfUserMetGoalLastWeek(steps);
}
