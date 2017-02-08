import { MyEvent } from './MyEvent'
export declare module Profile {

    export type Gender = "male" | "female" | "other" | "N/A";
    export type osDevice = "ios" | "android";

    export interface StandardUser {
        username?: string;// maybe their email
        email?: string;
        password?: string;
        passcode?: string; // not password. passcode is used only once while registering
        userId?: string; // not username

        firstName: string;
        lastName?: string;
        fullName?: string; // get this from combining their names

        gender?: Gender;
        address?: string;
        phone?: string;
        languages?: string[];

        bio?: string;
        age?: number;
        birthday?: number;
        latitude?: number;
        longitude?: number;
        events?: MyEvent.Event[];

        dateRegistered?: string;
        lastModified?: string;
    }


}
