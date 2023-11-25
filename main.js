import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
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
    name : "topLine",
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
let disableAction = false;
let interval = null;

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

    if (disableAction) {
        return;
    }

    switch (event.code) {
        

        case "KeyA":
            if (interval) {
                return;
            }
            interval = setInterval(() => {
                if (currentBody.position.x - currentFruit.radius > 40) 
                    Body.setPosition(currentBody, { 
                        x: currentBody.position.x - 1, 
                        y: currentBody.position.y
                });
            },5);
            break;
        

        case "KeyD":
            if (interval) {
                return;
            }
            interval = setInterval(() => {
                if (currentBody.position.x + currentFruit.radius < 580) 
                    Body.setPosition(currentBody, { 
                        x: currentBody.position.x + 1, 
                        y: currentBody.position.y
                });
            },5);
            break;

        case "KeyS":
            currentBody.isSleeping = false;
            disableAction = true;

            setTimeout(() => { 
                addFruits();
                disableAction = false;
            }, 1000);
            break;
        

    }
}


window.onkeyup = (event) => {
    switch (event.code) {
        case "KeyA":
        case "KeyD":
            clearInterval(interval);
            interval = null;
    }
}

//detect collision
Events.on(engine, "collisionStart", (event) => {
    event.pairs.forEach((collision) => {
        if (collision.bodyA.index === collision.bodyB.index) {
            
            const index = collision.bodyA.index;
            if (index === FRUITS.length - 1) {
                return;
            }

            World.remove(world, [collision.bodyA, collision.bodyB]);
        

            const newFruit = FRUITS[index+1];

            const newBody = Bodies.circle(
                collision.collision.supports[0].x,
                collision.collision.supports[0].y,
                newFruit.radius,
                {
                    
                    render: {
                        sprite: {
                            texture: `${newFruit.name}.png`,
                            xScale: 0.5,
                            yScale: 0.5,
                        }
                    },
                    index: index + 1,
                
                }
            
            );
            World.add(world, newBody);
        } 

        if (
            !disableAction &&
            (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")) {
            alert("Game Over");
        }


    

    });
});


addFruits();
 
