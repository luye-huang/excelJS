// import './events/index'
// import './actions/cell'


import { fromEvent } from './common/rxjs-hly/observable/fromEvent'
const click$ = fromEvent(document, 'click')

click$.subscribe((x) => {
    console.log(x)
})

// function forTest(a, b) {
//     return a + b
// }


// import { watch } from './common/watcher'

// let obj = {}

// const proxy = watch([
//     { name: printA, conditions: [['a', (x) => x > 5], ['c', (x) => x < 5]] },
//     {
//         name: printB,
//         conditions: [['a', (x) => x > 50], ['c', (x) => x < 5]],
//         events: [['click', document], ['contextmenu', document]]
//     }], obj)

// function printA() {
//     console.log('A')
// }

// function printB() {
//     console.log('B')
// }

// proxy.a = 6
// proxy.c = 1
// proxy.a = 55