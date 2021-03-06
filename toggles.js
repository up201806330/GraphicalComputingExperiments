var autoSpeedOn = true;
function toggleSpeed(){
    var text = document.getElementById("speedText"), slider = document.getElementById("speedSlider");
    if (autoSpeedOn){
        autoSpeedOn = false;
        speedTick();
        text.style.display = "inline";
        slider.style.display = "inline";    
    }
    else{
        autoSpeedOn = true;
        text.style.display = "none";
        slider.style.display = "none";
    }
}
var spaceOn = false;
function toggleSpace() {
    var speed = document.getElementById("speedButton");
    if (spaceOn){
        spaceOn = false;
        speed.style.display = "none"
        if (!autoSpeedOn) toggleSpeed();
    }    
    else{
        spaceOn = true;
        speed.style.display = "inline"
    }
}
var boidsOn = false;
function toggleBoids() {
    if (boidsOn)    boidsOn = false;
    else            boidsOn = true;
}
var squaresOn = false;
function toggleSquares(){
    var dots = document.getElementById("dotsButton");
    var interpolation = document.getElementById("interpolationButton")
    if (squaresOn)  {
        squaresOn = false;
        dots.style.display = "none";
        interpolation.style.display = "none";
    }
    else{
        squaresOn = true;
        dots.style.display = "inline-block";
        interpolation.style.display = "inline-block";
    }            
}
var dotsOn = false;
function toggleDots(){
    if (dotsOn) dotsOn = false;
    else        dotsOn = true;
}
var interpolationOn = false;
function toggleInterpolation(){
    if (interpolationOn) interpolationOn = false;
    else                 interpolationOn = true;
}
var cardioidOn = false;
function toggleCardioid(){
    var text = document.getElementById("totalText"), slider = document.getElementById("totalSlider");
    if (cardioidOn) {
        cardioidOn = false;  
        totalTick();
        text.style.display = "none";
        slider.style.display = "none";
        obstacles = new Array();
    }
    else {
        cardioidOn = true;
        text.style.display = "inline-block";
        slider.style.display = "inline-block";  

        // Add obstacle for boids
        obstacles.push(new Obstacle(canvas.width/2, canvas.height/2, 135, true));
    }
}
var flowFieldOn = false;
function toggleFlowField(){
    var particleSpeedtext = document.getElementById("particleSpeedText"), particleSpeedslider = document.getElementById("particleSpeedSlider"), 
    vectors = document.getElementById("vectorsButton"), traces = document.getElementById("tracesButton");
    timeIncrementText = document.getElementById("timeIncrementText"), timeIncrementSlider = document.getElementById("timeIncrementSlider");
    if (flowFieldOn){
        flowFieldOn = false;
        particleSpeedTick();
        particleSpeedtext.style.display = "none";
        particleSpeedslider.style.display = "none";

        vectors.style.display = "none";
        traces.style.display = "none";

        timeIncrementText.style.display = "none";
        timeIncrementSlider.style.display = "none";
    }
    else {
        flowFieldOn = true;
        newField();
        particleSpeedtext.style.display = "inline-block";
        particleSpeedslider.style.display = "inline-block";  

        vectors.style.display = "inline-block";  
        traces.style.display = "inline-block";  

        timeIncrementText.style.display = "inline-block";  
        timeIncrementSlider.style.display = "inline-block";    
    }             
}
var vectorsOn = false;
function toggleVectors(){
    if (vectorsOn){
        vectorsOn = false;
    }
    else {
        vectorsOn = true; 
    } 
}
var tracesOn = false;
function toggleTraces(){
    if (tracesOn){
        tracesOn = false;
    }
    else {
        tracesOn = true; 
    }
}