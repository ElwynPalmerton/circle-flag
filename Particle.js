class Particle extends VerletParticle2D {
  constructor(x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.testX = 0;
    this.testY = 0;
    this.offsetX;
    this.offsetY;
    this.variation;
    this.fill = 200;

    this.baseSize = 8;
    this.size = 8;
  }

  display() {
    noStroke();
    fill(this.fill);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    let increment = 0.01;
    this.angle += increment;
    // //
    let currentAngle = this.angle % TWO_PI;
    currentAngle = currentAngle - PI;
    // let sizeShift = (this.angle % PI) - PI;
    // let sizeAdd = currentAngle * 0.1;
    let sizeAdd = Math.sin(currentAngle) * 10;
    this.size = this.baseSize + sizeAdd;
  }

  displayOffset() {
    noStroke();
    fill(this.fill);
    ellipse(this.testX, this.testY, this.size, this.size);
  }

  setAngleStart(i, j, columns) {
    let baseAngle = TWO_PI * (i / columns);
    let addToAngle = TWO_PI * (j / columns);
    this.angle = baseAngle + addToAngle;
    // this.angle = TWO_PI * (i / columns);
  }

  setPosition(i, columns) {
    // this.fill = 100;
    this.offsetX = Math.cos(this.angle) * 10;
    this.offsetY = Math.sin(this.angle) * 10;

    // console.log("xOffset: ", this.offsetX);
    // console.log("yOffset: ", this.offsetY);
    this.testX = this.x + this.offsetX;
    this.testY = this.y + this.offsetY;

    console.log(this.testX);
    console.log(this.testY);

    // this.x = this.x + this.offsetX;
    // this.y = this.y + this.offsetY;

    //Set all of the x rotations in the first row by a certain increment.
    //Add the same increment to everything in each subsequent row.
  }
}
