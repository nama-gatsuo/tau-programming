// https://zenn.dev/baroqueengine/books/a19140f2d9fc1a/viewer/a6fa0b
// code is written by miku @baroqueengine

let rules, x, y;

const rule0 = [
    {
        a: 0.5,
        b: 0.0,
        c: 0.0,
        d: 0.5,
        tx: 0.0,
        ty: 0.5,
        weight: 0.33333,
    },
    {
        a: 0.5,
        b: 0.0,
        c: 0.0,
        d: 0.5,
        tx: 0.5,
        ty: 0.0,
        weight: 0.33333,
    },
    {
        a: 0.5,
        b: 0.0,
        c: 0.0,
        d: 0.5,
        tx: 0.0,
        ty: 0.0,
        weight: 0.33333,
    },
];

const rule1 = [
    {
        a: 0.05,
        b: 0,
        c: 0,
        d: 0.6,
        tx: 0,
        ty: 0,
        weight: 0.17,
    },
    {
        a: 0.05,
        b: 0,
        c: 0,
        d: -0.5,
        tx: 0,
        ty: 1,
        weight: 0.17,
    },
    {
        a: 0.46,
        b: -0.321,
        c: 0.386,
        d: 0.383,
        tx: 0,
        ty: 0.6,
        weight: 0.17,
    },
    {
        a: 0.47,
        b: -0.154,
        c: 0.171,
        d: 0.423,
        tx: 0,
        ty: 1.1,
        weight: 0.17,
    },
    {
        a: 0.433,
        b: 0.275,
        c: -0.25,
        d: 0.476,
        tx: 0,
        ty: 1,
        weight: 0.16,
    },
    {
        a: 0.421,
        b: 0.257,
        c: -0.353,
        d: 0.306,
        tx: 0,
        ty: 0.7,
        weight: 0.16,
    },
];

const rule2 = [
    {
        a: 0.85,
        b: 0.04,
        c: -0.04,
        d: 0.85,
        tx: 0,
        ty: 1.6,
        weight: 0.65,
    },
    {
        a: -0.15,
        b: 0.28,
        c: 0.26,
        d: 0.24,
        tx: 0,
        ty: 0.44,
        weight: 0.07,
    },
    {
        a: 0.2,
        b: -0.26,
        c: 0.23,
        d: 0.22,
        tx: 0,
        ty: 1.6,
        weight: 0.07,
    },
    {
        a: 0,
        b: 0,
        c: 0,
        d: 0.16,
        tx: 0,
        ty: 0,
        weight: 0.21,
    },
];

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');

    rules = rule0;

    stroke(240);
    noFill();
    x = random();
    y = random();
}

draw = () => {
    const s = 300;
    translate(width / 2, height);
    scale(s);
    strokeWeight(1/s);

    for (let i = 0; i < 100; i++) {
        const rule = getRule();
        const tx = x;
        const ty = y;
        x = tx * rule.a + ty * rule.b + rule.tx;
        y = tx * rule.c + ty * rule.d + rule.ty;

        point(x, -y);
    }
}

const getRule = () => {
    let rand = random();
    for (const rule of rules) {
        if (rand < rule.weight) {
            return rule;
        }
        rand -= rule.weight;
    }
}