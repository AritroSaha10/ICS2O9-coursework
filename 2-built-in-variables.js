/*
   Description: A p5.js program that randomly generates different color circles on the screen, as well as random rectangles on a key press and screen clear on a mouse press
   Author: Aritro Saha
   Date of last edit: Feb10/22
*/

function setup() {
  createCanvas(800, 800)
  background(120)
}

function draw() {
  // Setup styles for ellipse, with random color
  stroke("black")
  strokeWeight(1)
  fill(random(80, 255), random(80, 255), random(80, 255)) // 80 - 255 to avoid very dark colors

  // Draw ellipse with random dimensions
  ellipse(
    random(20, width - 20), 
    random(20, height - 20), 
    20, 
    20
  )
}

function keyPressed() {
  // Setup styles for rectangle, with random color
  stroke("black")
  strokeWeight(1)
  fill(random(80, 255), random(80, 255), random(80, 255)) // 80 - 255 to avoid very dark colors

  // Draw rectangle with random dimensions
  rect(
    0,
    0,
    random(20, width - 20),
    random(20, height - 20)
  )
}

function mousePressed() {
  // Reset canvas by drawing over all of it with gray
  background(120)
}
