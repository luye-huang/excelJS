import { Subject, fromEvent, of, from, BehaviorSubject, combineLatest } from 'rxjs'
import { tap, filter, map, multicast, takeUntil, takeWhile, skipUntil, concatMap, concatMapTo, repeat } from 'rxjs/operators'
import Rect from '../components/mergingRect.ts'
import { pow, check } from '../common/observable.ts'
import { watch } from '../common/watcher'

let obj = {}

const proxy = watch([
    { name: printA, conditions: [['a', (x) => x > 5], ['c', (x) => x < 5]] },
    {
        name: printB,
        conditions: [['a', (x) => x > 50], ['c', (x) => x < 5]],
        events: [['click', document], ['contextmenu', document]]
    }], obj)

function printA() {
    console.log('A')
}

function printB() {
    console.log('B')
}

proxy.a = 6
proxy.c = 1
proxy.a = 55



// obj.a = 10
// obj.c = 1
// var num = 2
// var test = new BehaviorSubject(obj)
// var test2 = new BehaviorSubject(num)
// test.subscribe(console.log)
// const testClick = fromEvent(document, 'click')
// // test.pipe(filter(x => x > 9), concatMapTo(testClick)).subscribe(console.log)
// // check(test, x => x > 14, testClick).subscribe(val =>
// //     console.log(val)
// // )
// test.pipe(tap(x => console.log('tap', x)), filter(x => x.a > 4), filter(x => x.b > 4)).subscribe(x => console.log(x))

// test.next({ a: 5 })
// console.log(obj, 1)
// test.next({ a: 5, b: 5 })
// console.log(obj, 2)

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

