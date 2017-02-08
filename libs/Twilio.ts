import * as twilio from 'twilio';
import * as moment from 'moment';
import * as axios from 'axios';
import * as I from '../interfaces'

export class Twilio {
    static client: twilio.RestClient;
    static authToken: string;
    static accountSid: string;
    static accountPhoneNum: string;
    static getPhoneNumbersUrl: string;

    static init(): void {
        Twilio.client = new twilio.RestClient(Twilio.accountSid, Twilio.authToken)
    }

    static sendMessagesToThese(numbers: string[] | string, message: string) {
        return Twilio.client.messages
            .create({
                to: numbers,
                from: Twilio.accountPhoneNum,
                body: message,
            })
    }

    static getPhoneNumber(): Axios.IPromise<string[]> {
        return axios.get<any>(Twilio.getPhoneNumbersUrl)
            .then(res => {
                let phones = res.data
                    .map(u => {
                        u.phone = Twilio.parsePhoneNumbers(u.phone)
                        return u
                    })
                    .filter(u => u.phone.length == 12)
                    .map(u => u.phone)
                return phones
            })
    }

    static parsePhoneNumbers(phone: string): string {
        let test1 = "(123)456-7890";
        let test = "(123) 456-7890";
        return "+1" + phone.replace(/[- )(]/g, '');
    }

    static getMessages(): Q.Promise<any> {
        return Twilio.client.sms.messages.get({})
            .then((res: I.GetMessages.messagesGet) => {
                console.log('testing:success');
                console.log(JSON.stringify(res));
            })
            .catch(err => {
                console.log('testing:error');
                console.log(err)
            })
    }

    static sendMessageToSelf(): void {
        Twilio.sendMessagesToThese([Twilio.accountPhoneNum], `New Message Sent on:  ${new Date().toString()}`)
    }

}
