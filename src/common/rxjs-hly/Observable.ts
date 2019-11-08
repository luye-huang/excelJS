import {Subscriber} from './Subscriber'

export class Observable<T> {
    _subscribe: Function;

    constructor(subscribe: Function) {
        this._subscribe = subscribe
    }

    pipe() {

    }

    subscribe(next: Function, complete?: () => void, error?: () => void) {
        console.log(next)
        this._subscribe(new Subscriber(next))
    }
}