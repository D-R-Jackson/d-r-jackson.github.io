

//const circle = document.querySelector('.circle')
for(i = 0; i < 10; i++){
    var c = document.createElement('span')
    c.className ="circle"
    document.body.appendChild(c)
}
const circles = document.getElementsByClassName('circle')





function GetRandomInt(max){
    return Math.floor(Math.random() * max)}

function RandomColor(circle){
    return '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}
function randomiseLoc(circle){
    const xInt = GetRandomInt(window.innerWidth)
    const yInt = GetRandomInt(window.innerHeight)
    
    const rect=circle.getBoundingClientRect()
    const startX = rect.left
    const startY = rect.top
    
    circle.style.setProperty('--positionX', xInt+'px')
    circle.style.setProperty('--positionY', yInt+'px')
    createTrail(circle,startX,startY, xInt, yInt)
    
}
//trail?
function createTrail(c ,startX, startY,xInt ,yInt){
    const amount = 15
    var x = 0
    var creationInterval = setInterval(() =>{
        var t = document.createElement("span")
        document.body.appendChild(t)
        t.style.position = 'fixed'
        t.style.width =  '10px'
        t.style.height = '10px'
        t.style.borderRadius = '100%'
        t.style.opacity = `${(amount-x)/amount}`
        
        const rect = c.getBoundingClientRect()
        console.log(rect.left,rect.top)
        t.style.left = startX +'px'
        t.style.top = startY+'px'
       t.style.transform = `translate(${rect.left}px, ${rect.top}px)`
        t.style.transition = 'transform 2s ease, opacity 2s ease'
        t.style.backgroundColor = '#ffffff'
        
        const targetX = xInt+c.offsetWidth
        const targetY = yInt+c.offsetHeight
        requestAnimationFrame(()=>{
            t.style.transform = `translate(${targetX-startX}px, ${targetY-startY}px)`
            t.style.opacity = "0"
        })
        //console.log('created')
        setTimeout(()=> t.remove(), 2000)
        if(x+1===amount){
            clearInterval(creationInterval)
        }
        x+=1
    }, 1)
    
}

Array.prototype.forEach.call(circles, (circle)=>{
       
        randomiseLoc(circle)
        
        setInterval(() => randomiseLoc(circle),2000)
        
   
   // circle.style.setProperty('--circleColour', RandomColor(circle))
})


