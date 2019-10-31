// import from '../types/position'
import { Observable, from } from 'rxjs';
import { concatMapTo, filter } from 'rxjs/operators'

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

export const check = (from: Observable<any>, to: Observable<any>, predict:any):Observable<any> => {
    return from.pipe(filter(predict), concatMapTo(to))
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