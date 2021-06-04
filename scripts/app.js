function init() {
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = [] // empty array - so you can keep track of them as can't select from html - need to store them

// ! ----Characters in the game --------------
  const startingGretaPosition = 94 
  let currentGretaPosition = 94 
  const gretaClass = 'greta'
  const startingGiantPosition = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39] 
  let currentGiantPosition = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39] 
  const giantClass = 'giant'
  let giantDirection = 'right' // variable to keep track of what direction the giants are travelling in, starting with right
  const giantsHitEdge = [80,81,82,83,84,85,86,87,88,89]
  const moveRight = true
  const startingTreePosition = currentGretaPosition
  let currentTreePosition
  const treeClass = 'trees'
  const oilClass = 'oil'
  // let updatedGiantPosition = []
  
  // !updating sessions
  const startButton = document.querySelector('#start-button')
  const scoreDisplay = document.querySelector('#score-display')
  const livesDisplay = document.querySelector('#lives-display') 

// ! Timers/Lives/Scores ----------------------------
  let treesTimer
  let oilTimer
  let giantTimer // variable to keep track of the timer id for the giants, can use this to clear the interval when its game over
  let lives = 3  
  let score = 0 

  //! Make the grid ---------------------
  function createGrid(startingGretaPosition) {
    for (let i = 0; i < cellCount; i++) { // keep going as long as i is less than the cell count
      const cell = document.createElement('div')// created a div - similar to query selector 
      cell.id = i // this will help to remove the id
      grid.appendChild(cell)// passed in cell element newly created - all divs are now children
      cells.push(cell)
    }
    addGreta(startingGretaPosition)// leave this here 
    addGiants(startingGiantPosition)
  }
  
//! Add characters to the page -------------
  function addGreta(position){
    cells[position].classList.add('greta')
  }
  function addTree(position){
    cells[position].classList.add('trees')
  }
  function addOil(position){
    // console.log(cells[position], position)
    cells[position].classList.add('oil')
  } 
  function addGiants(positions) {
    positions.forEach(position => {
      cells[position].classList.add('giant')
    })
  }

//! Remove characters from the page ---------

  function removeGreta(position) {
    cells[position].classList.remove('greta')
  }

  function removeTrees(position){
    cells[position].classList.remove('trees')
  }

  function removeOil(position){
    console.log(cells[position],position)
    cells[position].classList.remove('oil')
  } 

  function removeGiants(positions) {// this would remove all giants so this needs changing 
    positions.forEach(position => {
      cells[position].classList.remove('giant')
    })
  }

// ! ---------------------  Get greta to move left & right with arrows ------------
  function moveGreta(event) {
    const key = event.keyCode
    if (key === 32){
      event.preventDefault()
      moveTree() // change to function moving the laser - invoke function here 
    }
    removeGreta(currentGretaPosition)

    if (key === 39 && currentGretaPosition % width !== width - 1) {
      console.log('RIGHT')
      currentGretaPosition++
    } else if (key === 37 && currentGretaPosition % width !== 0) { // making sure this is responding to left - checking if current position of cat is equal to 9  
      console.log('LEFT')
      currentGretaPosition--
    } else {
      console.log('INVALID KEY')
    }
    addGreta(currentGretaPosition)
  }
  document.addEventListener('keyup', moveGreta)  
  createGrid(startingGretaPosition)
  
