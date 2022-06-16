/*
   Description: String Methods
   Author: Aritro Saha
   Date of last edit: March 23, 2022
*/

let stringInput;

function setup() {
  createCanvas(600,600);
  
	stringInput = createInput();
	stringInput.position(50, 55);
}

function draw() {
  background(255);

	textSize(20);
  if (stringInput.value().endsWith("inator")) {
    text("True / False: the name is one of an invention", 50, 200);
  } else {
    text("True / False: the name is normal", 50, 200);
  }

	text(`Modification: ${stringInput.value() + " 9000"}` , 50, 250);
}
