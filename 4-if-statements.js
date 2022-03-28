/*
   Description: recreates Exercise4.gif
   Author: Aritro Saha
   Date of last edit: Feb16/22
*/

let bottomStartPoint, bottomEndPoint, bottomT = 0;
let topCircleX = 0, topCircleY = 0, topCircleDiameter = 30; // Much easier to use x and y values instead of lerping due to nature of pattern

let bottomLinesShift = 0, bottomFinishedCount = 0;

function setup() {
  createCanvas(500, 800);
  background(220);

  // Initialize vectors
  bottomStartPoint = createVector(bottomLinesShift, height);
  bottomEndPoint = createVector(bottomLinesShift + 40, height / 2);
}

function draw() {
  // Draw green line in middle
  strokeWeight(5);
  stroke("lime");
  line(0, height / 2, width, height / 2);

  // Start drawing circles from bottom

  // Get lerp'd position
  let currBottomLinePos = p5.Vector.lerp(bottomStartPoint, bottomEndPoint, bottomT);

  // Draw the circle
  fill("white");
  strokeWeight(1);
  stroke("black");
  ellipse(currBottomLinePos.x, currBottomLinePos.y, 100 - bottomT * 60, 100 - bottomT * 60);

  // If the lines have exceeded the width, set the shift back
  if (currBottomLinePos.x > width) {
    bottomFinishedCount++;
    bottomLinesShift = bottomFinishedCount * -5;
  }

  // Skip the circles 
  if (currBottomLinePos.x < 0) {
    bottomT += 0.2;
  } else {
    bottomT += 0.03;
  }

  // Reset cycle while also incrementing bottom shift
  if (bottomT > 1) {
    bottomT = 0;
    bottomLinesShift += 40;

    bottomStartPoint = createVector(bottomLinesShift, height);
    bottomEndPoint = createVector(bottomLinesShift + 40, height / 2);
  }


  // Draw top circles

  // Increment position
  topCircleX += 4;
  topCircleY += 3;

  // Increase diameter
  topCircleDiameter += 0.5;

  // Set styles
  stroke("white");
  strokeWeight(1);
  fill("black");

  // Draw the circle
  ellipse(topCircleX, topCircleY, topCircleDiameter, topCircleDiameter);

  if (topCircleY > height/2) {
    // Reset y position if it touches green line
    topCircleY = 0;
  } else if (topCircleX > width) {
    // Reset x and diameter if it goes off screen
    topCircleX = 0;
    topCircleDiameter = 30;
  }
}