//! ---------------------------------  Get Giants to move  --------------------------
  function startGame() {
    addGiants(startingGiantPosition)
    moveGiants()
    oilDripping()
  }

  function restartGame (){
    console.log('game restarted')
    removeGiants(currentGiantPosition)
    addGiants(startingGiantPosition)
    removeGreta(currentGretaPosition)
    addGreta(startingGretaPosition)
    clearInterval(giantTimer)
    clearInterval(oilTimer)
    startGame()
  }

  function stopGame(){
    console.log('stop the game')
    removeGiants()
    removeGreta()
    removeOil()
    removeTrees()
    clearInterval(giantTimer)
    clearInterval(oilTimer)
    cells.forEach(cell => cell.classList.remove('tree')
    // show a game over sign 
    // const gameover = document.createElement("image")
    // img.src = url 'image.png'
    // look at sames lecture 
    )
  }

  function moveGiants() {
    giantTimer = setInterval(() => {// call the function once and it will trigger the interval once (just in case we need to add more logic before or after)
      removeGiants(currentGiantPosition)
      const giantsOnRightEdge = currentGiantPosition.some(giant => giant % width === 9)
      const giantsOnLeftEdge = currentGiantPosition.some(giant => giant % width === 0)
      const giantsOnBottomEdge = currentGiantPosition.some(giant => giantsHitEdge.includes(giant))
      // console.log('giants have hit-->',giantsOnBottomEdge)
      if (giantsOnBottomEdge) {
        restartGame()
        lives -= 1
        livesDisplay.innerText = lives
        return 
      }
      if (giantDirection === 'right') {
        if (giantsOnRightEdge) {
          currentGiantPosition = currentGiantPosition.map(giant => giant + width)
          giantDirection = 'left'
        } else { // if they're not on the edge then move them right as normal
          currentGiantPosition = currentGiantPosition.map(giant => giant + 1)
        }
      } else if (giantDirection === 'left') {
        if (giantsOnLeftEdge) {
          currentGiantPosition = currentGiantPosition.map(giant => giant + width)
          giantDirection = 'right'
        } else {
          currentGiantPosition = currentGiantPosition.map(giant => giant - 1)
        }
      } else if (cells[currentGiantPosition].classList.contains('greta')) {
        console.log('checking life')
        if (lives <= 1){
          console.log('game over')
          stopGame()
          return clearInterval(giantTimer)
        } else if (lives >= 1){
          lives -= 1
          livesDisplay.innerText = lives
          console.log('lost a life--->')
          restartGame()
          return clearInterval(giantTimer)
        }
      }
      addGiants(currentGiantPosition)
    },1500)
  }
//! ------------------ Lasers shooting -------------------
  function moveTree() {
    // console.log('current location of tree ---->',startingTreePosition)
    currentTreePosition = currentGretaPosition - width
    addTree(currentTreePosition)
    treesTimer = setInterval(() => {
      if (cells[currentTreePosition].classList.contains('giant')) {
        removeTrees(currentTreePosition)
        score += 100 
        scoreDisplay.innerText = score
        console.log('collision')
        cells[currentTreePosition].classList.remove('giant')
        currentGiantPosition = currentGiantPosition.filter(giantPosition => giantPosition !== currentTreePosition)//for some reason now multiple giants are disappearing
        
        return clearInterval(treesTimer)
      } else if (currentTreePosition - width < 0) {
        removeTrees(currentTreePosition)
        return clearInterval(treesTimer)
      }
      removeTrees(currentTreePosition)
      currentTreePosition -= width // find the new div
      addTree(currentTreePosition)// add the tree again
    }, 500)
  }

//! ------------------ Giants shooting -------------------

// ---------------coding area ----------------
// create a new function 
  function oilDripping() {
    const randomNumber = Math.floor(Math.random() * currentGiantPosition.length)// generate a random number based on how many giants there are
    const giantToDropOil = currentGiantPosition[randomNumber] // use the random number to find giant position at that index in the array
    const oilStartPosition = giantToDropOil + width // set start of the oil to be 1 cell below the giant
    let currentOilPosition = oilStartPosition // make sure current position is same as start position
    if (cells[oilStartPosition].classList.contains('giant' ) && oilStartPosition < 50 ) { // if the cell it finds has a class of giant (which means its not on the bottom row), run the function again to find a new position
      return oilDripping()
    }
    addOil(oilStartPosition) // add oil at the starting position
    oilTimer = setInterval(() => {
      if (currentOilPosition + width > 99 ) { // if it hits the bottom stop the timer and generate more oil
        clearInterval(oilTimer)
        oilDripping()
        removeOil(currentOilPosition)
      } else {
        removeOil(currentOilPosition) // remove the oil
        currentOilPosition += width // redefine the new position
        addOil(currentOilPosition)
      }
      if (cells[currentOilPosition].classList.contains('greta')) {
        if (lives <= 1){
          console.log('Game Over')
          stopGame()
        } else {
          lives -= 1
          livesDisplay.innerText = lives
          console.log('lost a life')
          removeOil(currentOilPosition)
          removeTrees(currentTreePosition)
          restartGame()
        }
      }
    }, 1000)
  }

  startButton.addEventListener('click',startGame)

}

window.addEventListener('DOMContentLoaded', init)