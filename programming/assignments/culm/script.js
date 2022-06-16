/*
   Description: a customizable screensaver for blu-ray discs
   Author: Aritro Saha 
   Date of last edit: 6/15/22
*/

// Array with info about every bouncing logo/rect
let allRects = [];

// Starting window width and height to reference later, we don't use windowWidth/windowHeight because these are subject to change
let startWindowW, startWindowH;

// Sliders for customizing the x and y speed of new bouncing logos
let xSpeedSlider, ySpeedSlider;

// Whether to show images or not, and its input box
let useImagesCheckbox;

// All of the colors to cycle through
let myColors = [
    "green",
    "red",
    "blue",
    "yellow",
    "purple",
    "magenta",
    "pink",
    "aliceblue",
    "antiquewhite",
    "aquamarine",
    "blueviolet",
    "darksalmon",
    "forestgreen",
    "indigo",
    "lavenderblush",
    "lemonchiffon",
    "lightskyblue"
];

// All of the tinted version of the blu-ray img
let tintedBluRays = [];

// Reference to the blu-ray logo
let bluRayImg;

function preload() {
    // Load the blu-ray logo before starting the program
    bluRayImg = loadImage('blu-ray.png');
}

function setup() {
    // Record the starting window dimensions
    startWindowW = windowWidth;
    startWindowH = windowHeight;

    createCanvas(windowWidth, windowHeight);

    // Start off with three bouncing rectangles
    for (let i = 0; i < 3; i++) {
        addBouncingRect();
    }

    // Add x speed slider
    xSpeedSlider = createSlider(0, 20, 0);
    xSpeedSlider.position(10, 20);

    // Add y speed slider
    ySpeedSlider = createSlider(0, 20, 0);
    ySpeedSlider.position(10, 50);

    // Place the "add and remove rect" buttons
    let addRectBtn = createButton("Add");
    let delRectBtn = createButton("Del");

    // Position them relatively to be in the top right corner
    addRectBtn.position(startWindowW - (startWindowW / 6), 10);
    delRectBtn.position(startWindowW - (startWindowW / 6), 40);

    // Set onClick listner for add button
    addRectBtn.mousePressed(() => {
        addBouncingRect(xSpeedSlider.value(), ySpeedSlider.value());
    });

    // Set onClick listner for del button
    delRectBtn.mousePressed(() => {
        if (allRects.length > 0) allRects.splice(random(allRects.length), 1);
    });

    // Check if there's already something in local storage as a default value, if so, set the checkbox value to that
    let useImagesDefaultVal = localStorage.getItem('useImages') === "true";

    // Create the use images checkbox
    useImagesCheckbox = createCheckbox('Use Images', useImagesDefaultVal);
    useImagesCheckbox.position(10, 75);
    useImagesCheckbox.changed(() => {
        // Change the local storage to match user's selection
        localStorage.setItem('useImages', useImagesCheckbox.checked());
    });

    // Prepare the tinted images beforehand
    // This is needed because p5's tint function on images is pixelwise??? Knowing that the blu-ray images are 1024x553, assuming there are 10 on the screen, 1024*553*10 ~= 5.6 million tint calculations, every frame...
    // By tinting them beforehand using p5.Graphics, the tint calculations don't lag out the animations in the draw loop
    myColors.forEach(color => {
        let buf = createGraphics(width, height);
        buf.tint(color);
        buf.image(bluRayImg, 0, 0, width, height);

        tintedBluRays[color] = buf;
    })
}

function draw() {
    background('gray');

    for (let i = 0; i < allRects.length; i++) {
        noStroke();

        // Use either the images or the rects depending on user's choice
        if (!useImagesCheckbox.checked()) {
            fill(allRects[i].color);
            rect(allRects[i].x, allRects[i].y, allRects[i].w, allRects[i].h, startWindowW / 100);
        } else {
            image(tintedBluRays[allRects[i].color], allRects[i].x, allRects[i].y, allRects[i].w, allRects[i].h);
        }

        // Reflect rect's x direction and change its color if it hits the left or right side
        if (allRects[i].x < 0 || allRects[i].x > startWindowW - allRects[i].w) {
            allRects[i].xSpeed = -allRects[i].xSpeed;
            allRects[i].color = random(myColors.filter(item => item != color));
        }

        // Reflect rect's y direction and change its color if it hits the top or bottom
        if (allRects[i].y < 0 || allRects[i].y > startWindowH - allRects[i].h) {
            allRects[i].ySpeed = -allRects[i].ySpeed;
            allRects[i].color = random(myColors.filter(item => item != color));
        }

        // Update the rect's pos
        allRects[i].x += allRects[i].xSpeed;
        allRects[i].y += allRects[i].ySpeed;
    }

    // Add the input labels
    fill("black");
    text("X Speed Slider", 10, 20);
    text("Y Speed Slider", 10, 50);

    // Display number of boxes at a current time, positioned relatively based on window dimensions so it's in the bottom left corner
    text(`Number of boxes: ${allRects.length}`, 20, startWindowH - 20);
}

// Add a bouncing logo/rect to the screen
function addBouncingRect(xSpeed, ySpeed) {
    let newXSpeed = 0;
    let newYSpeed = 0;

    // Generate random speeds if none were provided
    if (xSpeed && ySpeed) {
        newXSpeed = xSpeed;
        newYSpeed = ySpeed;
    } else {
        // Choose a random speed between -10 and 10, where the absolute are greater than or equal to 1
        while (floor(abs(newXSpeed)) == 0 || floor(abs(newYSpeed)) == 0) {
            newXSpeed = random(-10, 10);
            newYSpeed = random(-10, 10);
        }
    }

    // Make the width and height of the rectangle 10-20% of the window while keeping the image's ratio
    let newRectW = windowWidth * random(0.1, 0.2);
    let newRectH = 553 / 1024 * newRectW;

    // Add this new rectangle to the array
    allRects.push({
        x: floor(random(windowWidth * 0.3, windowWidth * 0.7)), // Start at a random position
        y: floor(random(windowHeight * 0.3, windowHeight * 0.7)),
        xSpeed: newXSpeed,
        ySpeed: newYSpeed,
        w: newRectW,
        h: newRectH,
        color: random(myColors) // Choose a random color
    });
}