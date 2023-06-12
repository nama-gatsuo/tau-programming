// Reference:
// * The-Nature-of-Code-Examples p5.js https://github.com/nature-of-code/noc-examples-p5.js
//   chp03_oscillation/NOC_3_10_spring
// * Generative Design http://www.bnn.co.jp/support/generativedesign_p5js/
//   M.6. Dynamic data sturctures

const nodes = [];
const edges = [];

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');

    add();
    add();
    
}

const add = () => {
    const c0 = new Node(width/2, height/2, 100);
    nodes.push(c0);

    for (let i = 0; i < 10; i++) {
        
        const c1 = new Node(random(width), random(height), random(40, 60));
        nodes.push(c1);
        
        const e1 = new Edge(c0, c1, random(100, 200));
        edges.push(e1);

        if (random() < 0.5) {
            for (let j = 0; j < 10; j++) {
                const c2 = new Node(random(width), random(height), random(20, 30));
                nodes.push(c2);
                const e2 = new Edge(c1, c2, random(30, 50));
                edges.push(e2);
            }
        }
    }
}

draw = () => {
    background(0);

    strokeWeight(2);

    for (const edge of edges) {
        edge.update();
    }

    for (const node of nodes) {
        if (node.selected) {
            node.position.x = mouseX;
            node.position.y = mouseY;
        }
        node.repel(nodes);
        node.update();
    }

    stroke(128);
    for (const edge of edges) {
        line(edge.from.position.x, edge.from.position.y, edge.to.position.x, edge.to.position.y);
    }

    stroke(0);
    fill(255);
    for (const node of nodes) {
        if (node.selected) {
            fill(255, 0, 0);
            circle(node.position.x, node.position.y, node.mass / 2 + 5);
        } else {
            fill(255);
            circle(node.position.x, node.position.y, node.mass / 2);
        }
    }
}

mousePressed = () => {

    const filtered = nodes.filter(node => {
        const d = dist(mouseX, mouseY, node.position.x, node.position.y);
        return d < node.mass / 4;
    });
    
    if (filtered.length > 0) {
        filtered[0].selected = true;
    }

}

mouseReleased = () => {
    for (const node of nodes) {
        node.selected = false;
    }
}