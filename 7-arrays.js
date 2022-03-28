/*
   Description: a grocery list that can have stuff added and removed from it
   Author: Aritro Saha
   Date of last edit: Mar21/22
*/


let groceryList = [];
let groceryInput, submit, removeInput, removeButton;


function setup() {
	createCanvas(500, 500);

  // Create input
	groceryInput = createInput();
	groceryInput.position(100, 55);

  // Create add button
	submit = createButton("Add");
	submit.position(300, 55);
	submit.mousePressed(pressAdd);

  // Create remove button
	removeButton = createButton("Remove");
	removeButton.position(350, 55);
	removeButton.mousePressed(pressRemove);
}

function draw() {
	background(255);

	fill(0);
	textSize(20);
	text("Item: ", 20, 65);

	text("Current List: ", 20, 150);

  // Draw each item in the list to the screen
  groceryList.forEach((item, i) => {
    // Draw apples or chicken as green
    if (["apples", "chicken"].includes(item)) {
      fill("green")
    } else {
      fill("black")
    }
    
    text(item, 20, i * 20 + 200)
  })

}

function pressAdd() {
  const item = groceryInput.value()

  // Only add if unique and less than 10 items
  if (!groceryList.includes(item) && groceryList.length < 10) {
    groceryList.push(item)
  }

  // Sort list
  groceryList.sort()
}

function pressRemove() {
  const itemToRemove = groceryInput.value()

  // Only try to remove if in list, or else alert
  if (groceryList.includes(itemToRemove)) {
    groceryList = groceryList.filter(item => item !== itemToRemove)
  } else {
    alert("That item does not exist.")
  }

  // Sort list
  groceryList.sort()
}
