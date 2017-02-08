
export declare module Steps {
    /**
     * dateTime :  YYYY-MM-DD
     * value : NumberString
     */
    export interface ActivitiesStep {
        dateTime: string; // YYYY-MM-DD
        value: string; // Number
    }

    export interface RootSteps {
        'activities-steps': ActivitiesStep[];
    }

    export interface PmWeekObj {
        week: number;
        baseline: number;
        goal: number;
        stepData: ActivitiesStep[];
    }
}


