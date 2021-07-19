const canvas = document.querySelector('canvas')
let cw = canvas.width = window.innerWidth
let ch = canvas.height = window.innerHeight
const c = canvas.getContext('2d')



//---------------------VARIABLES--------------------------

var pirateSound = document.getElementById('beep');

//spawn location and speed - of the PIRATES
let x = Math.random() * cw
let y = Math.random() * ch

//randomise starting direction of PIRATES

let xDirection;
switch (Math.round(Math.random())) {
    case 0:      xDirection = -1
      break
    case 1:      xDirection = 1 
}
  let yDirection;
  switch (Math.round(Math.random())) {
    case 0:      yDirection = -1
      break
    case 1:      yDirection = 1 }

let dx = Math.random() * 10 * 0.1 * xDirection //atrums
let dy = Math.random() * 10 * 0.1 *  yDirection//atrums
//let dx = 2; let dy = 2 //atrums

let radius = 10;
let visibleRadius = 10;


// RADAR VARIABLES
let stX = cw / 2;    //standing centre x
let stY = ch / 2; //standing centre y
let stR = 0;// radius
let stRadMax = cw / 4;
let stD = 1;

let signalRadius = 0;


///HELPER FUNCTIONS

function playAudio() { 
    pirateSound.play(); 
  } 
  
  function pauseAudio() { 
    pirateSound.pause(); 
  } 




////////////////////////////////////////////
////////////// MAIN FUNCTION///////////////
///////////////////////////////////////////
function animateEverythingOut(){
    requestAnimationFrame(animateEverythingOut)
c.clearRect(0, 0, cw, ch)
c.fillStyle = "black"
c.fillRect(0, 0, cw, ch)

//  BOAT
c.beginPath()
c.arc(stX, stY, 10, 0, Math.PI * 2, false)
//c.strokeStyle = "blue"
//c.stroke()
c.fillStyle = "blue"
c.fill()


//RADAR
c.beginPath()
c.arc(stX, stY, stR, 0, Math.PI * 2, false)
c.strokeStyle = "black"
c.stroke()
//c.fillStyle = "blue"
//c.fill()

 //RADAR SIGNAL
c.beginPath()
c.arc(stX, stY, signalRadius, 0, Math.PI * 2, false)
c.strokeStyle = "green"
c.stroke()
//c.fillStyle = "blue"
//c.fill()

//radar radius
stR = stRadMax;

//radar signal radius
signalRadius ++
if (signalRadius >= stRadMax){
signalRadius = 0
}



//PIRATES
// moving circle stoke arc
c.beginPath()
c.arc(x, y, visibleRadius, 0, Math.PI * 2, false)
//c.strokeStyle = "red"
//c.stroke()
c.fillStyle = "red"
c.fill()


// conditions for bouncing from walls
if (x + radius > cw || x - radius < 0){
    dx = -dx
}

if (y + radius > ch  || y - radius < 0){
    dy = -dy
}

//updating the location of pirates
x += dx
y += dy

//gameplay conditions
    
if ( Math.round((Math.sqrt(Math.pow(stX - x, 2)+Math.pow(stY - y,2))) -
10 - radius ) <= 0){
    dx = 0
    dy = 0
    signalRadius = 0

 c.fillStyle = "red"
    c.font = "40px Arial "
    xScore = "Game Over!"
    c.fillText(xScore, 1,66)
    xScore = "Pirates Got You!"
    c.fillText(xScore, 1,120)

}else if (  Math.round((Math.sqrt(Math.pow(stX - x, 2)+Math.pow(stY - y,2))) -
stR - radius ) >= 0){
    visibleRadius = 0;
    c.fillStyle = "blue"
    c.font = "40px Arial "
    xScore = "Clear! You are safe!"
    c.fillText(xScore, 1,66)

 

} else {visibleRadius = 10;

    c.fillStyle = "red"
    c.font = "50px Arial "
    xScore = "Attention! Pirates!"
    c.fillText(xScore, 1,66)

    playAudio();
}

c.fillStyle = "red"
c.font = "16px Arial "
xScore = "press anywhere to start game. wait for it"
c.fillText(xScore, 1,16)
}

animateEverythingOut()
