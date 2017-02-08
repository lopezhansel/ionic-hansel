import * as I from '../../interfaces'

export class MyEvent {

    static createEvent(ev: I.User.MyEvent.Event): MyEvent {
        let newEvent: MyEvent = {
            name: ev.name,
            timestamp: new Date().toISOString(),
            page: ev.page || "",
            errorMessage: ev.errorMessage || '',
            payload: ev.payload || {}
        }
        return newEvent
    }

    static sendData() {

    }

    static createThenSendEvent() {

    }

}
