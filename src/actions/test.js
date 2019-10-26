import { Subject, fromEvent, concat } from 'rxjs'
import { filter, map, multicast, takeUntil, concatMap, take } from 'rxjs/operators'
import Rect from '../components/mergingRect.ts'


const delegate = document.getElementById('cluster')
const contextmenu$ = fromEvent(delegate, 'contextmenu')
const mousemove$ = fromEvent(delegate, 'mousemove')
const mouseup$ = fromEvent(delegate, 'mouseup')
contextmenu$.pipe(
    concatMap(
        ev0 => mousemove$.pipe(map(ev1 => ({ x0: ev0, x1: ev1 })))
    )
).subscribe(event => console.log(event))
// concat(contextmenu$.pipe(take(1)), mousemove$).subscribe(console.log)

