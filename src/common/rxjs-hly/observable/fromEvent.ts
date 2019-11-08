import { Observable } from '../Observable'
export function fromEvent<T>(target: HTMLElement, eventName: string) {
    return new Observable<T>((subscriber: { next: (arg0: T) => void; }) => {
        function handler(e: T) {
            console.log(e)
            subscriber.next(e)
        }
        setupSubscription(target, eventName, handler)
    })
}

function setupSubscription(target: HTMLElement, eventName: string, handler: (...args: any[]) => void) {
    target.addEventListener(eventName, handler)
}