/// <reference types="axios" />
import * as I from '../interfaces';
export declare class FitbitApiData {
    userId: string;
    static bearerToken: string;
    http: Axios.AxiosInstance;
    constructor();
    logNewActivity(activity: any): Axios.IPromise<Axios.AxiosXHR<{}>>;
    getUserInfo(): Axios.IPromise<Axios.AxiosXHR<{}>>;
    getSteps(): Axios.IPromise<Axios.AxiosXHR<{}>>;
    getActivityForDay(): Axios.IPromise<Axios.AxiosXHR<{}>>;
    getUserActivityList(): void;
    getAllActivities(): Axios.IPromise<any[]>;
    getTcx(id: number): void;
    getCalories(): void;
    getCaloriesBMR(): void;
    getDistance(): void;
    getFloors(): void;
    getElevation(): void;
    getMinutesSedentary(): void;
    getMinutesLightlyActive(): void;
    getMinutesFairlyActive(): void;
    getMinutesVeryActive(): void;
    getActivityCalories(): void;
    unwantedCategories(category: I.FitBit.AllActivities.Category): boolean;
    flattenAllActivities(prev: any[], currentCat: I.FitBit.AllActivities.Category): I.FitBit.AllActivities.customActivity[];
}
