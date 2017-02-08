export declare module FitbitUserInterface {


    export interface Features {
        exerciseGoal: boolean;
    }
    /**
     * ```javascript
     * {
     *     "badgeGradientEndColor": "A489E8",
     *     "badgeGradientStartColor": "38216E",
     *     "badgeType": "DAILY_STEPS",
     *     "category": "Daily Steps",
     *     "cheers": [],
     *     "dateTime": "2016-09-03",
     *     "description": "20,000 steps in a day",
     *     "earnedMessage": "Congrats on earning your first High Tops badge!",
     *     "encodedId": "228TPP",
     *     "image100px": "http://static0.fitbit.com/images/badges_new/100px/badge_daily_steps20k.png",
     *     "image125px": "http://static0.fitbit.com/images/badges_new/125px/badge_daily_steps20k.png",
     *     "image300px": "http://static0.fitbit.com/images/badges_new/300px/badge_daily_steps20k.png",
     *     "image50px": "http://static0.fitbit.com/images/badges_new/badge_daily_steps20k.png",
     *     "image75px": "http://static0.fitbit.com/images/badges_new/75px/badge_daily_steps20k.png",
     *     "marketingDescription": "You've walked 20,000 steps  And earned the High Tops badge!",
     *     "mobileDescription": "When it comes to steps, it looks like you're not playing around. This achievement was a slam dunk.",
     *     "name": "High Tops (20,000 steps in a day)",
     *     "shareImage640px": "http://static0.fitbit.com/images/badges_new/386px/shareLocalized/en_US/badge_daily_steps20k.png",
     *     "shareText": "I took 20,000 steps and earned the High Tops badge! #Fitbit",
     *     "shortDescription": "20,000 steps",
     *     "shortName": "High Tops",
     *     "timesAchieved": 2,
     *     "value": 20000
     * }
     * ```
     */
    export interface TopBadge {
        badgeGradientEndColor: string;
        badgeGradientStartColor: string;
        badgeType: string;
        category: string;
        cheers: any[];
        dateTime: string;
        description: string;
        earnedMessage: string;
        encodedId: string;
        image100px: string;
        image125px: string;
        image300px: string;
        image50px: string;
        image75px: string;
        marketingDescription: string;
        mobileDescription: string;
        name: string;
        shareImage640px: string;
        shareText: string;
        shortDescription: string;
        shortName: string;
        timesAchieved: number;
        value: number;
        unit: string;
    }

    /**
     * ```javascript
     * {
     *     "user": {
     *         "age": 23,
     *         "autoStrideEnabled": true,
     *         "avatar": "https://d6y8zfzc2qfsl.cloudfront.net/3FA30BFA-6042-4279-66D8-D8CE7F3B1179_profile_100_square.jpg",
     *         "avatar150": "https://d6y8zfzc2qfsl.cloudfront.net/3FA30BFA-6042-4279-66D8-D8CE7F3B1179_profile_150_square.jpg",
     *         "averageDailySteps": 10108,
     *         "clockTimeDisplayFormat": "12hour",
     *         "corporate": false,
     *         "corporateAdmin": false,
     *         "dateOfBirth": "1993-01-14",
     *         "displayName": "Hansel",
     *         "distanceUnit": "en_US",
     *         "encodedId": "4TZNQ5",
     *         "features": {
     *             "exerciseGoal": true
     *         },
     *         "foodsLocale": "en_US",
     *         "fullName": "Hansel",
     *         "gender": "MALE",
     *         "glucoseUnit": "en_US",
     *         "height": 175.20000000000002,
     *         "heightUnit": "en_US",
     *         "locale": "en_US",
     *         "memberSince": "2016-08-08",
     *         "offsetFromUTCMillis": -21600000,
     *         "startDayOfWeek": "SUNDAY",
     *         "strideLengthRunning": 97.60000000000001,
     *         "strideLengthRunningType": "auto",
     *         "strideLengthWalking": 72.7,
     *         "strideLengthWalkingType": "default",
     *         "swimUnit": "en_US",
     *         "timezone": "America/Denver",
     *         "topBadges": top_badger_interface    

     *         "waterUnit": "en_US",
     *         "waterUnitName": "fl oz",
     *         "weight": 72.5,
     *         "weightUnit": "en_US"
     *     }
     * }
     * ```
     */
    export interface User {
        age: number;
        autoStrideEnabled: boolean;
        avatar: string;
        avatar150: string;
        averageDailySteps: number;
        clockTimeDisplayFormat: string;
        corporate: boolean;
        corporateAdmin: boolean;
        dateOfBirth: string;
        displayName: string;
        distanceUnit: string;
        encodedId: string;
        features: Features;
        foodsLocale: string;
        fullName: string;
        gender: string;
        glucoseUnit: string;
        height: number;
        heightUnit: string;
        locale: string;
        memberSince: string;
        offsetFromUTCMillis: number;
        startDayOfWeek: string;
        strideLengthRunning: number;
        strideLengthRunningType: string;
        strideLengthWalking: number;
        strideLengthWalkingType: string;
        swimUnit: string;
        timezone: string;
        topBadges: TopBadge[];
        waterUnit: string;
        waterUnitName: string;
        weight: number;
        weightUnit: string;
    }

    export interface UserProfile {
        user: User;
    }

}

