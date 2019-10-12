export default class {
    constructor(x, y) {
        this.el = document.createElement('div')
        this.el.classList.add('merging-rect')
        this.render()
        this.el.style.top = y + 'px'
        this.el.style.left = x + 'px'
        console.log(this.el.style)
        
    }
    render() {

        window.container.appendChild(this.el)
    }
    update({ w, h }) {
        this.el.style.width = w + 'px'
        this.el.style.height = h + 'px'

    }
    destroy() {
        this.el.remove()
    }
}