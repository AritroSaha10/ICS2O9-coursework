/*
   Description: recreates Exercise3.gif
   Author: Aritro Saha
   Date of last edit: Feb11/22
*/

let t1 = 0.0; // the progress of the bottom to top circ line where 0 represent the starting point (bottom) and 1 represents the ending point (top)
let t2 = -0.1; // the progress of the top left to middle right circ line where 0 represent the starting point (top left) and 1 represents the ending point (middle right)

let colors = ["red", "green", "blue", "black", "gray", "purple", "gold", "yellow", "cyan"]; // An array with all of the colors that the text should loop through
let colorIdx = 0; // The index for the color array to loop through it

let ellipseLineTopMiddleVec; // Vector representing the top middle of the canvas
let ellipseLineBottomMiddleVec; // Vector representing the bottom middle of the canvas
let ellipseLineTopLeftVec; // Vector representing top left of canvas
let ellipseLineMiddleRightVec; // Vector representing middle right of canvas, where the slow ellipse line ends

let comicSans; // Contains the comic sans font

function preload() {
  comicSans = loadFont('assets/comic-sans.ttf');
}

function setup() {
  // Create the canvas
  createCanvas(500, 800);

  // Create the vectors representing the first circle line
  ellipseLineBottomMiddleVec = createVector(width / 2, height);
  ellipseLineTopMiddleVec = createVector(width / 2 + 50, 0);

  // Create the vectors representing the second circle line
  ellipseLineTopLeftVec = createVector(0, 0);
  ellipseLineMiddleRightVec = createVector(width, height * 3/4);

  // Change the title font to Comic Sans
  textFont(comicSans);
}

function draw() {
  // Get the point at which we should be drawing the circles using the t1 and t2 variables
  let bottomToTopNewPoint = p5.Vector.lerp( ellipseLineBottomMiddleVec, ellipseLineTopMiddleVec, t1);
  let topLeftToMiddleRightNewPoint = p5.Vector.lerp(ellipseLineTopLeftVec, ellipseLineMiddleRightVec, t2);

  // Setup styles for the circles
  strokeWeight(1);
  stroke("black");
  fill("white");
  
  // Draw the circles for the first line
  ellipse(bottomToTopNewPoint.x, bottomToTopNewPoint.y, (1 - t1) * 100 + 20, (1 - t1) * 100 + 20);

  // Draw the circles for the second line
  ellipse(topLeftToMiddleRightNewPoint.x, topLeftToMiddleRightNewPoint.y, t2 * 50 + 20, t2 * 50 + 20);

  // Add onto the time variables (different as they are diff speeds)
	t1 += 0.02;
  t2 += 0.003;

  // Style the rainbow title
  noStroke();
  fill(colors[colorIdx % colors.length]);
  textSize(32);

  // Draw the title
  text("cool program ooo", width / 2 - 100, 50);

  // Increment colorIdx for next loop
  colorIdx++;	

  // Log a few of the variables
  console.log("Color Index (modulo color array length):", colorIdx % colors.length);
  console.log("t1 (time for first line):", t1);
  console.log("t2 (time for second line):", t2);
  console.log(); // Print new line to help separate
}
