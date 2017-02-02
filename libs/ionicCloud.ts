import * as axios from 'axios';
import * as I from '../interfaces';

export class IonicCloud {
    public static ionicProfile = "";
    public static bearerToken = ""

    public static ionicHttp = axios.create({
        baseURL: 'https://api.ionic.io/push/',
        headers: {
            "Authorization": IonicCloud.bearerToken,
            "Content-Type": "application/json"
        }
    });

    static init(bearerToken: string, profile: string) {
        IonicCloud.ionicProfile = profile;
        IonicCloud.bearerToken = bearerToken;

        IonicCloud.ionicHttp = axios.create({
            baseURL: 'https://api.ionic.io/push/',
            headers: {
                "Authorization": bearerToken,
                "Content-Type": "application/json"
            }
        });
    }

    static sendNotification(messageParam: string, deviceToken: string | string[]) {
        var payload = {
            "tokens": deviceToken,
            "profile": IonicCloud.ionicProfile,
            "notification": {
                // "title": "",
                "message": messageParam
            }
        }
        return IonicCloud.ionicHttp.post<any>('notifications', payload)
            .then(function (response) {
                console.log('success', response.data)
                return response
            })
            .catch(function (err) {
                console.log('error', err)
                throw err
            })
    }

    static getIosTokensThenSendNotif(messageParam: string, deviceToken: string) {
        return IonicCloud.ionicHttp.get<I.getTokens.response>('tokens')
            .then(function (response) {
                console.log(JSON.stringify(response.data))

                let tokens = response.data.data.filter(el => {
                    return el.type === 'ios'
                }).map(el => {
                    return el.token
                })
                return tokens

            })
    }

}
