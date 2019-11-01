import { BehaviorSubject, combineLatest, fromEvent } from 'rxjs'
import { concatMapTo, filter, tap } from 'rxjs/operators'

export const watch = (actions, component) => {
    const subject = new BehaviorSubject(component)
    actions.forEach(a => {
        const filters = a.conditions.map(c => filter(() => c[1](component[c[0]])))
        let events = a.events || []
        events = events.map(e => fromEvent(e[1], e[0]))
        console.log(events)
      
        // https://github.com/ReactiveX/rxjs/issues/3989, 
        // pipe does not support spread argument
        // so can not write:
        // subject.pipe(...filters).subscribe(() => {
        //     a.name()
        // })
        // has to write:
        // import { pipeFromArray } from 'rxjs/internal/util/pipe'
        // pipeFromArray(
        //     [...filters]
        // )(subject).subscribe(() => {
        //     a.name()
        // })

        combineLatest(...events, subject).pipe(...filters).subscribe(() => {
            a.name()
        })
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