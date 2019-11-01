import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs'
import { concatMapTo, filter, tap } from 'rxjs/operators'
import { pipeFromArray } from 'rxjs/internal/util/pipe'


interface action<T> {
    name: Function
    conditions: Array<condition>
}

interface condition {
    [0]: string
    [1]: any
}

interface prefab {
    [propName: string]: any,  // 任意类型
}


// [{ name: printA, conditions: [(x) => x > 5, (x) => x < 5] },
// { name: printB, conditions: [(x) => x > 50, (x) => x < 5] }]
export const watch = <T extends action<T>>(actions: Array<T>, component: prefab) => {
    const subject = new BehaviorSubject(component)
    actions.forEach(a => {
        const filters = a.conditions.map(c => filter(() => c[1](component[c[0]])))
        console.log(filters)
        // while(filters.length){
        //     let fil  = filters.pop() 
        //     // fil as Observable<T>
        //     subject.pipe(fil)
        // }
        pipeFromArray(
            [...filters]
        )(subject).subscribe(() => {
            a.name()
        })
        // https://github.com/ReactiveX/rxjs/issues/3989, 
        // pipe does not support spread argument
        // so can not write:
        // subject.pipe(...filter)




        // .subscribe(() => {
        //     a.name()
        // })
    })

    return new Proxy(component, {
        set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            subject.next(target)
            return true
        }
    })
}

// export class Watcher {
//     constructor(actions: Array<T>, component) {

//     }
// }