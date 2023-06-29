const w = [0.33, 0.05];

// params of affin
const rules = [
    { a: 0.59, b: 0.59, c: -0.17, d: 0.31, e: -1., f: -0.81, w: 0.33 },
    { a: 0.84, b: 0.8, c: -0.63, d: 0.67, e: -0.45, f: 0.54, w: 0.05 },
    { a: 0.51, b: -0.52, c: -0.43, d: 0.93, e: 0.2, f: 0.99, w: 0.62 }
];

let p;

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');
    blendMode(ADD);
    p = createVector(0, 0);
    //noLoop();
}

draw = () => {
    background(0);
    stroke(255, 20);
    pattern();
}

const pattern = () => {
    drawShape(width * 0.2);
}



const drawShape = (size) => {

    push();
    translate(width / 2, height / 2);
    scale(size);
    strokeWeight(1 / size);

    for (let i = 0; i < 200; i++) {
        const rule = getRule();
        p = affin(p, rule);
        p = variation(p);
        point(p.x, p.y);
    }
    pop();
}

const affin = (p, rule) => {
    const x = rule.a * p.x + rule.b * p.y + rule.c;
    const y = rule.d * p.x + rule.e * p.y + rule.f;
    return createVector(x, y);
}

const variation = (p) => {
    let np = p.copy();
    np = p5.Vector.lerp(np, sphericalWarp(np), 0.1);
    //np = p5.Vector.lerp(np, fisheyeWarp(np), 0.1);
    //np = p5.Vector.lerp(np, tangentWarp(np), 0.1);
    //np = p5.Vector.lerp(np, bubbleWarp(np), 0.1);
    return np;
}

// Spherical
const sphericalWarp = (p) => {
    const np = p.copy();
    const r2 = np.x * np.x + np.y * np.y;
    np.div(r2);
    return np;
}

// Fisheye
const fisheyeWarp = (p) => {
    const np = p.copy();
    const r2 = np.x * np.x + np.y * np.y;
    const r = pow(r2, 0.5);
    np.mult(2.0 / (r + 1.));
    return np;
}

// Tangent
const tangentWarp = (p) => {
    const np = createVector(sin(p.x) / cos(p.y), tan(p.y));
    return np;
}

// Bubble
const bubbleWarp = (p) => {
    const r2 = p.x * p.x + p.y * p.y;
    const np = p.copy();
    np.mult(4.0 / r2 + 4.0);
    return np;
}

const randamize = () => {

    for (const rule of rules) {
        rule.a = random(-1, 1);
        rule.b = random(-1, 1);
        rule.c = random(-1, 1);
        rule.d = random(-1, 1);
        rule.e = random(-1, 1);
        rule.f = random(-1, 1);
    }

    const r0 = random();
    const r1 = random();
    rule[0].w = min(r0, r1);
    rule[1].w = 1.0 - max(r0, r1);
    rule[2].w = abs(r0 - r1);
}

const getRule = () => {
    let rand = random();
    for (const rule of rules) {
        if (rand < rule.w) {
            return rule;
        }
        rand -= rule.w;
    }
}