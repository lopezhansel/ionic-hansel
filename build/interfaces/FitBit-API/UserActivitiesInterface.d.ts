export declare module UserActivitiesInterface {
    interface ActivityLevel {
        minutes: number;
        name: string;
    }
    interface HeartRateZone {
        max: number;
        min: number;
        minutes: number;
        name: string;
    }
    interface ManualValuesSpecified {
        calories: boolean;
        distance: boolean;
        steps: boolean;
    }
    interface Source {
        id: string;
        name: string;
        type: string;
        url: string;
    }
    interface Activity {
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
    interface Pagination {
        beforeDate: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        sort: string;
    }
    interface UserActivities {
        activities: Activity[];
        pagination: Pagination;
    }
}
