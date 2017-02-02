export declare module getTokens {

    export interface Datum {
        created: Date;
        app_id: string;
        type: string;
        token: string;
        invalidated?: Date;
        id: string;
        valid: boolean;
    }

    export interface Meta {
        version: string;
        status: number;
        request_id: string;
    }

    export interface response {
        data: Datum[];
        meta: Meta;
    }

}
