window.onload = function() {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const particles = []; // an array to keep track of each particle
    const colors = ["blue", "green",  "orange", "red", "white", "#4488FF", "yellow"];
    const timeToStart = (60 * 2); // almost 3 seconds till the simulation will start
    let countToStart = 0;
    
    canvas.width = window.innerWidth; // full width Canvas
    canvas.height = window.innerHeight; // full height Canvas

    // a helper function that returns a random number between min and max
    const random = (min, max) => Math.random() * (max - min) + min;

    const createParticles = function(n) {
        for (let i = 0; i < n; i ++) {
            particles.push({
                x: canvas.width / 2, // center the particle on the x axis
                y: canvas.height / 2, // center the particle on the y axis
                color: colors[parseInt(random(0, colors.length))],
                size: random(2, 7),
                alpha: random(0.5, 1),
                speed: random(10, 100), // speed to scale up the vector
                vel: { // velocity unit vector
                    x: random(-.1, .1),
                    y: random(-.1, .1),
                }
            });
        }
    };

    // update each particle"s position based on its current velocity vector
    const update = function() {
        countToStart ++;
        if (countToStart > timeToStart) {
            particles.forEach(p => {
                p.x += p.vel.x * p.speed;
                p.y += p.vel.y * p.speed;
            });
        }
    };

    // draw each particle as a Rectangle (Circle would be nice too)
    const draw = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            context.fillStyle = p.color;
            context.globalAlpha = p.alpha;
            context.fillRect(p.x, p.y, p.size, p.size);
            context.globalAlpha = 1;
        });
    };

    const tick = function() {
        update();
        draw();
        requestAnimationFrame(tick);
    };

    createParticles(1000); // pass the number of particles

    tick();
}