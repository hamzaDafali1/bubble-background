const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let bubblesArray = [];

let mouse = {
    x : 0,
    y : 0,
}

document.addEventListener("resize", function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth; 
})

document.addEventListener("mousemove", function(e) {
    mouse.x = event.x;
    mouse.y = event.y;
})

class bubbles {
    constructor() {
        this.x = Math.random() * canvas.width + 1;
        this.y = canvas.height + 5
        this.radius = Math.floor(Math.random() * 25 + 4);
        this.speed = Math.random() * (this.radius / 5) + 1;
        this.hue = Math.random() * 255 + 1;
    }
    update() {
        this.y -= this.speed;
        if(this.y < 0 ) {
            this.x = Math.random() * canvas.width + 1;
            this.y = canvas.height + 5
            this.radius = Math.floor(Math.random() * 25 + 4);
            this.speed = Math.random() * (this.radius / 5) + 1;
            this.hue = Math.random() * 255 + 1;
        }
        if(mouse.x < this.x + this.radius &&  mouse.x > this.x - this.radius) {
            if(mouse.y < this.y + this.radius && mouse.y > this.y - this.radius) {
                if(this.radius > 2.3){    
                    this.radius -= 2;
                }
            }    
        } 
    }
    draw() {
        let hue = Math.random() * 255 + 1;
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${this.hue},100%,50%)`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();


        ctx.beginPath();
        ctx.fillStyle = `white`;
        ctx.arc(this.x, this.y, this.radius * 0.8, 0, Math.PI * 1.5, true);
        ctx.fill();
        ctx.closePath();
    }

}

function background() {
    let backcolor = ctx.createLinearGradient(0,0, canvas.width, canvas.height);
    backcolor.addColorStop(0, 'rgb(233, 144, 144)');
    backcolor.addColorStop(1,'rgb(148, 133, 214)');
    ctx.beginPath();
    ctx.fillStyle = backcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function init() {
    for (let i = 0; i < 150; i++) {
        bubblesArray[i] = new bubbles;
    }
    background();
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    for (let i = 0; i < 150; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    } 
    requestAnimationFrame(animate);
}

init();
