import { Vector } from './app/vector';
import { OrbitEngine } from './app/orbit-engine';
import { StaticMassObject } from './app/static-mass-object';
import { DynamicMassObject } from './app/dynamic-mass-object';

const PIXEL_METER = 200000.0;

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

let canvasHeight: number;
let canvasWidth: number;
let canvasOffsetX: number;
let canvasOffsetY: number;

window.onload = () => {
  console.log('Retrieve Canvas element');
  canvas = <HTMLCanvasElement>document.getElementById('cnvs');
  canvasHeight = canvas.height;
  canvasWidth = canvas.width;
  canvasOffsetX = canvasWidth / 2;
  canvasOffsetY = canvasHeight / 2;
  context = canvas.getContext('2d');
  renderLoop();
}

let earth = new StaticMassObject();
earth.mass = 5.97e24;
earth.radius = 6378e3;
earth.position = new Vector(0, 0);

let iss = new DynamicMassObject('ISS');
iss.mass = 1000;
iss.radius = 100;
iss.position = new Vector(earth.radius + 450e3, 0);
iss.acceleration = new Vector(0, 7.66e3);
iss.color = 'yellow';

let motherShip = new DynamicMassObject('Mother Ship');
motherShip.mass = 14e22;
motherShip.radius = 2000e3;
motherShip.position = new Vector(-earth.radius - 20000e3, 0);
motherShip.acceleration = new Vector(0, -4.0e3);
motherShip.color = 'blue';

let droneShip1 = new DynamicMassObject('Drone Ship');
droneShip1.mass = 1000;
droneShip1.radius = 100;
droneShip1.position = new Vector(motherShip.position.x + motherShip.radius + 1000e3, 0);
droneShip1.acceleration = new Vector(0, motherShip.acceleration.y - 1.8e3);

let droneShip2 = new DynamicMassObject('Drone Ship');
droneShip2.mass = 1000;
droneShip2.radius = 100;
droneShip2.position = new Vector(motherShip.position.x - motherShip.radius - 1000e3, 0);
droneShip2.acceleration = new Vector(0, motherShip.acceleration.y + 1.8e3);

let droneShip3 = new DynamicMassObject('Drone Ship');
droneShip3.mass = 1000;
droneShip3.radius = 100;
droneShip3.position = new Vector(motherShip.position.x, motherShip.radius + 1000e3);
droneShip3.acceleration = new Vector(motherShip.acceleration.x + 1.8e3, motherShip.acceleration.y);

let droneShip4 = new DynamicMassObject('Drone Ship');
droneShip4.mass = 1000;
droneShip4.radius = 100;
droneShip4.position = new Vector(motherShip.position.x, - motherShip.radius - 1000e3);
droneShip4.acceleration = new Vector(motherShip.acceleration.x - 1.8e3, motherShip.acceleration.y);

let orbitEngine = new OrbitEngine(100);
orbitEngine.statics.push(earth);
orbitEngine.dynamics.push(iss);
orbitEngine.dynamics.push(motherShip);
orbitEngine.dynamics.push(droneShip1);
orbitEngine.dynamics.push(droneShip2);
orbitEngine.dynamics.push(droneShip3);
orbitEngine.dynamics.push(droneShip4);

let loopCounter = 0;

function renderLoop() {
  requestAnimationFrame(renderLoop);
  loopCounter += 1;
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  orbitEngine.next(loopCounter);
  orbitEngine.draw(context, canvasOffsetX, canvasOffsetY, PIXEL_METER);
}