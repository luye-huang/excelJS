import Rect from '../components/mergingRect'

const delegateDom = window.container
let merging = false, rect = null, x = 0, y = 0
delegateDom.addEventListener('contextmenu', () => {
    console.log(window.getComputedStyle(delegateDom))
    merging = true
    x = event.clientX - delegateDom.offsetLeft
    y = event.clientY - delegateDom.offsetTop
    rect = new Rect(x, y)
})
delegateDom.addEventListener('mousemove', () => {
    if (merging) {
        rect.update({ w: event.clientX - x, h: event.clientY - y })
    }
    // console.log('moving',event)
})

delegateDom.addEventListener('mouseup', () => {
    if (event.button == 2) {
        console.log(event)
        rect.destroy()
        merging = false
    }
})

