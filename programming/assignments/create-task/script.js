/*
   Description: recreates a game of Wordle. More instructions available on screen after running
   Author: Aritro Saha
   Date of last edit: Apr22/2022
*/

const MAX_GUESSES = 6 // Maximum number of guesses that user can make

let actualWord; // Stores the actual word

// Game finish stores
let gameFinished = false
let userNotifiedOfGameFinish = false

// Alert text
let currentAlert = "Alerts will be here"

// All guesses, each element is an array storing characters
let guesses = [[]]

function gradeGuess(predictedWord, actualWord) {
  // Predicted word isn't the same length, we can't properly check
  if (predictedWord.length != actualWord.length) {
    return -1
  }

  // Set both words to lowercase since this is case-insensitive
  predictedWord = predictedWord.toLowerCase()
  actualWord = actualWord.toLowerCase()

  // Initialize variables to be used later
  let predictScores = []
  let frequency = {}

  // Create frequency chart for actual word to make sure we don't tell the user the wrong amount of letters
  for (let i = 0; i < actualWord.length; i++) {
    let actualChar = actualWord[i];

    if (frequency[actualChar]) {
      frequency[actualChar]++
    } else {
      frequency[actualChar] = 1
    }
  }

  for (let i = 0; i < predictedWord.length; i++) {
    let predictedChar = predictedWord[i];
    let actualChar = actualWord[i];
    
    // Check if correct letter + correct pos
    if (predictedChar == actualChar) {
      // 2 -> Correct letter + pos
      predictScores.push(2)

      // Don't count the same character multiple times
      frequency[predictedChar]--
    }
    // Check if correct letter + wrong pos
    else if (frequency[predictedChar] > 0) {
      // 1 -> Correct letter / wrong pos
      predictScores.push(1)

      // Don't count the same character multiple times
      frequency[predictedChar]--
    }
    // Wrong letter
    else {
      // 0 -> Wrong letter + pos
      predictScores.push(0)
    }
  }

  return predictScores
}

function localStyle(exc) {
  push()
  exc()
  pop()
}

function setup() {
  createCanvas(700, 700)

  // Pick a random word
  actualWord = random(smallerWordList)

  console.log("Word:", actualWord)

  // Reset button
  const resetButton = createButton("Reset")
  resetButton.position(520, 373)
  resetButton.mousePressed(() => {
    // Resets all global variables
    guesses = [[]]
    gameFinished = false
    userNotifiedOfGameFinish = false
    currentAlert = "Alerts will be here"

    actualWord = random(smallerWordList)
    console.log("Word:", actualWord)
  })
}

