import './events/index'
import './actions/cell'
// import { fromEvent, EMPTY, merge } from 'rxjs';
// import { mapTo, startWith, scan } from 'rxjs/operators';

// const addButton = document.getElementById('addButton')
// const minusButton = document.getElementById('minusButton')
// const state = document.getElementById('state')

// const addClick$ = fromEvent(addButton, 'click').pipe(mapTo(1))
// const minusClick$ = fromEvent(minusButton, 'click').pipe(mapTo(-1))

// merge(
//     EMPTY.pipe(startWith(0)),
//     addClick$,
//     minusClick$)
//     .pipe(
//         scan((origin, next) => origin + next)
//     ).subscribe(item => {
//         state.textContent = item
//     })





// import { fromEvent, interval } from 'rxjs';
// import { concatMap, take } from 'rxjs/operators';

// const clicks = fromEvent(document, 'click');
// const result = clicks.pipe(
//   concatMap(ev => interval(1000).pipe(take(4)))
// );
// result.subscribe(x => console.log(x));


// import { interval } from 'rxjs';
// import { take, withLatestFrom } from 'rxjs/operators';
// const source$ = interval(500).pipe(take(3))
// const newest$ = interval(300).pipe(take(6))

// source$.pipe(
//   withLatestFrom(newest$)
// ).subscribe(x => console.log(x))// [0, 0]// [1, 2]// [2, 4]

