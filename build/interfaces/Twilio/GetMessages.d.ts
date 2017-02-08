export declare module GetMessages {
    interface SmsMessage {
        sid: string;
        date_created: string;
        date_updated: string;
        date_sent: string;
        account_sid: string;
        to: string;
        from: string;
        body: string;
        status: string;
        direction: string;
        price: string;
        price_unit: string;
        api_version: string;
        uri: string;
        num_segments: string;
        dateCreated: Date;
        dateUpdated: Date;
        dateSent: Date;
        accountSid: string;
        priceUnit: string;
        apiVersion: string;
        numSegments: string;
    }
    interface SmsMessage2 {
        sid: string;
        date_created: string;
        date_updated: string;
        date_sent: string;
        account_sid: string;
        to: string;
        from: string;
        body: string;
        status: string;
        direction: string;
        price: string;
        price_unit: string;
        api_version: string;
        uri: string;
        num_segments: string;
        dateCreated: Date;
        dateUpdated: Date;
        dateSent: Date;
        accountSid: string;
        priceUnit: string;
        apiVersion: string;
        numSegments: string;
    }
    interface messagesGet {
        first_page_uri: string;
        end: number;
        previous_page_uri?: any;
        sms_messages: SmsMessage[];
        uri: string;
        page_size: number;
        start: number;
        next_page_uri?: any;
        page: number;
        firstPageUri: string;
        previousPageUri?: any;
        smsMessages: SmsMessage2[];
        pageSize: number;
        nextPageUri?: any;
    }
}
