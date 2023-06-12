class Edge {

    from;
    to;

    restLength;
    stiffness;

    minLength;
    maxLength;

    constructor(from, to, length = 40, stiffness = 0.5) { 
        this.from = from;
        this.to = to;
        this.restLength = length;
        this.stiffness = stiffness;

        this.minLength = length * 0.1;
        this.maxLength = length * 2.0;
    }

    update() {
        const diff = p5.Vector.sub(this.to.position, this.from.position);
        const d = diff.mag();
        const stretch = d - this.restLength;
        const force = diff.normalize().mult(stretch * this.stiffness);

        this.to.applyForce(p5.Vector.mult(force, -1.0));
        this.from.applyForce(force);

        //this.constrainLength();   
    }

    constrainLength() {
        const dist = p5.Vector.dist(this.to.position, this.from.position);
        const dir = p5.Vector.sub(this.to.position, this.from.position).normalize();
        const center = p5.Vector.lerp(this.to.position, this.from.position, 0.5);
        
        if (dist < this.minLength) {
            dir.setMag(this.minLength / 2);
            this.to.position = p5.Vector.add(center, dir);
            this.from.position = p5.Vector.sub(center, dir);
        } else if (dist > this.maxLength) {
            dir.setMag(this.maxLength / 2);
            this.to.position = p5.Vector.add(center, dir);
            this.from.position = p5.Vector.sub(center, dir);
        }
    }

}