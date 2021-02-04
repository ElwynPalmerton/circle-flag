
var VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
  VerletParticle2D = toxi.physics2d.VerletParticle2D,
  VerletSpring2D = toxi.physics2d.VerletSpring2D,
  VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D,
  Vec2D = toxi.geom.Vec2D,
  Rect = toxi.geom.Rect;

let GravityBehavior = toxi.physics2d.behaviors.ConstantForceBehavior;



const particles = [];
const springs = [];
const springRow = [];

let physics;

function setup() {

  physics = new VerletPhysics2D;
  const gravity = new Vec2D(0, 1);
  const gb = new GravityBehavior(gravity);
  physics.addBehavior(gb);

  fill(50);
  createCanvas(600, 600);
  background(40);

  const x = 20;
  const y = 20;


  for (let i = 0; i < 20; i++) {
    const particleRow = []
    let yPos = y * i;

    for (let j = 0; j < 20; j++) {
      let xPos = x * j + 100;
      let p = new Particle(xPos, yPos);
      particleRow.push(p);
      physics.addParticle(p);
    }

    particles.push(particleRow);
  }
  // }

  let p1 = particles[0][0];
  let p2 = particles[0][particles[0].length - 1];
  p1.lock();
  p2.lock();


  for (let i = 0; i < particles.length; i++) {
    console.log(i);
    for (let j = 0; j < particles[0].length - 1; j++) {
      let a = particles[i][j];
      let b = particles[i][j + 1];
      let s = new Spring(a, b, 20, 0.5);
      springs.push(s);
      physics.addSpring(s);
    }
  }


  for (let i = 0; i < particles.length - 1; i++) {

    for (let j = 0; j < particles[0].length; j++) {
      let a = particles[i][j];
      let c = particles[i + 1][j];
      let s2 = new Spring(a, c, 20, 0.5)
      springs.push(s2);
      physics.addSpring(s2);

    }

  }
}


let run = true;
function keyPressed(e) {
  if (keyCode === 32) {
    run = !run;
    run ? loop() : noLoop();
  }
}


function draw() {
  background(40);
  physics.update();

  particles.forEach(row => {
    row.forEach(p => {
      p.display();
    })
  })

  springs.forEach(s => {
    s.display();
  })

}