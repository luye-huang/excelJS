import { Subject, fromEvent, concat } from 'rxjs'
import { filter, map, multicast, takeUntil, concatMap, take } from 'rxjs/operators'
import Rect from '../components/mergingRect.ts'


const delegate = document.getElementById('cluster')
const contextmenu$ = fromEvent(delegate, 'contextmenu')
const mousemove$ = fromEvent(delegate, 'mousemove')
const mouseup$ = fromEvent(delegate, 'mouseup')

concat(contextmenu$.pipe(take(1)), mousemove$).subscribe(console.log)

