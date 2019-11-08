export class Subscriber<T> {
    _next: Function
    constructor(next: Function) {
        this._next = next
    }
    //来自 observable 的 subscribe
    next(val: T) {
        this._next(val)
        //    console.log(arguments) 
    }
}