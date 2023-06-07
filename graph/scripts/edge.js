class Edge {

    from;
    to;

    length;
    stiffness;

    constructor(from, to, length = 40, stiffness = 0.5) { 
        this.from = from;
        this.to = to;
        this.length = length;
        this.stiffness = stiffness;
    }

    update() {
        const diff = p5.Vector.sub(this.to.position, this.from.position);
        const d = diff.mag();
        const stretch = d - this.length;
        const force = diff.normalize().mult(stretch * this.stiffness);

        this.to.applyForce(p5.Vector.mult(force, -1));
        this.from.applyForce(force);
    }

}