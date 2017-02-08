export declare module AllActivities {
    interface ActivityLevel {
        id: number;
        maxSpeedMPH: number;
        mets: number;
        minSpeedMPH: number;
        name: string;
    }
    interface Activity {
        accessLevel: string;
        activityLevels?: ActivityLevel[];
        hasSpeed: boolean;
        id: number;
        name: string;
        mets?: number;
    }
    interface ActivityLevel2 {
        id: number;
        maxSpeedMPH: number;
        mets: number;
        minSpeedMPH: number;
        name: string;
    }
    interface Activity2 {
        accessLevel: string;
        hasSpeed: boolean;
        id: number;
        mets: number;
        name: string;
        activityLevels?: ActivityLevel2[];
    }
    interface SubCategory {
        activities: Activity2[];
        id: number;
        name: string;
    }
    interface Category {
        activities: Activity[];
        id: number;
        name: string;
        subCategories: SubCategory[];
    }
    interface RootObject {
        categories: Category[];
    }
    interface customActivity {
        id: number;
        maxSpeedMPH: number;
        mets: number;
        minSpeedMPH: number;
        name: string;
        accessLevel: string;
        hasSpeed?: boolean;
    }
}
/**
 * ```json
 * {
    "activityLog": {
      "activityId": 12030,
      "activityParentId": 90009,
      "calories": 197,
      "description": "5 mph (12 min/mile)",
      "distance": 3.34,
      "duration": 1800000,
      "isFavorite": false,
      "logId": 132394,
      "name": "Running",
      "startTime": "12:20",
      "steps": 2970
    }
  }
  ```
 *
 */
export interface ActivityLog {
    activityId: number;
    startTime: string;
    durationMillis: number;
    date: string;
    distance?: number;
    activityName?: string;
    manualCalories?: number;
    distanceUnit?: string;
}
