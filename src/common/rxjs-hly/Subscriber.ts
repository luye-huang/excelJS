export class Subscriber<T> {
    _next: Function
    constructor(next: Function) {
        this._next = next

    }
    next(val: T) {
        this._next(val)
        //    console.log(arguments) 
    }
}