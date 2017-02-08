/// <reference types="axios" />
export declare class IonicCloud {
    static ionicProfile: string;
    static bearerToken: string;
    static ionicHttp: Axios.AxiosInstance;
    static init(bearerToken: string, profile: string): void;
    static sendNotification(messageParam: string, deviceToken: string | string[]): Axios.IPromise<never>;
    static getIosTokensThenSendNotif(messageParam: string, deviceToken: string): Axios.IPromise<string[]>;
}
