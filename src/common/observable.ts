// import from '../types/position'
import { Observable, from } from 'rxjs';
import { concatMapTo, filter, repeat, tap } from 'rxjs/operators'
import { any } from 'bluebird';

// Long Version
export const pow = (n: number) => (source: Observable<any>) =>
    new Observable(observer => {
        return source.subscribe({
            next(x) {
                observer.next(
                    Math.pow(x, n)
                );
            },
            error(err) { observer.error(err); },
            complete() { observer.complete(); }
        });
    });

// export const check = (from: Observable<any>, to: Observable<any>, predict: any): Observable<any> => {
//     return from.pipe(filter(predict), concatMapTo(to))


export const check = <T>(from: Observable<T>, predict: any, to: Observable<T>): Observable<T> => {
    return from.pipe(
        tap(val => console.log(val)),
        filter(predict), concatMapTo(to))
}






export function gf(a1: number): void
export function gf<T>(a1: T): void
export function gf(a1: number, a2: string, a3: <T>(arg: T) => void): void
export function gf(a1: any, a2?: any) {
    return a1 + a2
}
function isString(test: any): test is string {
    return typeof test === 'string';
}

function example(foo: any) {
    if (isString(foo)) {
        console.log('it is a string' + foo);
        console.log(foo.length);
        // console.log(foo.toExponential(2));
    }
    // console.log(foo.toExponential(2));
}
example('hlyhly')
interface limit {
    prop: number
    // [prop]
}
type ll = {
    prop: number
}
class HelpClass<T extends limit> {
    name: T;
    len: number;
    constructor(name: T) {
        this.name = name
        this.len = name.prop
    }
}


// export const check = (key, predict) => (source: Observable<any>) =>{

//     return new Observable(observer => {
//         return source.subscribe({
//             next(x) {
//                 observer.next(
//                     Math.pow(x, n)
//                 );
//             },
//             error(err) { observer.error(err); },
//             complete() { observer.complete(); }
//         });
//     });
// }

// export class check {

// }

// export class eventsChain {

// }