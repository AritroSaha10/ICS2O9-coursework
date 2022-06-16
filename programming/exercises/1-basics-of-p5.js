/*
   Description: A p5.js recreation of an image (Exercise1.png).
                  The revised version utilizes the unit circle in order to
                  procedurally generate the rays of the sun, as opposed
                  to hardcoding the values.
   Author: Aritro Saha
   Date of last edit: Feb9/22 
*/

// The amount of rays that the sun should have
const sunRays = 11

function setup() {
  createCanvas(800, 600);
}

function draw() {
  // Sky
  noStroke()
  fill('#77b0f5')
  rect(0, 0, 800, 300)

  // Sun
  fill('#fcf500')
  ellipse(200, 300, 100, 100)

  // Sun rays
  strokeWeight(3)
  stroke('#fcf500')

  // Use unit circle in order to procedurally generate rays
  for (let x = 0; x <= 180; x += 180 / (sunRays - 1)) {
    // x:
    // when unitCircX = 0, coordX = 200
    // when unitCircX = 1, coordX = 115
    // 200 - 115 = 85, therefore we can multiply this value by cos(x)
    // and subtract it from 200 in order to get the x coordinate of the ray
    let coordX = 200 - (85 * cos(radians(x)))

    // y:
    // when unitCircY = 0, coordY = 295
    // when unitCircY = 1, coordY = 215
    // 295 - 215 = 80, therefore we can multiply this value by sin(x),
    // and subtract it from 295 in order to get the y coordinate of the ray
    let coordY = 295 - (80 * sin(radians(x)))

    // Draw the ray
    line(200, 295, coordX, coordY)
  }

  // Line between sky and grass
  strokeWeight(2)
  stroke("black")
  line(0, 300, 800, 300)

  // Grass
  noStroke()
  fill('#1cea5c')
  rect(0, 300, 800, 300)

  // House rect
  strokeWeight(1)
  stroke("black")
  fill('#f0617b')
  rect(540, 250, 160, 100)

  // House roof
  strokeWeight(4)
  fill('black')
  triangle(530, 250, 620, 200, 710, 250)

  // House door
  strokeWeight(1)
  fill('white')
  rect(600, 270, 35, 70)

  // Doorknob
  noStroke()
  fill('black')
  ellipse(607, 305, 10, 10)
}
