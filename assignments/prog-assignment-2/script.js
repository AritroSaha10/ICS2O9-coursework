/*
   Description: recreates a game of Hangman
   Author: Aritro Saha
   Date of last edit: Apr4/2022
*/

let X_OFFSET = -67;
let Y_OFFSET = -27;

// Scraped from https://www.thefreedictionary.com/6-letter-words.htm
let all6LetterWords = ["abroad", "accept", "access", "across", "acting", "action", "active", "actual", "advice", "advise", "affect", "afford", "afraid", "agency", "agenda", "almost", "always", "amount", "animal", "annual", "answer", "anyone", "anyway", "appeal", "appear", "around", "arrive", "artist", "aspect", "assess", "assist", "assume", "attack", "attend", "august", "author", "avenue", "backed", "barely", "battle", "beauty", "became", "become", "before", "behalf", "behind", "belief", "belong", "berlin", "better", "beyond", "bishop", "border", "bottle", "bottom", "bought", "branch", "breath", "bridge", "bright", "broken", "budget", "burden", "bureau", "button", "camera", "cancer", "cannot", "carbon", "career", "castle", "casual", "caught", "center", "centre", "chance", "change", "charge", "choice", "choose", "chosen", "church", "circle", "client", "closed", "closer", "coffee", "column", "combat", "coming", "common", "comply", "copper", "corner", "costly", "county", "couple", "course", "covers", "create", "credit", "crisis", "custom", "damage", "danger", "dealer", "debate", "decade", "decide", "defeat", "defend", "define", "degree", "demand", "depend", "deputy", "desert", "design", "desire", "detail", "detect", "device", "differ", "dinner", "direct", "doctor", "dollar", "domain", "double", "driven", "driver", "during", "easily", "eating", "editor", "effect", "effort", "eighth", "either", "eleven", "emerge", "empire", "employ", "enable", "ending", "energy", "engage", "engine", "enough", "ensure", "entire", "entity", "equity", "escape", "estate", "ethnic", "exceed", "except", "excess", "expand", "expect", "expert", "export", "extend", "extent", "fabric", "facing", "factor", "failed", "fairly", "fallen", "family", "famous", "father", "fellow", "female", "figure", "filing", "finger", "finish", "fiscal", "flight", "flying", "follow", "forced", "forest", "forget", "formal", "format", "former", "foster", "fought", "fourth", "French", "friend", "future", "garden", "gather", "gender", "german", "global", "golden", "ground", "growth", "guilty", "handed", "handle", "happen", "hardly", "headed", "health", "height", "hidden", "holder", "honest", "impact", "import", "income", "indeed", "injury", "inside", "intend", "intent", "invest", "island", "itself", "jersey", "joseph", "junior", "killed", "labour", "latest", "latter", "launch", "lawyer", "leader", "league", "leaves", "legacy", "length", "lesson", "letter", "lights", "likely", "linked", "liquid", "listen", "little", "living", "losing", "lucent", "luxury", "mainly", "making", "manage", "manner", "manual", "margin", "marine", "marked", "market", "martin", "master", "matter", "mature", "medium", "member", "memory", "mental", "merely", "merger", "method", "middle", "miller", "mining", "minute", "mirror", "mobile", "modern", "modest", "module", "moment", "morris", "mostly", "mother", "motion", "moving", "murder", "museum", "mutual", "myself", "narrow", "nation", "native", "nature", "nearby", "nearly", "nights", "nobody", "normal", "notice", "notion", "number", "object", "obtain", "office", "offset", "online", "option", "orange", "origin", "output", "oxford", "packed", "palace", "parent", "partly", "patent", "people", "period", "permit", "person", "phrase", "picked", "planet", "player", "please", "plenty", "pocket", "police", "policy", "prefer", "pretty", "prince", "prison", "profit", "proper", "proven", "public", "pursue", "raised", "random", "rarely", "rather", "rating", "reader", "really", "reason", "recall", "recent", "record", "reduce", "reform", "regard", "regime", "region", "relate", "relief", "remain", "remote", "remove", "repair", "repeat", "replay", "report", "rescue", "resort", "result", "retail", "retain", "return", "reveal", "review", "reward", "riding", "rising", "robust", "ruling", "safety", "salary", "sample", "saving", "saying", "scheme", "school", "screen", "search", "season", "second", "secret", "sector", "secure", "seeing", "select", "seller", "senior", "series", "server", "settle", "severe", "sexual", "should", "signal", "signed", "silent", "silver", "simple", "simply", "single", "sister", "slight", "smooth", "social", "solely", "sought", "source", "soviet", "speech", "spirit", "spoken", "spread", "spring", "square", "stable", "status", "steady", "stolen", "strain", "stream", "street", "stress", "strict", "strike", "string", "strong", "struck", "studio", "submit", "sudden", "suffer", "summer", "summit", "supply", "surely", "survey", "switch", "symbol", "system", "taking", "talent", "target", "taught", "tenant", "tender", "tennis", "thanks", "theory", "thirty", "though", "threat", "thrown", "ticket", "timely", "timing", "tissue", "toward", "travel", "treaty", "trying", "twelve", "twenty", "unable", "unique", "united", "unless", "unlike", "update", "useful", "valley", "varied", "vendor", "versus", "victim", "vision", "visual", "volume", "walker", "wealth", "weekly", "weight", "wholly", "window", "winner", "winter", "within", "wonder", "worker", "wright", "writer", "yellow"]

let correctLetters = ["", "", "", "", "", ""]
let incorrectLetters = []

