import * as twilio from 'twilio';
import * as moment from 'moment';
import * as axios from 'axios';
// You need to create your own file at './config/private_info'
import * as p from '../config'
import * as I from '../interfaces'

export class Twilio {
    static authToken = p.twilioInfo.account.key
    static accountSid = p.twilioInfo.account.key
    static client = new twilio.RestClient(Twilio.accountSid, Twilio.authToken)

    constructor() { }

    static init(): void { }

    static sendMessagesToThese(numbers: string[] | string, message: string) {
        return Twilio.client.messages
            .create({
                to: numbers,
                from: p.twilioInfo.account,
                body: message,
            })
    }

    static getPhoneNumber(): Axios.IPromise<string[]> {
        return axios.get<any>(p.twilioInfo.account.privateUrl)
            .then(res => {
                let phones = res.data
                    .map(u => {
                        u.phone = Twilio.parsePhoneNums(u.phone)
                        return u
                    })
                    .filter(u => u.phone.length == 12)
                    .map(u => u.phone)
                return phones
            })
    }

    static parsePhoneNums(phone: string): string {
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
        Twilio.sendMessagesToThese([p.twilioInfo.account.mynumber], `New Message Sent on:  ${new Date().toString()}`)
    }

}



