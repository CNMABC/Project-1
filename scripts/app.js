function init() {
  console.log('js up and running')
  
  const grid = document.querySelector('.grid')
  console.log('grid', grid)
  
  const width = 10
  console.log('width',width)
  const cellCount = width * width
  console.log('cellcount',cellCount)
  const cells = [] // empty array - so you can keep track of them as can't select from html - need to store them

// ! ----Characters in the game -----------------------------------------
  const startingGretaPosition = 94 
  console.log(startingGretaPosition)
  let currentGretaPosition = 0 
  console.log(currentGretaPosition)
  const gretaClass = 'greta'
  console.log(gretaClass)

  const numberOfGiants = 25
  // console.log('numberOfGiants--->',numberOfGiants)
  const startingGiantPosition = [1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28,31,32,33,34,35,36,37,38,41,42,43,44,45,46,47,48] 
  // console.log(startingGiantPosition)
  let currentGiantPosition = [12,13,14,15,16,17,22,23,24,25,26,27,32,33,34,35,36,37,42,43,44,45,46,47] 
  // console.log(currentGiantPosition)
  const giantsClass = 'giant'
  // console.log(giantsClass)

  const startingTreePosition = 84 
  console.log(startingTreePosition)
  let currentTreePosition = 0  
  console.log(currentTreePosition)
  const treesClass = 'trees'
  console.log(treesClass)

  const startingOilPosition = 55 
  console.log(startingOilPosition)
  let currentOilPosition = 0 
  console.log(currentOilPosition)
  const oilClass = 'oil'
  console.log(oilClass)
  // ! Creating multiple giants --------
  

  // !updating sessions
  const startButton = document.querySelector('#start-button') 
  console.log(startButton)
  // get the start button
  const scoreDisplay = document.querySelector('#score-display') // get the score span
  console.log(scoreDisplay)
  const livesDisplay = document.querySelector('#lives-display') // get the lives span
  console.log(livesDisplay)

// ! Timers ----------------------------
  let gretaTimer // variable to store the timer id
console.log('gretaTimer',gretaTimer)
  let giantsTimer // variable to store the timer id
  console.log('giantsTimer',giantsTimer)
  let treesTimer
  console.log('treesTimer',treesTimer)
  let oilTimer
  console.log('oil-timer-->',oilTimer)

  let livesRemaining = 10  // start lives at 3
  console.log(livesRemaining)
  let score = 0  // start score at 0
  console.log(score)

  //! Make the grid ---------------------
  function createGrid(startingGretaPosition) {
    for (let i = 0; i < cellCount; i++) { // keep going as long as i is less than the cell count
      
      const cell = document.createElement('div')// created a div - similar to query selector 
      console.log(cell)
      cell.innerText = i
      grid.appendChild(cell)// passed in cell element newly created - all divs are now children
      cells.push(cell)
    }
    addGreta(startingGretaPosition)
    addTrees(startingTreePosition)
    addOil(startingOilPosition)
    addGiants(startingGiantPosition)
  }
  
  createGrid(startingGretaPosition,)
  
//! Add characters to the page -------------
  function addGreta(position){
    cells[position].classList.add(gretaClass)
  }

  function addTrees(position){
    cells[position].classList.add(treesClass)
  }
  function addOil(position){
    cells[position].classList.add(oilClass)
  } 

  function addGiants(positions) {
    positions.forEach(position => {
      cells[position].classList.add('giant')
    })
  }

}

window.addEventListener('DOMContentLoaded', init)