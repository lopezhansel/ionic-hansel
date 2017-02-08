import * as I from '../../interfaces'
import { MyEvent } from './MyEvent'
import * as moment from 'moment'

export class Profile implements I.User.Profile.StandardUser {
    public fullName: string;
    public age: number;
    public deviceToken: string;
    public events: I.User.MyEvent.Event[];
    public typeOfDevice: I.User.Profile.osDevice;
    public stepData: any[];
    public languages: string[];
    public phone: string;
    public address: string;
    public latitude: number;
    public longitude: number;
    public lastModified: string;

    constructor(
        public firstName: string,
        public email?: string,
        public password?: string,
        public passcode?: string,
        public userId?: string,
        public lastName?: string,
        public username?: string,
        public gender?: I.User.Profile.Gender,
        public bio?: string,
        public birthday?: number,
        public dateRegistered = moment().toISOString() // "YYYY-MM-DDThh:mm:ss.sssZ"
    ) {
        this.setLastModified();
    }

    public setLastModified(): string {
        this.lastModified = new Date().toISOString()
        return this.lastModified
    }

    public getLastModified(): string {
        return this.lastModified;
    }

    public getWeeksSinceRegistered(): number {
        return moment().diff(moment(this.getLastModified()), 'w')
    }

    public getDaysSinceRegistered(): number {
        return moment().diff(moment(this.dateRegistered), 'd')
    }

    public logMe(): void {
        console.log(this)
    }

}
