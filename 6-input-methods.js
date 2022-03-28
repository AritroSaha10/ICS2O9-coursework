/*
   Description: recreates a calculator
   Author: Aritro Saha
   Date of last edit: Mar10/22 
*/

let firstNumber;
let secondNumber;
let myMenu;
let calculateButton;

function setup() {
	createCanvas(windowWidth, windowHeight);
  
  // Create buttons
	firstNumber = createInput();
	firstNumber.position(20,20);
  
  secondNumber = createInput();
	secondNumber.position(20,80);
  
  // Create select box
	myMenu = createSelect();
	myMenu.position(20,50);
  
  // Add all menu options
	myMenu.option("+");
	myMenu.option("-");
  myMenu.option("*");
  myMenu.option("/");
  myMenu.option("^");
  myMenu.option("√");
  
  // Callback when menu option is selected
  // Makes sure that you don't use two numbers for a square root
  myMenu.changed(() => {
    const option = myMenu.value();
    if (option == "√") {
      secondNumber.attribute("disabled", '');
    } else {
      secondNumber.removeAttribute("disabled");
    }
  });
  
  // Create calculate button
	calculateButton = createButton("Calculate");
	calculateButton.position(20,110);
	calculateButton.mousePressed(calculatePressed);
}

function draw() {
}

function calculatePressed() {
  background(255);
  
  let result;
  let num1 = Number(firstNumber.value());
  let num2 = Number(secondNumber.value());
  
  // Switch case that handles everything
  switch (myMenu.value()) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "^":
      result = pow(num1, num2);
      break;
    case "√":
      result = sqrt(num1)
      break;
  }
  
  textSize(15);
  text(`Answer: ${result}`, 20, 160);
}
