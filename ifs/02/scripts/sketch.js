let x = 0.1, y = 0.1;

//const a =  0.45, b = 1.9;
//const a =  1.0, b = 0.85;
//const a = -1.0, b = 0.05, c = 2.275,  d = -0.5;
//const a =  1.0, b = 0.0,  c = - 2.25, d = 0.2;
//const a =  1.0, b = 0.0,  c = - 1.9,  d = 0.4;
//const a = -1.0, b = 0.1,  c = 1.52,   d = -0.8;
//const a = -1.0, b = 0.1,  c = 1.6,    d = -0.8;
//const a =  2.,  b = -0.2, c = - 1.75, d = 1.;
const a = -2.0, b = 0., c = 2.6, d = -0.5;

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');

    blendMode(ADD);
    background(0);
    stroke(124, 155, 255, 50);
}

draw = () => {
    let _x, _y;
    let A;
    const s = 200;

    translate(width / 2, height / 2);
    scale(s);
    strokeWeight(1 / s);

    for (let i = 0; i < 100; i++) {
        // Chossat - Golubitsuky
        A = a * (x * x + y * y) + b * x * (x * x - 3 * y * y) + c;
        _x = A * x + d * (x * x - y * y);
        _y = A * y - 2 * d * x * y;

        point(_x, - _y);

        x = _x;
        y = _y;
    }
}