function draw() {
  background(240)

  // Title
  localStyle(() => {
    textAlign(CENTER, CENTER)
    textSize(40)
    fill("black")
    text("DICTLE", 250, 35)
  })

  // Alert box
  localStyle(() => {
    textAlign(LEFT, CENTER)
    textSize(20)
    fill("black")
    text(currentAlert, 530, 390, 150, 300)
  })

  // Alert box border
  localStyle(() => {
    stroke("gray")
    noFill()
    rect(515, 390, 175, 300)
  })

  // Instructions box border
  localStyle(() => {
    stroke("gray")
    noFill()
    rect(515, 10, 175, 350)
  })

  // Instructions title
  localStyle(() => {
    fill("black")
    textAlign(CENTER, CENTER)
    textSize(24)
    text("Instructions", 515, 10, 175, 50)
  })

  // Instructions text
  localStyle(() => {
    fill("black")
    textAlign(LEFT, TOP)
    textSize(14)
    text(`You have ${MAX_GUESSES} tries to guess the word.\nYour guesses can only have 5 letters, and must be words themselves.\n\nWhen you press enter, your guess will be graded.\n\nGreen -> Correct letter & position\nYellow -> Correct letter, wrong position\nGray -> Letter not in word\n\nPress \"reset\" to play again or get a new word`, 520, 55, 175, 400)
  })

  // Draw characters and boxes
  let rectY = 60;
  for (let y = 0; y < min(guesses.length, MAX_GUESSES); y++) {
    let rectX = 40;

    // Score the current guess
    const currentGuess = guesses[y].join('');
    const guessResults = gradeGuess(currentGuess, actualWord)

    for (let x = 0; x < 5; x++) {
      if (y == guesses.length - 1) {
        // Last line on a game finish will always be empty, don't draw it
        fill("light gray")
        if (gameFinished) {
          break
        }
      } else {
        // Add color to guess results
        if (guessResults[x] == 0) {
          fill("gray")
        } else if (guessResults[x] == 1) {
          fill("yellow")
        } else if (guessResults[x] == 2) {
          fill("green")
        }
      }

      // Draw box with fill
      rect(rectX, rectY, 80, 80)

      localStyle(() => {
        // Draw text
        fill("black")
        textAlign(CENTER, CENTER)
        textSize(50)
        text(guesses[y][x] ? guesses[y][x] : "", rectX + 40, rectY + 40)
        })

      rectX += 85
    }

    rectY += 100
  }

  // Player is out of tries
  if (guesses.length == MAX_GUESSES + 1) {
    gameFinished = true

    // Only triggers if user didn't get word
    if (!userNotifiedOfGameFinish && guesses[guesses.length - 2].join('') != actualWord) {
      currentAlert = `Word: ${actualWord}`
    }
  }

  // Player is finished game
  if (!userNotifiedOfGameFinish && gameFinished) {
    const numberOfTries = guesses[guesses.length - 2].join('') == actualWord ? guesses.length - 1 : "X"

    if (currentAlert.includes("Word:")) {
      currentAlert += `\n\nYou got: ${numberOfTries}/${MAX_GUESSES}`
      currentAlert += "\n\nCheck clipboard or console for result showcase"
    } else {
      currentAlert = `\nYou got: ${numberOfTries}/${MAX_GUESSES}\n\n`
      currentAlert += "Check clipboard or console for result showcase"
    }

    userNotifiedOfGameFinish = true

    // Create a result showcase that can be copy pasted
    let resultsShowcase = `Dictle ${numberOfTries}/${MAX_GUESSES}`

    const preparedEmojis = guesses.map(guess => {
      // Grade the guess
      const guessScores = gradeGuess(guess.join(''), actualWord)

      if (guessScores != -1) {
        // Return string version of guess results
        return guessScores.map(letterScore => {
          if (letterScore == 2) {
            return "🟩"
          } else if (letterScore == 1) {
            return "🟨"
          } else {
            return "⬛"
          }
        }).join('')
      } else {
        // Empty guess, don't bother
        return null
      }
    })

    // Remove the empty guess
    preparedEmojis.pop()

    // Join the emojis
    resultsShowcase += "\n" + preparedEmojis.join("\n")

    // Log it to the console
    console.log(resultsShowcase)

    // Write to the clipboard, after asking for permissions  
    if (navigator && navigator.permissions) {
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText(resultsShowcase)
      } else {
        currentAlert += "\n\nUnable to copy results to your clipboard."
      }
    });
    } else {
        currentAlert += "\n\nUnable to copy results to your clipboard."
      }
  }

  // Border
  localStyle(() => {
    noFill()
    stroke("black")
    strokeWeight(5)
    rect(5, 5, 495, 690)
  })
}

function keyTyped() {
  // Don't bother if game is finished
  if (!gameFinished) {
    if (keyCode == ENTER) {
      const recentGuessStr = guesses[guesses.length - 1].join('')

      // Only run if they completed the word and it's actually a word
      if (recentGuessStr.length == 5 && usableWordList.includes(recentGuessStr)) {
        // Check if user got the word
        gameFinished = true
        const guessResults = gradeGuess(recentGuessStr, actualWord)

        // Guess is incomplete, do not bother
        if (guessResults == -1) {
          gameFinished = false
        }

        // If any of the scores are incorrect, it's not finished
        for (let i = 0; i < guessResults.length; i++) {
          if (guessResults[i] != 2) {
            gameFinished = false
            break
          }
        }

        // Add a new guess
        guesses.push([])

        currentAlert = "Alerts will be here"
      } else {
        currentAlert = "Please provide a 5-letter word."
      }
    } else if (letters.includes(key.toLowerCase()) && guesses[guesses.length - 1].length != 5) {
      // Add letter
      guesses[guesses.length - 1].push(key.toLowerCase())
    }
  }
}

function keyPressed() {
  if (keyCode == BACKSPACE && guesses[guesses.length - 1].length != 0) {
    // Remove letter
    guesses[guesses.length - 1].pop()
  }
}