let currentWord = all6LetterWords[Math.floor(Math.random() * all6LetterWords.length)].toUpperCase()

let gameFinished = false
let gameFinishStatement = ""

// Check whether the letter is in the word or not, and do actions according to that
function checkLetter(letter) {
  // Don't bother if it's not a letter or game is done
  if (!letter.match(/[a-z]/i) || gameFinished) {
    return
  }
  
  // Get all possible indices of letter in word
  let letterPosInWord = []
  for (let i = 0; i < 6; i++) {
    if (letter == currentWord[i]) {
      letterPosInWord.push(i)
    }
  }

  // Add to incorrect guesses if it's not in the word
  if (!letterPosInWord.length && !incorrectLetters.includes(letter)) {
    incorrectLetters.push(letter)

    // Check if user lost
    if (incorrectLetters.length == 11) {
      gameFinished = true
      gameFinishStatement = `You lose :(\n\nWord: ${currentWord}`
    }
    
    return
  }

  // Get all positions of the letter in current letters
  let letterPosInGuess = []
  let i = 0
  while (i < 6) {
    if (letter == correctLetters[i]) {
      letterPosInGuess.push(i)
    }

    i++;
  }

  // Find indices not already guessed
  let uniquePositions = letterPosInWord.filter(letter => !letterPosInGuess.includes(letter))

  // Only add the first one to correct letters
  correctLetters[uniquePositions[0]] = letter

  // Check if user won
  gameFinished = true
  gameFinishStatement = "You win! :)"
  for (let i = 0; i < 6; i++) {
    // One of the letters are empty, player is not done yet
    if (correctLetters[i] == "") {
      gameFinished = false
      gameFinishStatement = ""
    }
  }
}

function localStyle(exc) {
  push()
  exc()
  pop()
}

function setup() {
  createCanvas(800, 800)
}

function draw() {
  const badLetterCount = incorrectLetters.length
  
  background(240)

  // Title
  localStyle(() => {
    textSize(30)
    textAlign(CENTER, CENTER)
    text("Hangman", 400, 50)
  })

  // Author
  localStyle(() => {
    textSize(14)
    textAlign(CENTER, CENTER)
    text("By Aritro Saha", 500, 75)
  })

  // Incorrect letters
  localStyle(() => {
    textSize(20)
    text(`Incorrect: ${incorrectLetters.join(' ')}`, 580, 100, 100, 200)
  })

  // Actual stickman + gallow
  localStyle(() => {
    noFill()
    strokeWeight(5)

    // Each line drawn on a new mistake

    // Gallow
    if (badLetterCount > 0) {
      // Base
      line(650 + X_OFFSET, 650 + Y_OFFSET, 450 + X_OFFSET, 650 + Y_OFFSET)
    }

    if (badLetterCount > 1) {
      // Stand
      line(550 + X_OFFSET, 200 + Y_OFFSET, 550 + X_OFFSET, 650 + Y_OFFSET)
    }

    if (badLetterCount > 2) {
      // Support
      line(500 + X_OFFSET, 200 + Y_OFFSET, 550 + X_OFFSET, 235 + Y_OFFSET)
    }

    if (badLetterCount > 3) {
      // Arch
      line(400 + X_OFFSET, 200 + Y_OFFSET, 550 + X_OFFSET, 200 + Y_OFFSET)
    }

    if (badLetterCount > 4) {
      // Rope
      line(400 + X_OFFSET, 250 + Y_OFFSET, 400 + X_OFFSET, 200 + Y_OFFSET)
    }

    // Stickman
    if (badLetterCount > 5) {
      // Head
      ellipse(400 + X_OFFSET, 300 + Y_OFFSET, 100, 100)
    }

    if (badLetterCount > 6) {
      // Body / Spine
      line(400 + X_OFFSET, 350 + Y_OFFSET, 400 + X_OFFSET, 500 + Y_OFFSET)
    }

    if (badLetterCount > 7) {
      // Arm 1
      line(400 + X_OFFSET, 450 + Y_OFFSET, 450 + X_OFFSET, 400 + Y_OFFSET)
    }

    if (badLetterCount > 8) {
      // Arm 2
      line(400 + X_OFFSET, 450 + Y_OFFSET, 350 + X_OFFSET, 400 + Y_OFFSET)
    }

    if (badLetterCount > 9) {
      // Leg 1
      line(400 + X_OFFSET, 500 + Y_OFFSET, 350 + X_OFFSET, 600 + Y_OFFSET)
    }

    if (badLetterCount > 10) {
      // Leg 2
      line(400 + X_OFFSET, 500 + Y_OFFSET, 450 + X_OFFSET, 600 + Y_OFFSET)
    }
  })

  // Show correct letters at bottom with underlines
  localStyle(() => {
    let i = 0
    let startX = 120
    let endX = 170
    let avgX = (startX + endX) / 2

    while (endX <= 620 && i < 6) {
      startX = 120 + i * 100 
      endX = 120 + i * 100 + 50
      avgX = (startX + endX) / 2

      line(startX, 750, endX, 750)
      textSize(35)
      text(correctLetters[i], avgX - 10, 745)

      i++
    }
  })

  // Game end screen
  if (gameFinished) {
    localStyle(() => {
      fill("#91919166")
      rect(0, 0, 800, 800)

      fill("white")

      textSize(50)
      textStyle(BOLD)
      textAlign(CENTER, CENTER)
      
      text(gameFinishStatement, 400, 400)
    })
  }
}

function keyTyped() {
  // Run the check letter function when a key is pressed
  checkLetter(key.toUpperCase())
}
