import { Coordinate } from '../types/position'
export default class {
    el: HTMLDivElement
    initialPos: Coordinate
    offsetTop: number
    offsetLeft: number
    constructor(x: number, y: number) {
        this.el = document.createElement('div')
        const parent = window.container || {}
        this.offsetTop = parent.offsetTop
        this.offsetLeft = parent.offsetLeft
        // console.log(parent, this.offsetTop, this.offsetLeft)
        this.el.classList.add('merging-rect')
        this.initialPos = { x, y }
        this.render()
        this._locate(this.initialPos)
    }
    _locate(c: Coordinate) {
        this.el.style.top = c.y - this.offsetTop + 'px'
        this.el.style.left = c.x - this.offsetLeft + 'px'
    }
    render(): void {
        window.container.appendChild(this.el)
    }

    // update(c: Coordinate): void
    update(c: Coordinate): void {
        let { x, y } = c
        const rebase = x < this.initialPos.x || y < this.initialPos.y
        const [w, h] = [Math.abs(c.x - this.initialPos.x), Math.abs(c.y - this.initialPos.y)]
        if (rebase) {
            this._locate({ x: Math.min(x, this.initialPos.x), y: Math.min(y, this.initialPos.y) })
        }
        this.el.style.width = w + 'px'
        this.el.style.height = h + 'px'
    }
    destroy() {
        this.el.remove()
    }
}
