let growthSystem;

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');

    growthSystem = new GrowthSystem();
    growthSystem.setup();
    background(0);
}

draw = () => {
    background(0, 10);
    if (mouseIsPressed) {
        growthSystem.update();
    }
    growthSystem.draw();
}