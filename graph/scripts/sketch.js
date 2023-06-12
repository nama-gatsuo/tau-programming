// Reference:
// * The-Nature-of-Code-Examples p5.js https://github.com/nature-of-code/noc-examples-p5.js
//   chp03_oscillation/NOC_3_10_spring
// * Generative Design http://www.bnn.co.jp/support/generativedesign_p5js/
//   M.6. Dynamic data sturctures

const nodes = [];
const edges = [];
let selectedNode = null;

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');

    strokeWeight(2);

    for (let i = 0; i < 100; i++) {
        nodes.push(new Node(random(width), random(height)));
    }

    for (let i = 0; i < nodes.length - 1; i++) {
        const from = nodes[i];        
        const toIndex = floor(random(i + 1, nodes.length));
        const to = nodes[toIndex];
        edges.push(new Edge(from, to));
    }
}

draw = () => {
    background(0);

    if (selectedNode) {
        selectedNode.position.x = mouseX;
        selectedNode.position.y = mouseY;
    }

    for (const edge of edges) {
        edge.update();
    }

    for (const node of nodes) {
        node.repel(nodes);
        node.update();
    }

    stroke(128);
    for (const edge of edges) {
        edge.update();
        line(edge.from.position.x, edge.from.position.y, edge.to.position.x, edge.to.position.y)
    }

    stroke(0);
    fill(255);
    for (const node of nodes) {
        circle(node.position.x, node.position.y, 10);
    }

}

mousePressed = () => {
    const rad = 20;

    const filtered = nodes.filter(node => {
        const d = dist(mouseX, mouseY, node.position.x, node.position.y);
        return d < rad;
    });
    
    if (filtered.length > 0) {
        selectedNode = filtered[0];
    }

}

mouseReleased = () => {
    selectedNode = null;
}