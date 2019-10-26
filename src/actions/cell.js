import { Subject, fromEvent } from 'rxjs'
import { filter, map, multicast, takeUntil, concatMap } from 'rxjs/operators'
import Rect from '../components/mergingRect.ts'


const delegate = document.getElementById('cluster')
const contextmenu$ = fromEvent(delegate, 'contextmenu')
const mousemove$ = fromEvent(delegate, 'mousemove')
const mouseup$ = fromEvent(delegate, 'mouseup')
let rect = null

// const multiMousedown = contextmenu$.pipe(multicast(() => new Subject()))
// const multiMouseup = mouseup$.pipe(multicast(() => new Subject()))

contextmenu$.subscribe((event) => {
    const x = event.clientX
    const y = event.clientY
    rect = new Rect(x, y)
})

contextmenu$.pipe(
    concatMap(
        mouseDownEvent => mousemove$.pipe(
            map(mouseMoveEvent => ({
                left: mouseMoveEvent.clientX,
                top: mouseMoveEvent.clientY
            })),
            takeUntil(mouseup$)
        )
    )
).subscribe(position => {
    // console.log(position)
    rect.update({ x: position.left, y: position.top })
})

mouseup$.pipe(filter(ev => ev.button == 2)).subscribe(() => {
    rect.destroy()
    rect = null
})

// mouseup$.subscribe((x) => {
//     console.log(x)
// })

// contextmenu$.pipe(
//     concatMap(
//         // mousemove$,
//         mouseDownEvent => mousemove$.pipe(
//             map(mouseMoveEvent => 2),
//             takeUntil(mouseup$)
//         )
//     )
// ).subscribe(position => {
//     console.log('right click')
// })



// mouseDown$.pipe(
//     concatMap(
//         mouseDownEvent => mouseMove$.pipe(
//             map(mouseMoveEvent => ({
//                 left: mouseMoveEvent.clientX - mouseDownEvent.offsetX,
//                 top: mouseMoveEvent.clientY - mouseDownEvent.offsetY
//             })),
//             takeUntil(mouseUp$)
//         ))
//     /* 上面注释掉的方法和下面的方法都可以 */
//     // concatMap(mouseDownEvent => mouseMove$.pipe(
//     //   takeUntil(mouseUp$)
//     // )),
//     // withLatestFrom(mouseDown$, (move, down) => ({
//     //   left: move.clientX - down.offsetX,
//     //   top: move.clientY - down.offsetY
//     // }))
// ).subscribe(position => {
//     eleDrag.style.left = position.left + 'px'
//     eleDrag.style.top = position.top + 'px'
// })

// mousemove$.subscribe({
//     next: () => console.log('moving'),
//     complete: () => console.log(complete)
// })

// mouseup$.pipe(filter(ev => ev.button == 2)).subscribe(() => {
//     console.log('right click done')
// })

