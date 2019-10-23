import { Coordinate } from '../interface/components'
export default class {
    el: HTMLDivElement
    initialPos: Coordinate
    constructor(x: number, y: number) {
        this.el = document.createElement('div')
        this.el.classList.add('merging-rect')
        this.initialPos = { x, y }
        this.render()
        this._locate()
    }
    _locate() {
        this.el.style.top = this.initialPos.y - this.el.offsetTop + 'px'
        this.el.style.left = this.initialPos.x - this.el.offsetLeft + 'px'
        console.log(this.el.style)
    }
    render(): void {
        window.container.appendChild(this.el)
    }

    update(c: Coordinate): void
    update(c: Coordinate, isSize: boolean = false): void {
        console.log(c, this.initialPos)
        if (!isSize) {
            c.x -= this.initialPos.x
            c.y -= this.initialPos.y
        }
        // console.log(c)
        this.el.style.width = c.x + 'px'
        this.el.style.height = c.y + 'px'
    }
    destroy() {
        this.el.remove()
    }
}