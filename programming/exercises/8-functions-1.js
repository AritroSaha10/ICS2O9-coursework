/*
   Description: draws a cycling gradient
   Author: Aritro Saha
   Date of last edit: Mar24/22 
*/

let colorShift = 0
let shiftDirection = 1

function drawGradient(startColor, endColor) {
  noStroke()

  // Draw lines with lerped color
  for (let t = 0; t < 1; t += 0.003) {
    const lerpedColor = lerpColor(startColor, endColor, t)
    fill(lerpedColor)
    rect(0, t * height, width, 2)
  }

  // Make shift go down if its too high or go up if its too low
  if (colorShift >= 120) {
    shiftDirection = -1
    console.log("shift down")
  } else if (colorShift <= 0) {
    shiftDirection = 1
    console.log("shift up")
  }

  colorShift += shiftDirection
}

function setup() {
	createCanvas(600, 600)
}

function draw() {
  // Get the starting color
  const startColor = color(
    (66 + colorShift), 
    (135 + colorShift), 
    (245 - colorShift)
  )

  // Get the ending color
  const endColor = color(
    (245 - colorShift), 
    (66 + colorShift), 
    (66 + colorShift)
  )

  // Draw the gradient
	drawGradient(startColor, endColor)
}
