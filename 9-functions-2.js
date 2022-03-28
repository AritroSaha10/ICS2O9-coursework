/*
   Description: Exercise 10
   Author: Aritro Saha
   Date of last edit:  Mar28/22
*/

let myInput, otherInput;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	fill(0);
	textSize(20);
	
	myInput = createInput('');
	myInput.position(28, 75);
	
	
	otherInput = createInput('');
	otherInput.position(28, 150);
}

function draw() {
	background(255);
	text("Input a word or phrase:", 20, 65);
	text("Input another word or phrase: ", 20, 140);

  // Calculate vowel counts
  const vowelCount1 = checkVowels(myInput.value());
  const vowelCount2 = checkVowels(otherInput.value());

  // Less than 0 means it has a length < 3
  if (vowelCount1 < 0 || vowelCount2 < 0) {
    text("Please make sure your inputs have 3 chars or more.", 20, 250);
  } else {
    // Show text regarding vowels
    text(`${myInput.value()} has ${vowelCount1} vowels`, 20, 250);
  
    text(`${otherInput.value()} has ${vowelCount2} vowels`, 20, 300);
  
    text(`The difference is: ${abs(vowelCount2 - vowelCount1)}`, 20, 350);
  }
}

// counts all vowels in string wordtoCheck, returns the result
function checkVowels(wordToCheck){
	let vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'A', 'E', 'I', 'O', 'U', 'Y'];

  // Check the length of the word
	if (wordToCheck.length < 3) {
    return -1;
  }

  // Go through each letter and check if vowel (using reduce function)
  return wordToCheck.split('').reduce((totalVowels, letter) => vowels.includes(letter) ? totalVowels + 1 : totalVowels, 0)
}
