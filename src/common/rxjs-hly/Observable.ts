import { Subscriber } from './Subscriber'
// const type 

export class Observable<T> {
    _subscribe: Function;

    constructor(subscribe: Function) {
        this._subscribe = subscribe
    }

    pipe(operators: Array<T>) {
        operators.forEach(() => {

        })
        // return
    }

    subscribe(next: Function, complete?: () => void, error?: () => void) {
        console.log(next)
        this._subscribe(new Subscriber(next))
    }
}