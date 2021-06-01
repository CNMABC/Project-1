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

  const startingTreePosition = 84 
  let currentTreePosition = 84  
  const treesClass = 'trees'

  const startingOilPosition = 55 
  let currentOilPosition = 55 
  const oilClass = 'oil'


  // !updating sessions
  const startButton = document.querySelector('#start-button')
  const scoreDisplay = document.querySelector('#score-display')
  const livesDisplay = document.querySelector('#lives-display') 

// ! Timers ----------------------------
  let treesTimer
  let oilTimer
  let livesRemaining = 10  
  let score = 0 
  let moveRight = true

  //! Make the grid ---------------------
  function createGrid(startingGretaPosition) {
    for (let i = 0; i < cellCount; i++) { // keep going as long as i is less than the cell count
      
      const cell = document.createElement('div')// created a div - similar to query selector 
      cell.innerText = i
      grid.appendChild(cell)// passed in cell element newly created - all divs are now children
      cells.push(cell)
    }
    addGreta(startingGretaPosition)// leave this here 
    addTrees(startingTreePosition)
    addOil(startingOilPosition)
    addGiants(startingGiantPosition)
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

  function removeGiants(position) {// this would remove all giants so this needs changing 
    cells[position].classList.remove('giant')
  }


// ! Get greta to move left & right with arrows
  function moveGreta(event) {
    console.log('current location of greta',currentGretaPosition)
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
  
//! Get Giants to move 
  function startGame() {
    addGiants(startingGiantPosition)
    console.log(startGame)
}

  // function moveGiants() {
  //   removeGiants(currentGiantPosition)
  //   const giantNewPosition = currentGiantPosition.map(giantItem => {
  //     const right = currentGiantPosition++
  //     return right
  //     if (currentGiantPositions = currentGiantPositions.map(position => position++)){
  //     console.log('changes')
  //     } else if (leftBorder ) { 
  //       const left = currentGiantPosition--
  //       return left 
  //   }
  //   })
// }
//     


//       for (let i = 0; i < currentGiantPosition.length; i ++) {
//         const giantRight = currentGiantPosition[i] ++ 
//       }
//       for (let i = 0; i < currentGiantPosition.length; i ++) {
//       const giantLeft = currentGiantPosition[i] -- 
//       }
//       if (currentGiantPositions = currentGiantPositions.map(position => position++){}

//     })
// }



  // 2. redefine their positions 
  // this is redefining the currentGiantPositions array to be equal to the result of the map
  // the map is looping through the current positions, increasing each index by one
  // and returning a new array of indexes. ++ to move right -- to move left
  // you'll need to also keep track of their direction (in a variable starting as 'right')
  // add an if statement that checks the direction and redefines the indexes based on that
  // currentGiantPositions = currentGiantPositions.map(position => position++)
  // log currentGiantPositions here and see how its changing
  // 3. add them back at their new positions, passing in currentGiantPositions
// }
// // 4. call the moveGiants function on an interval so it happens every 1 second or whatever

removeGiants(currentGiantPosition)
setInterval(moveGiants, 3000)


}

window.addEventListener('DOMContentLoaded', init)