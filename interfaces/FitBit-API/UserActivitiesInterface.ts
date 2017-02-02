
export  declare module UserActivitiesInterface {

    export interface ActivityLevel {
        minutes: number;
        name: string;
    }

    export interface HeartRateZone {
        max: number;
        min: number;
        minutes: number;
        name: string;
    }

    export interface ManualValuesSpecified {
        calories: boolean;
        distance: boolean;
        steps: boolean;
    }

    export interface Source {
        id: string;
        name: string;
        type: string;
        url: string;
    }

    export interface Activity {
        activeDuration: number | any;
        activityLevel: ActivityLevel[];
        activityName: string;
        activityTypeId: number;
        averageHeartRate: number;
        calories: number;
        distance: number;
        distanceUnit: string;
        duration: number;
        heartRateLink: string;
        heartRateZones: HeartRateZone[];
        lastModified: Date;
        logId: any;
        logType: string;
        manualValuesSpecified: ManualValuesSpecified;
        pace: number;
        source: Source;
        speed: number;
        startTime: string;
        steps: number;
        tcxLink: string;
    }

    export interface Pagination {
        beforeDate: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        sort: string;
    }

    export interface UserActivities {
        activities: Activity[];
        pagination: Pagination;
    }

}
