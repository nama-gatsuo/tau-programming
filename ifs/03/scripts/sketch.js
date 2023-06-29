// The original is called "Discrete Universe"
// https://ozachou.tumblr.com/
// https://how-to-build-du-j.tumblr.com/
// @ozachou_g

const [A1, A2, A3] = [-2.1, 1.4, 1.1];
const [f1, f2, f3] = [0.4, 1.1, 1.0];

const [A4, A5, A6] = [1.1, 1.2, 0.9];
const [f4, f5, f6] = [1.1, 1.0, 0.7];
const [p, q] = [1, 1];

const dt = 0.1;
const s = 80;
let [x, y, t] = [0, 0, 0];

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');
    background(255);
}

draw = () => {
    translate(width / 2, height / 2);

    stroke(0, 100);
    scale(s);
    strokeWeight(0.5 / s);

    for (let i = 0; i < 100; i++) {
        const px = x, py = y;
        x = A1 * (sin(f1 * px) ** p) + A2 * (cos(f2 * py) ** q) + A3 * (sin(f3 * t) ** p);
        y = A4 * (cos(f4 * px) ** q) + A5 * (sin(f5 * py) ** p) + A6 * (cos(f6 * t) ** q);

        point(x, y);

        t += dt;
    }

}