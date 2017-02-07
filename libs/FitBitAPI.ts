import * as axios from 'axios';
import * as I from '../interfaces';
// import { Observable } from 'rxjs/Observable'
import * as moment from 'moment'


export class FitbitApiData {

    public userId: string = '-';
    public static bearerToken = ""
    public http = axios.create({
        baseURL: 'https://api.fitbit.com/1/',
        headers: {
            "Authorization": FitbitApiData.bearerToken,
            'Accept-Language': 'en_US'
        }
    });

    constructor() { }

    logNewActivity(activity) {
        return this.http.post(`user/${this.userId}/activities.json`, activity)
    }

    getUserInfo() {
        return this.http.get(`user/-/profile.json`)
    }

    getSteps() {
        return this.http.get(`user/${this.userId}/activities/steps/date/today/3m.json`)
    }

    getActivityForDay() {
        return this.http.get(`user/${this.userId}/activities/date/today.json`)
    }

    getUserActivityList() {
        let today = moment().add(1, 'day').format('YYYY-MM-DD');
        this.http.get(`user/${this.userId}/activities/list.json?beforeDate=${today}&sort=desc&limit=20&offset=0`)
    }

    getAllActivities() {
        return this.http.get<I.FitBit.AllActivities.RootObject>(`activities.json`)
            .then(res => {  // what if allFitbitActivities returns empty or error.. 
                return res.data.categories
                    .filter(this.unwantedCategories)
                    .reduce(this.flattenAllActivities, [])
            });
    }

    getTcx(id: number) {
        this.http.get(`user/${this.userId}/activities/4252760842.tcx`)
    }

    getCalories() {
        this.http.get(`user/${this.userId}/activities/calories/date/today/3m.json`)
    }

    getCaloriesBMR() {
        this.http.get(`user/${this.userId}/activities/caloriesBMR/date/today/3m.json`)
    }

    getDistance() {
        this.http.get(`user/${this.userId}/activities/distance/date/today/3m.json`)
    }

    getFloors() {
        this.http.get(`user/${this.userId}/activities/floors/date/today/3m.json`)
    }

    getElevation() {
        this.http.get(`user/${this.userId}/activities/elevation/date/today/3m.json`)
    }

    getMinutesSedentary() {
        this.http.get(`user/${this.userId}/activities/minutesSedentary/date/today/3m.json`)
    }

    getMinutesLightlyActive() {
        this.http.get(`user/${this.userId}/activities/minutesLightlyActive/date/today/3m.json`)
    }

    getMinutesFairlyActive() {
        this.http.get(`user/${this.userId}/activities/minutesFairlyActive/date/today/3m.json`)
    }

    getMinutesVeryActive() {
        this.http.get(`user/${this.userId}/activities/minutesVeryActive/date/today/3m.json`)
    }

    getActivityCalories() {
        this.http.get(`user/${this.userId}/activities/activityCalories/date/today/3m.json`)
    }

    unwantedCategories(category: I.FitBit.AllActivities.Category) {
        return (  // Return only "Walking" , "Sports and Workouts" , "Dancing"
            category.name !== 'Wii Games' &&
            category.name !== 'XBOX Games' &&
            category.name !== 'Yoga' &&
            category.name !== 'Custom' &&
            category.name !== 'Transportation' &&
            category.name !== 'Self care' &&
            category.name !== 'Pilates' &&
            category.name !== 'Tailoring' &&
            category.name !== 'Music playing' &&
            category.name !== 'Occupations' &&
            category.name !== 'Miscellaneous' &&
            category.name !== 'Leisure and inactivity' &&
            category.name !== 'Lawn and garden' &&
            category.name !== 'Home repair' &&
            category.name !== 'Home activities' &&
            category.name !== 'Fishing and Hunting'
        )
    }

    flattenAllActivities(prev: any[], currentCat: I.FitBit.AllActivities.Category): I.FitBit.AllActivities.customActivity[] {
        currentCat.activities
            .map(getRidOfLevels)
        // Not all Categories (currentCat) have subCategories
        if (currentCat.subCategories) {
            currentCat.subCategories
                .map(({activities}) =>
                    activities.map(getRidOfLevels)
                )
        }
        // this function relies on prev
        function getRidOfLevels(activity: I.FitBit.AllActivities.Activity) {
            if (!activity.activityLevels) {
                prev.push(activity)
            } else {
                activity.activityLevels.map(level => {
                    // level.accessLevel = activity.accessLevel
                    level.name = activity.name + " - " + level.name
                    prev.push(level)
                })
            }
        }
        return prev;
    }

}

