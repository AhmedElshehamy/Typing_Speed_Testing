//   Steps To Create The Project
// [01] Create HTML Markup
// [02] Add Styling And Separate From Logic
// [03] Create The App Logic
// ----[01] Add Levels
// ----[02] Show Level And Seconds
// ----[03] Add Array Of Words
// ----[04] ِAdd Start Game Button
// ----[05] Generate Upcoming Words
// ----[06] Disable Copy Word And Paste Event + Focus On Input
// ----[07] Start Play Function
// ----[08] Start The Time And Count Score
// ----[09] Add The Error And Success Messages
// [04] Your Trainings To Add Features
// ----[01] Save Score To Local Storage With Date
// ----[02] Choose Levels From Select Box
// ----[03] Break The Logic To More Functions
// ----[04] Choose Array Of Words For Every Level
// ----[05] Write Game Instruction With Dynamic Values
// ----[06] Add 3 Seconds For The First Word

const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];


const lvls = {

  'Easy': 5,
  'Normal': 3,
  'Hard': 2

}


let defaultLvls = 'Normal'

let defaultLvlsSeconds = lvls[defaultLvls]

// Select Element

let messageLvl = document.querySelector('.message .lvl')
let messageSecond = document.querySelector('.message .seconds')
let theWord = document.querySelector('.the-word')
let upcomingWord = document.querySelector('.upcoming-words')
let input = document.querySelector('.input')
let timeLeftSpan = document.querySelector('.time span')
let scoreGot = document.querySelector('.score .got')
let scoreTotal = document.querySelector('.score .total')
let finish = document.querySelector('.finish')
let startBtn = document.querySelector('.start')



// Setting

messageLvl.innerHTML = defaultLvls

messageSecond.innerHTML = defaultLvlsSeconds

timeLeftSpan.innerHTML = defaultLvlsSeconds

scoreTotal.innerHTML = words.length


input.onpaste = function () {
  return false
}

startBtn.onclick = function () {

  this.remove()
  input.focus()
  genWords()
}

// Set Options (Add 3 Seconds For The First Word)

document.addEventListener('click', (e) => {
  if (e.target.className == 'start') {
    timeLeftSpan.innerHTML = 6
  } else {
    timeLeftSpan.innerHTML = defaultLvlsSeconds
  }
})


function genWords() {


  let randomWord = words[Math.floor(Math.random() * words.length)]
  // console.log(randomWord)

  // IndexOf Random Word
  let indexOfRandomWord = words.indexOf(randomWord)
  words.splice(indexOfRandomWord, 1)
  // console.log(words)
  theWord.innerHTML = randomWord

  upcomingWord.innerHTML = ''


  for (let i = 0; i < words.length; i++) {

    let div = document.createElement('div')
    let txt = document.createTextNode(words[i])
    div.appendChild(txt)

    upcomingWord.appendChild(div)
  }

  startGame()
}

function startGame() {
  timeLeftSpan.innerHTML = defaultLvlsSeconds
  let start = setInterval(() => {

    timeLeftSpan.innerHTML--

    if (timeLeftSpan.innerHTML === '0') {
      clearInterval(start)

      if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()) {
        input.value = ''

        scoreGot.innerHTML++

        if (words.length > 0) {
          genWords()
        } else {
          let span = document.createElement('span')
          let spanText = document.createTextNode('Congratz')
          span.className = 'good'
          span.appendChild(spanText)
          finish.appendChild(span)
          upcomingWord.remove()
        }
      } else {
        let span = document.createElement('span')
        span.className = 'bad'

        let spanText = document.createTextNode('Game Over')

        span.appendChild(spanText)
        finish.appendChild(span)

      }
    }
  }, 1000)
}