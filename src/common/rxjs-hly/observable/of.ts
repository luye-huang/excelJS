import { Observable } from '../Observable'

export function of<T>(value: T) {
    return new Observable((subscribe: { next: (arg0: T) => void; }) => {
        subscribe.next(value)
    })
}