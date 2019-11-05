import { Subject, fromEvent, of, from, BehaviorSubject, combineLatest } from 'rxjs'
import { tap, filter, map, multicast, takeUntil, takeWhile, skipUntil, concatMap, concatMapTo, repeat, concat } from 'rxjs/operators'
import Rect from '../components/mergingRect.ts'
import {selectedRect} from '../components/selectedRect.ts'


const delegate = document.getElementById('cluster')
const cells = delegate.querySelectorAll('cell')
const mouseenter$ = fromEvent(cells, 'mouseenter')
// const mouseleave$ = fromEvent(cells, 'mouseleave')
const contextmenu$ = fromEvent(delegate, 'contextmenu')
const mousemove$ = fromEvent(delegate, 'mousemove')
const mouseup$ = fromEvent(delegate, 'mouseup')
let rect = null, selected = null, selectedCells = []

contextmenu$.subscribe((event) => {
    const x = event.clientX
    const y = event.clientY
    selectedCells = []
    rect = new Rect(x, y)
})

// 静态方法都是传入多个observable，比如merge concat combineLatest
// 从两个observable中组合数据可能要用map
// 两个事件observable都为持续性，同时写入一个observable可能无法订阅成功
// 另一种写法
// contextmenu$.pipe(
//     concatMap(
//         mouseDownEvent => mousemove$.pipe(
//             map(mouseMoveEvent => ({
//                 left: mouseMoveEvent.clientX,
//                 top: mouseMoveEvent.clientY
//             })),
//             takeUntil(mouseup$)
//         )
//     )
// ).subscribe(position => {
//     // console.log(position)
//     rect.update({ x: position.left, y: position.top })
// })

// 另一种写法 combineLatest(contextmenu$, mousemove$.pipe(takeUntil(mouseup$))).subscribe(console.log)
mousemove$.pipe(
    skipUntil(contextmenu$), takeUntil(mouseup$), repeat()
).subscribe(position => {
    rect.update({ x: position.clientX, y: position.clientY })
})


contextmenu$.pipe(
    concatMapTo(mouseenter$.pipe(
        takeUntil(mouseup$)
    ))
).subscribe(() => {
    if (selectedCells.length > 1) {
        selectedCells[1] = event.target
    } else {
        selectedCells.push(event.target)
    }
})

mouseup$.pipe(filter(ev => ev.button == 2)).subscribe(() => {
    // console.log(mergingCells)
    rect.destroy()
    rect = null
    const endpoints = {
        y1: selectedCells[0].getAttribute('row'),
        x1: selectedCells[0].getAttribute('column'),
        y2: selectedCells[1].getAttribute('row'),
        x2: selectedCells[1].getAttribute('column'),
    }
    console.log('endpoint:', endpoints)
    selected = new selectedRect(endpoints, delegate)
})


// contextmenu$.pipe(
//     concatMap(initEvent => mouseup$.pipe(
//         tap(event => event.initTarget = initEvent.target)
//     ))
// ).subscribe((event) => {
//     console.log(event)
//     rect.destroy()
//     rect = null
//     const endpoints = {
//         x1: event.initTarget.getAttribute('row'),
//         y1: event.initTarget.getAttribute('column'),
//         x2: event.target.getAttribute('row'),
//         y2: event.target.getAttribute('column'),
//     }
//     selected = new selectedRect(endpoints)
// })

// mouseup$.subscribe((x) => {
//     console.log(x)
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






