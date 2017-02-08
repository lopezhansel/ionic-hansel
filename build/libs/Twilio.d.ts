/// <reference types="twilio" />
/// <reference types="q" />
/// <reference types="axios" />
import * as twilio from 'twilio';
export declare class Twilio {
    static client: twilio.RestClient;
    static authToken: string;
    static accountSid: string;
    static accountPhoneNum: string;
    static getPhoneNumbersUrl: string;
    static init(): void;
    static sendMessagesToThese(numbers: string[] | string, message: string): Q.Promise<any>;
    static getPhoneNumber(): Axios.IPromise<string[]>;
    static parsePhoneNumbers(phone: string): string;
    static getMessages(): Q.Promise<any>;
    static sendMessageToSelf(): void;
}
