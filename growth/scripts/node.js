class Node {

    position;
    velocity;

    maxSpeed;
    maxForce;

    cohesionScalar;
    separationRadius;
    separationScalar;

    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        
        this.separationRadius = 14;
        this.maxSpeed = 2.0;
        this.maxForce = 1.0;

        this.cohesionScalar = 0.1;
        this.separationScalar = 0.11;
    }

    separate(nodes) {
        let sum = createVector(0, 0);
        let count = 0;
        
        for (const other of nodes) {
            const diff = p5.Vector.sub(this.position, other.position);
            const d = diff.mag();

            if (d > 0 && d < this.separationRadius) {
                const force = diff.normalize().div(d / this.radius);
                sum.add(force);
                count++;
            }
        }
        
        if (count > 0) {
            sum.div(count);
            sum.setMag(this.maxSpeed); // desiredVelocity
            const steer = p5.Vector.sub(sum, this.velocity);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    edgeCohesion(prev, next) {
        const center = p5.Vector.add(prev.position, next.position).div(2);

        const desiredVelocity = p5.Vector.sub(center, this.position);
        desiredVelocity.setMag(this.maxSpeed);
        const steer = p5.Vector.sub(desiredVelocity, this.velocity);
        return steer;
    }

    differentiate(nodes, index) {
        const prev = nodes[(nodes.length + index - 1) % nodes.length];
        const next = nodes[(index + 1) % nodes.length];

        const separation = this.separate(nodes).mult(this.separationScalar);
        const cohesion = this.edgeCohesion(prev, next).mult(this.cohesionScalar);
        const force = p5.Vector.add(separation, cohesion).limit(this.maxForce);
        
        this.velocity.add(force);
    }

    update() {
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
    }

}