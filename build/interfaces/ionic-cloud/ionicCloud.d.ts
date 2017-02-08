export declare module getTokens {
    interface Datum {
        created: Date;
        app_id: string;
        type: string;
        token: string;
        invalidated?: Date;
        id: string;
        valid: boolean;
    }
    interface Meta {
        version: string;
        status: number;
        request_id: string;
    }
    interface response {
        data: Datum[];
        meta: Meta;
    }
}
