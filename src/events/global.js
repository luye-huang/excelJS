window.container = document.getElementById('cluster')
window.addEventListener('contextmenu', function(event){
    // 阻止浏览器鼠标右击事件。
    event.preventDefault()
})
// window.addEventListener('resize', function(event){
//     console.log(document.getElementById('cluster').getBoundingClientRect())
//     // 阻止浏览器鼠标右击事件。
//     event.preventDefault()
// })
