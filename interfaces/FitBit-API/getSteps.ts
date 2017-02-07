
export declare module Steps {
    /**
     * dateTime :  YYYY-MM-DD
     * value : NumberString
     */
    export interface ActivitiesStep {
        dateTime: string; // YYYY-MM-DD
        value: string; // Number
    }

    export interface GetSteps {
        'activities-steps': ActivitiesStep[];
    }

    export interface pmWeekObj {
        week: number;
        baseline: number;
        goal: number;
        stepData: ActivitiesStep[];
    }
}


