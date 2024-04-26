// Matter.js module aliases
const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Composites, Events } = Matter;

// Create engine
const engine = Engine.create();
const world = engine.world;

// Setup the renderer
const render = Render.create({
    element: document.getElementById('simulation'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
    }
});

// Create mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});
World.add(world, mouseConstraint);

// Function to shuffle image URLs
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Load and shuffle images
const imageUrls = ['https://www.luzi-type.ch/image/notes/thumbnails/Valizas_Typeface001.jpg']; // Fill with your image URLs
let currentImageIndex = 0;
let shuffledImageUrls = shuffleArray([...imageUrls]);

// Create bodies with images
function createSmiley(x, y) {
    if (currentImageIndex >= shuffledImageUrls.length) {
        currentImageIndex = 0;
        shuffledImageUrls = shuffleArray([...imageUrls]);
    }
    let options = {
        render: {
            sprite: {
                texture: shuffledImageUrls[currentImageIndex++],
                xScale: 0.4,
                yScale: 0.4
            }
        }
    };
    return Bodies.circle(x, y, 50, options);
}

// Add bodies to the world
const smileys = Composites.stack(100, 100, 5, 5, 50, 50, createSmiley);
World.add(world, smileys);

// Run the engine and renderer
Engine.run(engine);
Render.run(render);
