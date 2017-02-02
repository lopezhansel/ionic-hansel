
export declare module GetStepsInterface {
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

}


