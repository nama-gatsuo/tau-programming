let x = 0.1, y = 0.1;

//const a =  0.45, b = 1.9;
//const a =  1.0, b = 0.85;
//const a =  1.0, b = 0.9;
const a = 1.25, b = 0.75;

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
    const s = 80;

    translate(width / 2, height * 0.75);
    scale(s);
    strokeWeight(1 / s);

    for (let i = 0; i < 100; i++) {

        _x = (1 + a * b) * x - b * x * y;
        _y = (1 - b) * y + b * x * x;

        point(_x, - _y);

        x = _x;
        y = _y;
    }
}