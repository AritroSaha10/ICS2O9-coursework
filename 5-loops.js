/*
   Description: recreates Exercise5.gif
   Author: Aritro Saha
   Date of last edit: Mar8/22
*/


function setup() {
  createCanvas(800, 800)
  background(200)
}

function draw() {
  // Draw left squares
  for (let originY = 50; originY <= 650; originY += 100) {
    // Lerp color over loop
    stroke("black")
    fill(color(map(originY, 50, 650, 0, 255), 0, 0))
    rect(50, originY, 100, 100)

    // Draw lines
    stroke(map(originY, 50, 650, 0, 255))
    line(150, originY, 400, 800)
    stroke(map(originY + 50, 50, 650, 0, 255))
    line(150, originY + 50, 400, 800)
  }

  // Draw right squares
  for (let originY = 50; originY <= 650; originY += 100) {
    // Lerp color over loop
    stroke("black")
    fill(color(map(originY, 50, 650, 0, 255), 0, 0))
    rect(650, originY, 100, 100)

    // Draw lines
    stroke(map(originY, 50, 650, 0, 255))
    line(650, originY, 400, 800)
    stroke(map(originY + 50, 50, 650, 0, 255))
    line(650, originY + 50, 400, 800)
  }

  // Draw middle circles
  for (let originX = 300; originX <= 500; originX += 50) {
    stroke("black")
    fill(color(0, map(originX, 50, 650, 100, 166), 0))
    ellipse(originX, 225, 50, 50)
  }

  // Draw triangles using while loop
  let triangleIdx = 0;
  while (triangleIdx < 4) {
    stroke("black")
    fill(color(0, 0, map(triangleIdx, 0, 3, 66, 181)))
    triangle(
      200 + triangleIdx * 115,
      153,
      225 + triangleIdx * 115,
      51,
      252 + triangleIdx * 115,
      153
    )
    
    triangleIdx++
  }
}
