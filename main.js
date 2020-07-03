var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var slider = document.getElementById("speedSlider"), growing = true, speed = slider.value;
slider.addEventListener("change", function() { 
    speed = slider.value;  
})

function p5Map(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

function updateSpeed(lowB, upB){
    speed = Math.cos(Date.now()/5000)*(upB-lowB) + lowB;
}

class Star{
    constructor(){
        this.x = Math.floor(Math.random()*canvas.width*2)-canvas.width;
        this.y = Math.floor(Math.random()*canvas.height*2)-canvas.height;
        this.z = Math.floor(Math.random()*canvas.width);
    }

    draw(){
        ctx.save()
        ctx.translate(canvas.width/2, canvas.height/2);

        ctx.beginPath();

        var sx = p5Map(this.x/this.z, 0, 1, 0, canvas.width);
        var sy = p5Map(this.y/this.z, 0, 1, 0, canvas.height);
        var r = p5Map(this.z, 0, canvas.width, 5, 0);

        ctx.arc(sx, sy, 1, 0, r);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.closePath();
        ctx.restore();
    }

    update(){
        this.z -= speed;
        if (this.z<1){
            this.z=canvas.width;
            this.x = Math.floor(Math.random()*canvas.width*2)-canvas.width;
            this.y = Math.floor(Math.random()*canvas.height*2)-canvas.height;
        }
    }
}
var stars = new Array(); for (var i = 0 ; i < 600 ; i++) stars.push(new Star());

function updateStars(stars){
    for (i = 0 ; i < stars.length ; i++) stars[i].update();
}

function drawStars(stars){
    for (i = 0 ; i < stars.length ; i++) stars[i].draw();
}


function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}

class Boid{
    constructor(speed){
        // Coordinates of tip
        this.x = Math.floor(Math.random()*canvas.width);
        this.y = Math.floor(Math.random()*canvas.height);

        // Measurements
        this.d = 10;                                // Side
        this.h = 4*this.d * Math.cos(Math.PI / 6);  // Height
        this.n = Math.floor(Math.random()*360);     // Angle

        this.speed = speed;
        this.color = (Math.floor(Math.random()*2) ? "#00E2FF" : "#75EFFF");
        this.thinkTimer = Math.floor(Math.random()*10);
        this.friends = new Array();

        this.friendRadius = 60;
        this.crowdRadius = 30;

    }

    getFriends(){
        var nearby = new Array();
        for (var i = 0 ; i < boids.length ; i++){
            var t = boids[i];
            if (t==this) continue;
            if (Math.abs(t.x-this.x) < this.friendRadius && Math.abs(t.y-this.y) < this.friendRadius) nearby.push(t);
        }
        this.friends = nearby;
    }

    getAverageDirection(){
        var nSum = 0, count = 0;

        for (var i = 0 ; i < this.friends.length ; i++){
            var t = this.friends[i];
            var xDistance = Math.abs(this.x - t.x), yDistance = Math.abs(this.y - t.y), 
            d = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
            if (d > 0 && d < this.friendRadius) {
                nSum += t.n;
                count++;
            }
        }
        if (count > 0) nSum = nSum / count;
        return nSum;
    }

    getAvoidDir(){
        var xSum = 0, ySum = 0, count = 0;

        for (var i = 0 ; i < this.friends.length ; i++){
            var t = this.friends[i];
            var xDistance = Math.abs(this.x - t.x), yDistance = Math.abs(this.y - t.y), 
            d = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
            if (d > 0 && d < this.crowdRadius) {
                xSum += t.x; ySum += t.y;
                count++;
            }
        }
        if (count > 0) { xSum = xSum / count; ySum = ySum / count; }
        return Math.atan2(ySum - this.y, this.x - xSum);
    }

    update(){
        this.thinkTimer = (this.thinkTimer + 1) % 5;
        if (this.thinkTimer == 0) this.getFriends();

        // Other factors
        var avgDir = this.getAverageDirection();
        var avoidDir = this.getAvoidDir();
        var noise = Math.floor(Math.random() * 3) - 1;

        // Move 
        this.n -= (this.n - avgDir) / 10 + (avoidDir)  + noise;
        this.y -= this.speed*Math.cos(this.n*Math.PI/180);
        this.x += this.speed*Math.sin(this.n*Math.PI/180);
        // Map Bounds
        if (this.x>canvas.width)    this.x=0;
        if (this.x<0)               this.x=canvas.width;
        if (this.y>canvas.height)   this.y=0;
        if (this.y<0)               this.y=canvas.height;
    }

    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.n * Math.PI/180);

        // Boid body
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(-this.d, this.h);
        ctx.lineTo(this.d, this.h);
        ctx.closePath();
        
        ctx.restore();
    }
}
var boids = new Array(); for (var i = 0 ; i < 100 ; i++) boids.push(new Boid(3));

function updateBoids(boids){
    for (i = 0 ; i < boids.length ; i++) boids[i].update();
}

function drawBoids(boids){
    for (i = 0 ; i < boids.length ; i++) boids[i].draw();
}

function hyperspace() {
    clear();
    updateStars(stars);
    drawStars(stars);
    
    updateBoids(boids);
    drawBoids(boids);

    window.requestAnimationFrame(hyperspace)
}
