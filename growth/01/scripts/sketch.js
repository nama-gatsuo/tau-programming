let growthSystem;

setup = () => {
    const canvas = createCanvas(600, 600);
    canvas.parent('#container');
    canvas.id('p5');

    growthSystem = new GrowthSystem();
    growthSystem.setup();
}

draw = () => {
    background(0);
    growthSystem.update();
    growthSystem.draw();
}