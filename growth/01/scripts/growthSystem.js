class GrowthSystem {

    nodes;
    maxNodesNum;
    maxEdgeLength;

    constructor() { 
        this.maxNodesNum = 800;
        this.nodes = [];
        this.maxEdgeLength = 10;
    }

    setup() {
        for (let i = 0; i < 10; i++) {
            const px = 20 * cos(i * TWO_PI / 10) + width / 2;
            const py = 20 * sin(i * TWO_PI / 10) + height / 2;
            this.nodes.push(new Node(px, py));
        }
    }

    update() {
        
        if (this.nodes.length > this.maxNodesNum) return;

        for (let i = 0; i < this.nodes.length; i++) {
            const from = this.nodes[i];
            const to = this.nodes[(i + 1) % this.nodes.length];
            const d = p5.Vector.dist(from.position, to.position);
            if (d > this.maxEdgeLength) {
                const center = p5.Vector.add(from.position, to.position).div(2);
                this.nodes.splice(i + 1, 0, new Node(center.x, center.y)); // insert
            }
        }
        
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            node.differentiate(this.nodes, i);
            node.update();
        }
    }

    draw() {

        stroke(255, 0, 0);
        fill(255);

        beginShape();
        for (const node of this.nodes) {
            vertex(node.position.x, node.position.y);
        }
        endShape(CLOSE);
    }

}