import { Bodies, Body, Engine, Render, Runner, World } from "matter-js";
import { FRUITS } from "./fruits";

// create an engine
const engine = Engine.create();
// create a renderer (게임 그리기)
const render = Render.create({
  element: document.body,
  engine,
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 620,
    height: 850,
  }
});

const world = engine.world;

// create walls
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
    isStatic: true,
    render: {
        fillStyle: "#E5D352",
    },
});

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
    isStatic: true,
    render: {
        fillStyle: "#E5D352",
    },
});

const ground = Bodies.rectangle(310, 820, 620, 60, {
    isStatic: true,
    render: {
        fillStyle: "#E5D352",
    },
});

const topLine = Bodies.rectangle(310, 150, 620, 5, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "#E5D352",
    },
   
});

World.add(world, [leftWall, rightWall, ground, topLine]);




// create a runner (게임 업데이트)
Render.run(render);
Runner.run(engine);


let currentFruit = null;
let currentBody = null;

// create fruits
function addFruits() {
    const index = Math.floor(Math.random() * 5);
    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius, {
        index : index,
        isSleeping: true,
        render: {
            sprite: {
                texture: `${fruit.name}.png`,
                xScale: 0.5,
                yScale: 0.5,
            },
        },
        restitution: 0.2,
    });

    currentFruit = fruit;
    currentBody = body;

    World.add(world, body);
}

window.onkeydown = (event) => {
    switch (event.code) {
        case "KeyA":
            Body.setPosition(currentBody, { 
                x: currentBody.position.x - 10, 
                y: currentBody.position.y
            });
            break;

        case "KeyD":
            Body.setPosition(currentBody, { 
                x: currentBody.position.x + 10, 
                y: currentBody.position.y
            });
            break;

        case "KeyS":
            break;
        

    }
}


addFruits();
 
