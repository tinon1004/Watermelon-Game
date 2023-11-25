import { Bodies, Engine, Render, Runner, World } from "matter-js";

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

World.add(world, [leftWall, rightWall, ground]);




// create a runner (게임 업데이트)
Render.run(render);
Runner.run(engine);