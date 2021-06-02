function init() {
  console.log('js up and running')
  const grid = document.querySelector('.grid')
  const width = 10
  const cellCount = width * width
  const cells = [] // empty array - so you can keep track of them as can't select from html - need to store them

// ! ----Characters in the game -----------------------------------------
  const startingGretaPosition = 94 
  let currentGretaPosition = 94 
  const gretaClass = 'greta'
  const startingGiantPosition = [1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38] 
  let currentGiantPosition = [1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38,] 
  const giantClass = 'giant'
  let giantDirection = 'right' // variable to keep track of what direction the giants are travelling in, starting with right
  let giantTimer // variable to keep track of the timer id for the giants, can use this to clear the interval when its game over
  
  const startingTreePosition = currentGretaPosition
  let currentTreePosition
  console.log('current tree position',currentTreePosition)
  console.log('starting tree position',startingTreePosition)
  const treeClass = 'trees'
  const startingOilPosition = 55 
  let currentOilPosition = 55 
  const oilClass = 'oil'
  const giantsHitEdge = [80,81,82,83,84,85,86,87,88,89]

  // !updating sessions
  const startButton = document.querySelector('#start-button')
  const scoreDisplay = document.querySelector('#score-display')
  const livesDisplay = document.querySelector('#lives-display') 

// ! Timers ----------------------------
  let treesTimer
  let oilTimer
  const livesRemaining = 10  
  const score = 0 
  const moveRight = true

  //! Make the grid ---------------------
  function createGrid(startingGretaPosition) {
    for (let i = 0; i < cellCount; i++) { // keep going as long as i is less than the cell count
      const cell = document.createElement('div')// created a div - similar to query selector 
      cell.innerText = i
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
    cells[position].classList.remove('oil')
  } 

  function removeGiants(positions) {// this would remove all giants so this needs changing 
    positions.forEach(position => {
      cells[position].classList.remove('giant')
    })
  }


// ! -------------------------Get greta to move left & right with arrows ------------
  function moveGreta(event) {
    console.log('current location of greta',currentGretaPosition)
    const key = event.keyCode
    if (key === 32){
      event.preventDefault()
      moveTree() // change to function moving the laser - invoke function here 
    }
    removeGreta(currentGretaPosition)

    if (key === 39 && currentGretaPosition % width !== width - 1) {// if the key is equal to 39 (right arrow)
      console.log('RIGHT')// if right increases by one 
      currentGretaPosition++// move the position of the cat to be one more than it currently is 
    } else if (key === 37 && currentGretaPosition % width !== 0) { // making sure this is responding to left - checking ig current position of cat is equal to 9  
      console.log('LEFT')
      currentGretaPosition--
    } else {
      console.log('INVALID KEY')
    }
    addGreta(currentGretaPosition)
  }

  document.addEventListener('keyup', moveGreta)  
  createGrid(startingGretaPosition)
  
//! -----------------------------------Get Giants to move ----------------------------
  function startGame() {
  addGiants(startingGiantPosition)
  moveGiants()
  // call the function oilDrop to start 
  }

  function moveGiants() {
    giantTimer = setInterval(() => {// call the function once and it will trigger the interval once (just in case we need to add more logic before or after)
      removeGiants(currentGiantPosition)
      const giantsOnRightEdge = currentGiantPosition.some(giant => giant % width === 9)
      const giantsOnLeftEdge = currentGiantPosition.some(giant => giant % width === 0)
      const giantsOnBottomEdge = currentGiantPosition.some(giant => giantsHitEdge.includes(giant))
      console.log('giants have hit-->',giantsOnBottomEdge)
      if (giantsOnBottomEdge) {
        return clearInterval(giantTimer)// don't run anything else in this function (just stop!) 
      // return gameover 
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
      }
      addGiants(currentGiantPosition)
    }, 1500)
  }
// ------------------- coding area -------------------
//! Lasers shooting
// function addTree(position){
//   cells[position].classList.add('trees')
// }

// function removeTrees(position){
//   cells[position].classList.remove('trees')
// }

  function moveTree() {
    console.log('current location of tree ---->',startingTreePosition)
    currentTreePosition = currentGretaPosition - width
    addTree(currentTreePosition)
    treesTimer = setInterval(() => {
      if (currentTreePosition - width < 0) {
        removeTrees(currentTreePosition)
        return clearInterval(treesTimer)// when we want to stop executing
      }
      removeTrees(currentTreePosition)
      currentTreePosition -= width // find the new div
      addTree(currentTreePosition)// add the tree again
    }, 800)
  
  // check if tree has hit a giant if it has - 
  //console.log (inside the if block) a collison and start thinking about other things to do in that situation (if statement - code just written bwill become else if of that statement)
  //stoppping timer
  //removing tree
  // removing giant class and remove it from the array 
  }

  console.log('a tree is being added', addTree)
  console.log('a tree is being removed',removeTrees)








//?-----------------------------------------------

startButton.addEventListener('click',startGame)
}

window.addEventListener('DOMContentLoaded', init)