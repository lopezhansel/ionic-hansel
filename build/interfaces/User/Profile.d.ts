import { MyEvent } from './MyEvent';
export declare module Profile {
    type Gender = "male" | "female" | "other" | "N/A";
    type osDevice = "ios" | "android";
    interface StandardUser {
        username?: string;
        email?: string;
        password?: string;
        passcode?: string;
        userId?: string;
        firstName: string;
        lastName?: string;
        fullName?: string;
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
