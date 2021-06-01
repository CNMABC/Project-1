
//Space invaders
// Grid : Create a grid for the invasion game 

//? Characters 
// Main player spaceship --- create - Java?
// spaceship can only go from left to right 
// create variable for it in JS
// decide the gif for the spaceship

// Moving Aliens : create the block rows of aliens 
// Create X amount of aliens in a block (? x ?)
// Decide picture for the aliens
// on a timer they move down by one row every X seconds
// they shoot 
// create a variable for it in JS

//? Story of Game invaders
// press start button to go 
// button pressed - game begins -----------> 
// spaceship is present on the grid & aliens 
// listens for direction from keys whether to move left or right 
// space bar or up arrow enables ship to shoot
// aliens start moving from left to right 
// if spaceship shooting  === alien - alien closest to spaceship is removed from that column (how?)
// if no alien left in column = null (nothing happens) 
// spaceship shoot in straight direction '(-)up' at the spaceship (directed by keys)
// random aliens shoot in straight direction '(+)down' at the spaceship (time intervals)
// if alien shooting === spaceship - restart game 
// Enable game to re-start 10 times before game over 
// pop-up with message "Game Over!" 
// every X seconds alien block moves down by 1 row on the grid
// if alien block === alien row = restart the game 
// at end of game players score is displayed 
// ---- make mobile responsive 


//? Styling : 
// ---- Create styling/image for the background colour
// ---- Choose font type for the game
// ---- Create heading for title 

// !----------------------------

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
  const startingGiantPosition = [2,3,4,5,6,7,12,13,14,15,16,17,22,23,24,25,26,27,32,33,34,35,36,37] 
  let currentGiantPosition = [2,3,4,5,6,7,12,13,14,15,16,17,22,23,24,25,26,27,32,33,34,35,36,37] 
  const giantClass = 'giant'
  let giantDirection = 'right' // variable to keep track of what direction the giants are travelling in, starting with right
   // variable to keep track of the timer id for the giants, can use this to clear the interval when its game over
  const startingTreePosition = currentGretaPosition 
  console.log('starting tree position',startingTreePosition)
  const treesClass = 'trees'
  const startingOilPosition = 55 
  const currentOilPosition = 55 
  const oilClass = 'oil'
  // !updating sessions
  const startButton = document.querySelector('#start-button')
  const scoreDisplay = document.querySelector('#score-display')
  const livesDisplay = document.querySelector('#lives-display') 
  // ! Timers ----------------------------
  let giantTimer
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
    // addGreta(startingGretaPosition)// leave this here 
    // addTrees(startingTreePosition)
    // addOil(startingOilPosition)
    // addGiants(startingGiantPosition)
  }
  //! Add characters to the page -------------
  function addGreta(position){
    cells[position].classList.add('greta')
  }
  function addTrees(position){
    cells[position].classList.add('tress')
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
  // ! ----------------Get greta to move left & right with arrows----------------
  function moveGreta(event) {
    // console.log('current location of greta',currentGretaPosition)
    const key = event.keyCode
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

  //! ----------------------Get Giants to move ----------------
  function startGame() {
    addGiants(startingGiantPosition)
    moveGiants() // call the moveGiants function when the start button is clicked
  }
  function moveGiants() {
    giantTimer = setInterval(() => { // set interval so this functionality runs every 1.5s to move the giants
      // remove giants from their current positions
      removeGiants(currentGiantPosition)
      // check if the giants are on the right edge, value of variable will be true or false
      // this is checking if the any of the giants positions divided by width leaves a remainder of 9, if its true then we've hit the edge
      const giantsOnRightEdge = currentGiantPosition.some(giant => giant % width === 9)
      // check if the giants are on the left edge, same as above but for the opposite edge
      const giantsOnLeftEdge = currentGiantPosition.some(giant => giant % width === 0)
      if (giantDirection === 'right') { // check direction giants are moving
        if (giantsOnRightEdge) { // if the are on the edge, move them down using + width and change their direction to left
          currentGiantPosition = currentGiantPosition.map(giant => giant + width)
          giantDirection = 'left'
        } else { // if they're not on the edge then move them right as normal
          currentGiantPosition = currentGiantPosition.map(giant => giant + 1)
        }
      } else if (giantDirection === 'left') { // check if the giants are moving left
        if (giantsOnLeftEdge) { // if they are on the left edge then move them down and change the direction to right
          currentGiantPosition = currentGiantPosition.map(giant => giant + width)
          giantDirection = 'right'
        } else { // if they're not on the left edge, keep moving them left as normal
          currentGiantPosition = currentGiantPosition.map(giant => giant - 1)
        }
      }
      // add them back at their new position
      addGiants(currentGiantPosition)
    }, 1500)
  }
  // ? to get the laser working
  // variable for laserPosition, this should start equal to greta position so its always where she is on the page
  // function to add the laser
  // function to remove the laser
  // function to move the laser
  // inside the move laser function add an interval
  // inside the interval you want to remove the laser
  // then redefine the position of the laser, minusing width each time so it moves up
  // add the laser back at the new position
  // invoke this function on whatever key you want, add a key event listener and that should call the moveLaser function
  // add in a condition to stop the timer if the laser goes off the top of the grid, think about the condition you can use from the cat game to check this
  // next add a check inside moveLaser to check if there has been a collision, does the div with the class of laser also have a class of giant?
  // if there is a collision, remove that index from the currentGiantPosition array so the giant is dead and wont come back
  // the last step above can be broken down further so just take it step by step
  // for the giants you will also want a check at some point to stop them going off the bottom of the grid, similar logic to checking if they are on the edge
  

  startButton.addEventListener('click', startGame)
}
window.addEventListener('DOMContentLoaded', init)