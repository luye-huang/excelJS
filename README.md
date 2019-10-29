# excelJS


rxjs

combineAll
处理高阶ob。合并所有触发值，内、外ob没有新值都会整体发出。

combineLatest
静态方法，接多个ob。所有ob都触发过后一直触发，任一ob都会触发。

concatMap（concatMapTo)
处理生成高阶ob的函数。外层ob先，内层ob后

concatAll
处理高阶ob。外层ob先，内层ob后，

exhaustMap
处理生成高阶ob的函数。外ob触发后，才触发内ob。

forkJoin
静态方法，接多个ob。所有ob都触发后，发出一轮，就会complete。

mergeAll
处理高阶ob。同时触发

switchMap
处理生成高阶ob的函数。每次外ob触发都重新触发内ob。

withLatestFrom
接单个ob。提供这个ob最后触发的值。




buffer

expand 

generate

repeat takeUntil skipUntil



