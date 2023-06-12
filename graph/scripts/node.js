class Node {

    position;
    velocity;
    radius;
    
    maxSpeed;
    mass;

    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        
        this.radius = 40;
        this.maxSpeed = 5.0;
        
        this.mass = 24.0;
    }

    repel(nodes) {
        let sum = createVector(0, 0);
        let count = 0;
        
        for (const other of nodes) {

            if (other === this) {
                continue;
            }

            const diff = p5.Vector.sub(this.position, other.position);
            const d = diff.mag();

            if (d > 0 && d < this.radius) {
                const force = diff.normalize().div(d / this.radius);
                sum.add(force);
                count++;
            }
        }
        
        if (count > 0) {
            sum.div(count);
            sum.setMag(this.maxSpeed);
            const steer = p5.Vector.sub(sum, this.velocity);
            this.applyForce(steer);
        }
    }

    update() {
        //this.velocity.limit(this.maxSpeed);
        this.velocity.mult(0.95); // damping
        this.position.add(this.velocity);

        this.bounceBound();
    }

    applyForce(force) {
        force.div(this.mass);
        this.velocity.add(force);
    }

    bounceBound() {
        const pos = this.position; // copy reference
        const vel = this.velocity; // copy reference
        const w = width;
        const h = height;
        const pad = 10.0;

        if (pos.x > w + pad) {
            pos.x = w + pad;
            vel.x *= -1;
        }
        if (pos.x < 0 - pad) {
            pos.x = 0 - pad;
            vel.x *= -1;
        }
        if (pos.y > h + pad) {
            pos.y = h + pad;
            vel.y *= -1;
        }
        if (pos.y < 0 - pad) {
            pos.y = 0 - pad;
            vel.y *= -1;
        }
    }
}