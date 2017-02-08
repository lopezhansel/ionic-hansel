import * as I from '../../interfaces';
export declare class MyEvent {
    static createEvent(ev: I.User.MyEvent.Event): MyEvent;
    static sendData(): void;
    static createThenSendEvent(): void;
}
