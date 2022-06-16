/*
   Description: A beach with interactive components
   Author: Aritro Saha
   Date of last edit: Feb23/22 
*/

// Tracks whether its day or night 
let isDay = true

// Tracks transition state
let isTransitioningFromDayToNight = false
let isTransitioningFromNightToDay = false

// Transition animation time value
let transitionT = 0

// Track cloud show state
let showClouds = true

// Cloud animation time value
let cloudCounter = 0

// Time counter for auto changing to day / night
let timeCounter = 0

// Frame rate (can't use frameRate function since it wildly varries)
let startFrameRate = 60

// Mouse click counter for "Red Sun" / pseudo-When Day Breaks
let clickCount = 0

function setup() {
  // Setup canvas and background
  createCanvas(800, 530)
  background(240)
}

function draw() {
  // Reset background and set noStroke as base style
  noStroke()
  background(200)

  // Zero if not activated, One if activated
  const redSunActivation = Math.floor(clickCount / 7) % 2
  
  // Get sun colour based on click count
  const sunColour = ["#F4E99B", "#FD5E53"][redSunActivation]
  const skyTopColour = ["#42A4EA", "#DFE1A4"][redSunActivation]
  
  // Draw day
  if (isDay) {
    // Draw a gradient for the sky
    push()
    for (let t = 0; t < 1; t += 0.01) {
      const lerpedColor = lerpColor(color(skyTopColour), color(sunColour), t)
      fill(lerpedColor)
      rect(0, t * 170, width, 2)
    }
    pop()

    if (!isTransitioningFromDayToNight) {
      // Show the sun
      push()
      fill(sunColour)
      ellipse(250, 170, 190, 190)
      pop()
    }
  }

  // Draw transition
  if (isTransitioningFromDayToNight) {
    // Make sure clouds can't be seen during night
    showClouds = false

    // Sun
    push()
    fill(sunColour)
    ellipse(250, 170 + 93 * transitionT, 190, 190)
    pop()

    // Fade in gradient of sky
    push()
    const skyOpacityLerp = lerp(0, 255, transitionT) // Lerp the sky opacity
    for (let t = 0; t < 1; t += 0.01) {
      const lerpedColor = lerpColor(color(21, 26, 79, skyOpacityLerp), color(76, 64, 142, skyOpacityLerp), t)
      fill(lerpedColor)
      rect(0, t * 170, width, 2)
    }
    pop()

    // Moon
    push()
    fill("#F4F6F0")
    ellipse(700, lerp(250, 85, transitionT), 115, 115)
    pop()

    // Increment transition t var
    transitionT += 0.003

    // Transition is done, move into night state
    if (transitionT > 1) {
      isTransitioningFromDayToNight = false
      isDay = false
      timeCounter = 0
      transitionT = 0
    }
  } else if (isTransitioningFromNightToDay) {
    // Draw a gradient for the day sky (must be done since we are fading out the night sky gradient)
    push()
    for (let t = 0; t < 1; t += 0.01) {
      const lerpedColor = lerpColor(color(skyTopColour), color(sunColour), t)
      fill(lerpedColor)
      rect(0, t * 170, width, 2)
    }
    pop()

    // Sun
    push()
    fill(sunColour)
    ellipse(250, lerp(263, 170, transitionT), 190, 190)
    pop()

    // Fade out gradient of sky
    push()
    const skyOpacityLerp = lerp(255, 0, transitionT) // Lerp the sky opacity
    for (let t = 0; t < 1; t += 0.01) {
      const lerpedColor = lerpColor(color(21, 26, 79, skyOpacityLerp), color(76, 64, 142, skyOpacityLerp), t)
      fill(lerpedColor)
      rect(0, t * 170, width, 2)
    }
    pop()

    // Moon
    push()
    fill("#F4F6F0")
    ellipse(700, lerp(85, 250, transitionT), 115, 115)
    pop()

    // Increment transition t var
    transitionT += 0.003

    // Transition is done, move into night state
    if (transitionT > 1) {
      isTransitioningFromNightToDay = false
      isDay = true
      timeCounter = 0
      showClouds = true
      transitionT = 0
    }
  }

  // Draw vertical gradient for water
  push()
  for (let t = 0; t < 1; t += 0.01) {
    const lerpedColor = lerpColor(color("#09C3DB"), color("#006994"), t)
    fill(lerpedColor)
    rect(0, lerp(170, 436, t), width, 4)
  }
  pop()

  // Sand
  push()
  fill("#F8CA83")
  quad(0, 530, width, 530, width, 385, 0, 256)
  pop()

  // Beach mat

  // Vertical lines in beach mat
  push()
  stroke("#607D8B")
  strokeWeight(3)
  for (let t = 0; t <= 1; t += 1 / 6) {
    const startPointX = lerp(505, 445, t)
    const startPointY = lerp(459, 424, t)

    const endPointX = lerp(620, 560, t)
    const endPointY = lerp(392, 358, t)

    line(startPointX, startPointY, endPointX, endPointY)
  }
  pop()

  // Actual mat
  push()
  if (redSunActivation) {
    fill("#FFE899")
  } else {
    fill("#FFF0BC")
  }
  quad(
    522, 463, 
    626, 403, 
    544, 353, 
    438, 414
  )
  pop()

  // Horizontal lines in beach mat
  push()
  if (redSunActivation) {
    stroke("#D7ADA6")
  } else {
    stroke("#B7CBD5")
  }
  strokeWeight(3)
  for (let t = 0; t <= 1; t += 1 / 6) {
    // Starting point of the line
    const startPointX = lerp(535, 610, t)
    const startPointY = lerp(453, 410, t)

    // Ending point of the line
    const endPointX = lerp(455, 530, t)
    const endPointY = lerp(407, 363, t)

    // Draw the line
    line(startPointX, startPointY, endPointX, endPointY)
  }
  pop()


  // Beach umbrella (based off SVG made in Gravit, allowing for more complex shapes and commands)

  // Handle
  push()
  stroke("#511F1F")
  strokeWeight(7)
  line(495, 356, 514, 461)
  pop()

  // Umbrella head (? not sure if this is the right name)
  push()
  if (redSunActivation) {
    fill("#893425")
  } else {
    fill("#FF8EA3")
  }
  beginShape()
  
  vertex(495, 356)

  // Draw the quadratic vertices 
  let coords = [
    [529, 358, 555, 373],
    [572, 350, 586, 345],
    [598, 340, 622, 347],
    [559, 275, 485, 286],
    [412, 298, 379, 371],
    [400, 363, 411, 366],
    [422, 369, 436, 385],
    [460, 353, 495, 356]
  ]

  // Practically a for loop but much more straightforward
  coords.forEach(coords => {
    quadraticVertex(coords[0], coords[1], coords[2], coords[3])
  })

  endShape()
  pop()

  // 1st wave
  push()
  fill("white")
  beginShape()

  vertex(491, 291)
  quadraticVertex(509, 295, 529, 317)
  quadraticVertex(549, 339, 553, 366)
  quadraticVertex(542, 340, 526, 321)
  quadraticVertex(510, 303, 491, 291)

  endShape()
  pop()

  // 2nd wave
  push()
  fill("white")

  beginShape()

  vertex(481, 292)
  quadraticVertex(461, 306, 448, 326)
  quadraticVertex(436, 347, 435, 377)
  quadraticVertex(445, 346, 453, 331)
  quadraticVertex(462, 315, 481, 292)

  endShape()
  pop()

  // Draw night sky
  if (!isDay && !isTransitioningFromNightToDay) {
    // Draw a gradient for the sky
    push()
    for (let t = 0; t < 1; t += 0.01) {
      const lerpedColor = lerpColor(color("#151A4F"), color("#4C408E"), t)
      fill(lerpedColor)
      rect(0, t * 170, width, 2)
    }
    pop()
  }

  // Darken filter has to be after sand&water since it goes on top of it
  if (isTransitioningFromDayToNight) {
    // Fade in darken filter
    push()
    const darkenOpacityLerp = lerp(0, 0.3 * 255, transitionT) // Lerp the darken filter opacity
    fill(48, 44, 109, darkenOpacityLerp)
    rect(0, 0, width, height)
    pop()
  }

  // Draw moon and darken filter during night
  if (!isDay && !isTransitioningFromNightToDay) {
    // Moon
    push()
    fill("#F4F6F0")
    ellipse(700, 85, 115, 115)
    pop()

    // Add darken filter since it's night
    push()
    fill("#302C6D4D") // Extra two characters at the end represent 30% alpha
    rect(0, 0, width, height)
    pop()
  }

  // Clouds
  push()
  fill("#d0cccc")

  // Only show the clouds if we have to, or if we're in the middle of a cloud move cycle
  // This ensures clouds don't just disappear from the screen
  if (showClouds || (cloudCounter + 520) % (width + 500) < 1100) {
    // ((cloudCounter + 520) % (width + 500))
    // First cloud
    rect((449 + cloudCounter) % (width + 500) - 150, 55, 69, 26)
    ellipse((518 + cloudCounter) % (width + 500) - 150, 61, 40, 40)
    ellipse((450 + cloudCounter) % (width + 500) - 150, 57, 48, 48)
    ellipse((484 + cloudCounter) % (width + 500) - 150, 48, 66, 66)

    // Second cloud
    rect((449 + cloudCounter + 150) % (width + 500) - 150, 55 + 55, 69, 26)
    ellipse((518 + cloudCounter + 150) % (width + 500) - 150, 61 + 55, 40, 40)
    ellipse((450 + cloudCounter + 150) % (width + 500) - 150, 57 + 55, 48, 48)
    ellipse((484 + cloudCounter + 150) % (width + 500) - 150, 48 + 55, 66, 66)

    // Third cloud
    rect((449 + cloudCounter + 300) % (width + 500) - 150, 55, 69, 26)
    ellipse((518 + cloudCounter + 300) % (width + 500) - 150, 61, 40, 40)
    ellipse((450 + cloudCounter + 300) % (width + 500) - 150, 57, 48, 48)
    ellipse((484 + cloudCounter + 300) % (width + 500) - 150, 48, 66, 66)

    // Increment counter
    cloudCounter++
  }

  pop()

  // Fade out darken filter
  if (isTransitioningFromNightToDay) {
    push()
    const darkenOpacityLerp = lerp(0.3 * 255, 0, transitionT) // Lerp the darken filter opacity
    fill(48, 44, 109, darkenOpacityLerp)
    rect(0, 0, width, height)
    pop()
  }

  // Red sun overlay, only shows if red sun activated
  if (redSunActivation) {
    push()
    fill(253, 94, 83, 80)
    rect(0, 170, width, height)
    pop()
  }

  // Palm tree (based this off an SVG I made in Gravit, hence the more complicated shapes & commands)
  // This is also after everything since the darken filter ends up cutting it off near the top of the tree

  // Trunk
  push()
  if (redSunActivation) {
    fill("#893425")
  } else {
    fill("#795548")
  }
  noStroke()
  
  beginShape()

  vertex(108, 178)
  vertex(120, 178)
  vertex(111, 318)
  curveVertex(107, 336)
  curveVertex(92,  365)
  curveVertex(66,  365)
  curveVertex(53,  350)
  curveVertex(84,  306)
  curveVertex(102, 252)
  curveVertex(108, 194)

  endShape(CLOSE)
  pop()

  // Differing tree based on whether red sun is activated
  if (redSunActivation) {
    // Bottom left leaf
    push()
    stroke("#893425")
    noFill()
    strokeWeight(7)
    beginShape()
  
    vertex(114, 177)
    quadraticVertex(74,  202,   64,   216)
    quadraticVertex(53,  231,   37,   272)
  
    endShape()
    pop()
  
    // Bottom right leaf
    push()
    stroke("#893425")
    noFill()
    strokeWeight(9)
    beginShape()
  
    vertex(114, 178)
    quadraticVertex(145, 203, 154, 219)
    quadraticVertex(163, 234, 181, 278)
    
    endShape()
    pop()
  } else {
    // Top left leaf
    push()
    fill("#388e3c")
    beginShape()
  
    vertex(113, 177)
    quadraticVertex(78,   173,   62,   178)
    quadraticVertex(46,   183,    7,   203)
    quadraticVertex(25,   145,   64,   145)
    quadraticVertex(102,  144,  113,   177)
  
    endShape(CLOSE)
    pop()
  
    // Top right leaf
    push()
    fill("#388e3c")
    beginShape()
  
    vertex(114, 178)
    quadraticVertex(146, 177, 159, 182)
    quadraticVertex(172, 186, 204, 203)
    quadraticVertex(195, 160, 162, 158)
    quadraticVertex(128, 155, 114, 178)
  
    endShape(CLOSE)
    pop()
  
    // Bottom left leaf
    push()
    fill("#4caf50")
    beginShape()
  
    vertex(114, 177)
    quadraticVertex(74,  202,   64,   216)
    quadraticVertex(53,  231,   37,   272)
    quadraticVertex(0,   226,   30,   196)
    quadraticVertex(68,  167,  114,   177)
  
    endShape(CLOSE)
    pop()
  
    // Bottom right leaf
    push()
    fill("#4caf50")
    beginShape()
  
    vertex(114, 178)
    quadraticVertex(145, 203, 154, 219)
    quadraticVertex(163, 234, 181, 278)
    quadraticVertex(204, 226, 174, 196)
    quadraticVertex(144, 165, 114, 178)
    
    endShape(CLOSE)
    pop()
  }

  // Draw some text at the top to let the user know
  textSize(16)
  fill("white")

  // Tell user the current state
  if (!isTransitioningFromDayToNight && !isTransitioningFromNightToDay) {
    // Not transitioning
    if (isDay) {
      text("State: Day", 10, 20)
    } else {
      text("State: Night", 10, 20)
    }
  } else if (isTransitioningFromDayToNight) {
    // Day -> Night
    text("State: Day -> Night", 10, 20)
  } else if (isTransitioningFromNightToDay) {
    // Night -> Day
    text("State: Night -> Day", 10, 20)
  }

  fill("black")
  // Show user whether clouds are on / off
  if (showClouds) {
    text("Clouds: on", width - 100, height - 20)
  } else {
    text("Clouds: off", width - 100, height - 20)
  }

  fill("white")
  if (30 * startFrameRate - timeCounter < 5 * startFrameRate) {
    // Show a warning if less than 5s to state change
    text("Changing state in " + String(round((30 * startFrameRate - timeCounter) / 60)) + "s...", 10, 40)
  }

  // Show instruction text
  fill("black")
  if (redSunActivation == 1) {
    text("Why...", 10, height - 80)
  } else {
    text("Don't click on the sun 7 times!", 10, height - 80)
  }
  text("Click c to turn on / off clouds", 10, height - 60)
  text("Press d to change to day", 10, height - 40)
  text("Press n to change to night", 10, height - 20)

  // Auto change from day -> night or vice versa every 30s
  // Uses frame rate to accurately count how many seconds have passed
  if (timeCounter > 30 * startFrameRate) {
    // Don't try transitioning if we're already transitioning
    if (!isTransitioningFromDayToNight || !isTransitioningFromNightToDay) {
      if (isDay) {
        // Transition to night
        isTransitioningFromDayToNight = true
      } else {
        // Transition to day
        isTransitioningFromNightToDay = true
      }
    }

    // Reset counter for next iteration
    timeCounter = 0
  }

  // Increment time
  timeCounter++
}

function keyTyped() {
  if (!isTransitioningFromDayToNight || !isTransitioningFromNightToDay) {
    if (key === 'd' && !isDay) {
      // Only transition to day if it's night
      isTransitioningFromNightToDay = true
    } else if (key === 'n' && isDay) {
      // Only transition to night if it's day
      isTransitioningFromDayToNight = true
    } else if (key == 'c') {
      // Toggle clouds
      showClouds = !showClouds
    }
  }
}

function mousePressed() {
  // Increment click if user clicks in region where sun generally resides
  if (mouseX >= 150 && mouseX <= 340 && mouseY >= 75 && mouseY <= 175) {
    clickCount++
  }
}
