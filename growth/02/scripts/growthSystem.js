class GrowthSystem {

    nodes;

    binnedNodes;
    binnedStepX;
    binnedStepY;

    maxEdgeLength;
    separationRadius;
    frameCount;

    constructor() { 
        this.nodes = [];

        this.maxEdgeLength = 11;
        this.separationRadius = 11;
        
        this.frameCount = 0;

        this.binnedNodes = [];
        this.binnedStepX = width / 10;
        this.binnedStepY = height / 10;
        
        for (let x = 0; x < 10; x++) {
            const row = [];
            for (let y = 0; y < 10; y++) {
                row.push([]);
            }
            this.binnedNodes.push(row);
        }
    }

    setup() {
        for (let i = 0; i < 10; i++) {
            const px = 20 * cos(i * TWO_PI / 10) + width / 2;
            const py = 20 * sin(i * TWO_PI / 10) + height / 2;
            this.nodes.push(new Node(px, py, this.separationRadius));
        }
    }

    update() {
        
        //if (this.nodes.length > this.maxNodesNum) return;

        // splits
        for (let i = 0; i < this.nodes.length; i++) {
            const from = this.nodes[i];
            const to = this.nodes[(i + 1) % this.nodes.length];
            const d = p5.Vector.dist(from.position, to.position);
            if (d > this.maxEdgeLength) {
                const center = p5.Vector.add(from.position, to.position).div(2);
                this.nodes.splice(i + 1, 0, new Node(center.x, center.y, this.separationRadius)); // insert
            }
        }
        
        // growth
        this.frameCount++;
        this.frameCount %= 3;
        this.growthMouse();

        // update binned nodes
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.binnedNodes[x][y] = [];
            }
        }
        for (const node of this.nodes) {
            const x = floor(node.position.x / this.binnedStepX);
            const y = floor(node.position.y / this.binnedStepY);
            this.binnedNodes[x][y].push(node);
        }

        // update nodes
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const vicinityNodes = this.getVicinityNodes(
                node.position,
                node.separationRadius
            );
            node.differentiate(this.nodes, vicinityNodes, i);
            node.update();
        }
    }

    draw() {

        stroke(255, 255);
        //fill(255);
        noFill();

        beginShape();
        for (const node of this.nodes) {
            vertex(node.position.x, node.position.y);
        }
        endShape(CLOSE);
    }

    getVicinityNodes(position, radius) {
        const x = floor(position.x / this.binnedStepX);
        const y = floor(position.y / this.binnedStepY);
        const vicinityNodes = [];

        const xDist = ceil(radius / this.binnedStepX);
        const yDist = ceil(radius / this.binnedStepY);

        const xStart = max(0, x - xDist);
        const xEnd = min(9, x + xDist);
        const yStart = max(0, y - yDist);
        const yEnd = min(9, y + yDist);

        for (let i = xStart; i <= xEnd; i++) {
            for (let j = yStart; j <= yEnd; j++) {
                vicinityNodes.push(...this.binnedNodes[i][j]);
            }
        }

        return vicinityNodes;
    }

    growthRandom() {
        
        if (this.frameCount === 0) {
            const index = floor(random(this.nodes.length));
            const center = p5.Vector.lerp(
                this.nodes[index].position,
                this.nodes[(index + 1) % this.nodes.length].position,
                0.5
            );

            this.nodes.splice(index + 1, 0, new Node(center.x, center.y, this.separationRadius)); // insert            
        }
    }

    growthMouse() {
        const mouse = createVector(mouseX, mouseY);
        if (this.frameCount === 0) {            
            let index = -1;
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const d = p5.Vector.dist(node.position, mouse);
                if (d < 10.0) {
                    index = i;
                    break;
                }
            }
            
            if (index >= 0) {
                const center = p5.Vector.lerp(
                    this.nodes[index].position,
                    this.nodes[(index + 1) % this.nodes.length].position,
                    0.5
                );
                this.nodes.splice(index + 1, 0, new Node(center.x, center.y, this.separationRadius)); // insert
            }
            
        }
    }
}