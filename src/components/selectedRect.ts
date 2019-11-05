import { DualCell } from '../types/position'
//@ts-ignore 
import { getPercentage } from '../common/utils'
export class selectedRect {
    el: HTMLElement
    constructor(endpoints: DualCell, parent: HTMLElement) {
        const small = [Math.min(endpoints.x1 as number, endpoints.x2 as number), Math.min(endpoints.y1 as number, endpoints.y2 as number)]
        const big = [Math.max(endpoints.x1 as number, endpoints.x2 as number), Math.max(endpoints.y1 as number, endpoints.y2 as number)]
        this.el = document.createElement('cell')
        this.el.classList.add('selecting-cell')
        this.el.style.left = getPercentage((small[0] - 1) / 8)
        this.el.style.top = getPercentage((small[1] - 1) / 2)
        this.el.style.width = getPercentage((big[0] - small[0] + 1) / 8)
        this.el.style.height = getPercentage((big[1] - small[1] + 1) / 2)
        parent.appendChild(this.el)
        console.log(this.el)
    }
    destroy() {

    }
}