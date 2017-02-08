export declare module Steps {
    /**
     * dateTime :  YYYY-MM-DD
     * value : NumberString
     */
    interface ActivitiesStep {
        dateTime: string;
        value: string;
    }
    interface RootSteps {
        'activities-steps': ActivitiesStep[];
    }
    interface PmWeekObj {
        week: number;
        baseline: number;
        goal: number;
        stepData: ActivitiesStep[];
    }
}
