//* BATTLESHIP
//* ==========
window.addEventListener("DOMContentLoaded", (event) => {
  // Integer Variables
  const gridWidth = 5;
  const totalGridSize = gridWidth * gridWidth;
  const shipCount = 3;
  let playerShip = 3;
  let cpuShip = 3;
  let playerScore = 0;
  let cpuScore = 0;

  // Array Variables
  const userArray = [];
  const cpuArray = [];

  //? ============================================================================================
  // const userBoard = [
  //     [0, 1, 2, 3, 4],
  //     [5, 6, 7, 8, 9],
  //     [10, 11, 12, 13, 14],
  //     [15, 16, 17, 18, 19],
  //     [20, 21, 22, 23, 24],
  // ]

  //? ARRAYS FOR REFERENCE ONLY. DO NOT UNCOMMENT.

  // const cpuBoard = [
  //     [25, 26, 27, 28, 29,
  //     30, 31, 32, 33, 34,
  //     35, 36, 37, 38, 39,
  //     40, 41, 42, 43, 44,
  //     45, 46, 47, 48, 49,
  // ]
  //? ============================================================================================

  //DOM Variables
  const userGrid = document.querySelector(".grid-user");
  const cpuGrid = document.querySelector(".grid-computer");
  const ships = document.querySelectorAll(".ship");
  const turnDisplay = document.getElementById("whose-turn");
  const infoDisplay = document.getElementById("info-display");
  const startButton = document.querySelector("#start");
  const playerScoreText = document.getElementById("playerScore");
  const cpuScoreText = document.getElementById("oppoScore");

  //? ============================================================================================

  //Game Variables
  let isGameOver = false;
  let currentPlayer = "player";
  const playerText = "PLAYER Turn. Select A Square On Your Opponents Board!";
  const cpuText = "CPU Turn";

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // Create Boards

  //* Player Board
  function createUserBoard(userGrid, square, width) {
    for (let i = 0; i < width * width; i++) {
      const userCell = document.createElement("div");
      userCell.setAttribute("class", "emptyPlayerCell");
      userCell.setAttribute("id", i);
      userGrid.appendChild(userCell);
      square.push(userCell);
      userCell.addEventListener("click", changePlayerColorOnClick);
    }
  }
  function changePlayerColorOnClick(event) {
    event.target.style.backgroundColor = "red";
  }

  createUserBoard(userGrid, userArray, gridWidth);

  console.log("user board created");

  // ============================================================================================

  //* CPU Board
  function createCpuBoard(cpuGrid, square, width) {
    for (let i = 0; i < width * width; i++) {
      const cpuCell = document.createElement("div");
      cpuCell.setAttribute("class", "emptyCpuCell");
      cpuCell.setAttribute("id", i + totalGridSize);
      cpuGrid.appendChild(cpuCell);
      square.push(cpuCell);
      cpuCell.addEventListener("click", changeCpuColorOnClick);
      // cpuCell.addEventListener("click", printMissOrHit);
      // console.log(cpuCell);
    }
  }
  // Add change color on click to created element
  function changeCpuColorOnClick(event) {
    event.target.style.backgroundColor = "red";
  }

  createCpuBoard(cpuGrid, cpuArray, gridWidth);

  console.log("cpu board created");

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // Selects random starting square for ships and render ships on grid

  // Takes the random number from below, creates and appends a div to a div with that number as and id
  function shipPlayerImg1(placeHolder1) {
    const grabCell1 = document.getElementById(`${placeHolder1.id}`);
    let createCell1 = document.createElement("div");

    createCell1.setAttribute("id", "Ship1");
    grabCell1.appendChild(createCell1);
  }

  // Select random number from 0-24
  const element1 = userArray[Math.floor(Math.random() * userArray.length)];

  function createPlayerShip1() {
    shipPlayerImg1(element1);
  }
  console.log(element1.id);
  console.log("ship1 ok");
  // ============================================================================================

  // Repeat of above
  function shipPlayerImg2(placeHolder2) {
    let grabCell2 = document.getElementById(`${placeHolder2.id}`);
    let createCell2 = document.createElement("div");
    
    createCell2.setAttribute("id", "Ship2");
    grabCell2.appendChild(createCell2);
  }

  let element2 = userArray[Math.floor(Math.random() * userArray.length)];

  function createPlayerShip2() {
    shipPlayerImg2(element2);
  }
  while (element1.id === element2.id) {
    element2 = userArray[Math.floor(Math.random() * userArray.length)];
  }
  console.log(element2.id)
  console.log("ship2 ok")
  // ============================================================================================

  // Repeat of above
  function shipPlayerImg3(placeHolder3) {
    let grabCell3 = document.getElementById(`${placeHolder3.id}`);
    let createCell3 = document.createElement("div");
    
    createCell3.setAttribute("id", "Ship3");
    grabCell3.appendChild(createCell3);
  }

  let element3 = userArray[Math.floor(Math.random() * userArray.length)];

  function createPlayerShip3() {
    shipPlayerImg3(element3);
    while (element3.id === element1.id || element3.id === element2.id) {
      element3 = userArray[Math.floor(Math.random() * userArray.length)];
    }
  }

  console.log(element3.id);
  console.log("PLAYER ships generated");

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // Takes the random number from below, creates and appends a div to the parent div with that number as an id to make cpu ships

  function shipCpuImg1(placeHolder4) {
    const grabCell1 = document.getElementById(`${placeHolder4.id}`);
    let createCell1 = document.createElement("div");

    createCell1.setAttribute("id", "Ship4");
    grabCell1.appendChild(createCell1);
  }

  // Select random number from 25-49
  function createCpuShip1(arr) {
    const element4 = arr[Math.floor(Math.random() * arr.length)];
    shipCpuImg1(element4);
  }

  // ============================================================================================

  function shipCpuImg2(placeHolder5) {
    let grabCell2 = document.getElementById(`${placeHolder5.id}`);
    let createCell2 = document.createElement("div");
    createCell2.setAttribute("id", "Ship5");
    grabCell2.appendChild(createCell2);
  }

  function createCpuShip2(arr) {
    const element5 = arr[Math.floor(Math.random() * arr.length)];
    shipCpuImg2(element5);
  }

  // ============================================================================================

  function shipCpuImg3(placeHolder6) {
    let grabCell3 = document.getElementById(`${placeHolder6.id}`);
    let createCell3 = document.createElement("div");
    createCell3.setAttribute("id", "Ship6");
    grabCell3.appendChild(createCell3);
  }

  function createCpuShip3(arr) {
    const element6 = arr[Math.floor(Math.random() * arr.length)];
    shipCpuImg3(element6);
  }

  console.log("CPU ships generated");

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // START GAME

  startButton.addEventListener("click", () => {
    createPlayerShip1();
    createPlayerShip2();
    createPlayerShip3();
    createCpuShip1(cpuArray);
    createCpuShip2(cpuArray);
    createCpuShip3(cpuArray);
    turnDisplay.innerHTML = `${playerText}`;
  });

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // Game Logic

  // Logic for Player Turn
  function playerTurn(event) {
    if (currentPlayer === "player") {
      turnDisplay.innerHTML = `${playerText}`;
    }
    console.log(event.target.id);
    if (
      event.target.id === "Ship4" ||
      event.target.id === "Ship5" ||
      event.target.id === "Ship6"
    ) {
      infoDisplay.innerHTML = "You sank a ship!";
      playerScore++;
      playerScoreText.innerHTML = `${playerScore}`;
    } else infoDisplay.innerHTML = "YOU MISSED!";
    if (playerScore === 3) {
      isGameOver = true;
      if (isGameOver) {
        turnDisplay.innerHTML = "YOU WON!";
      }
      return;
    } else {
      turnDisplay.innerHTML = "CPU Turn!";
    }
  }

  // Logic For CPU Turn
  function cpuTurn(event) {
    if (currentPlayer === "player") {
      turnDisplay.innerHTML = `${playerText}`;
    }
    console.log(event.target.id);
    if (
      event.target.id === "Ship1" ||
      event.target.id === "Ship2" ||
      event.target.id === "Ship3"
    ) {
      infoDisplay.innerHTML = "Your ship was destroyed!";
      cpuScore++;
      cpuScoreText.innerHTML = `${cpuScore}`;
    } else infoDisplay.innerHTML = "CPU MISSED!";
    if (cpuScore === 3) {
      isGameOver = true;
      if (isGameOver) {
        turnDisplay.innerHTML = "CPU WON!";
      }
      return;
    } else {
      turnDisplay.innerHTML = "PLAYER Turn!";
    }
  }

  document.getElementById("grid1").addEventListener("click", playerTurn);

  document.getElementById("grid0").addEventListener("click", cpuTurn);

  console.log(currentPlayer === "player");
  // function printMissOrHit() {
  //   turnDisplay.innerHTML = "YOU MIISED!";
  // }
});

/* 
  

  add event listener click to entire #grid-computer
  change color on click


  playerTurn
  currentPlayer = 'player'
  id = 'whose turn' to display "player turn"
  cpugrid to listen for event 'click'
  if 'click' is on non ship cells, print 'miss' in cells and change colour
  else click is on ship cells, print 'hit' in cells and change colour
  => reduce cpuShips by 1
  check if cpuShip === 0
  if true, isGameOver = true 
  endGame 
  else cpuTurn


  

  cpuTurn
  currentPlayer = 'cpu'
  id = 'whose turn' to display "cpu turn"
  generate an index within playerArray
  if index === id of cell containing ship1 || index === id ship2 || index === id ship3
  => print 'hit' on cell and cahnge color
  => reduce playerShips by 1
  check if playerShip === 0
  if true, isGameOver = true
  endGame
  else playerTurn

  endGame
  if playerShip === 0
  id = 'whose turn' to display "Cpu wins"
  else id = 'whose turn' to display "You win"
  text to be big and with color
  
  
  
  
  
  
  

  this creates info on click
  
  
  
  
  
  
  
  
  
  
  
  
  function playGame() {
    if (isGameOver) return;
    if (currentPlayer === "user") {
      turnDisplay.innerHTML = "Your Turn";
      cpuArray.forEach((square) =>
        square.addEventListener("click", function (e) {
          reveal_square(square);
        })
      );
    }

    if (currentPlayer === "CPU") {
      turnDisplay.innerHTML = "CPU Turn";
      setTimeout(computerGo, 1000);
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  */

// startButton.addEventListener("click", playGame);

// let playerShipRemaining = 0;

// function reveal_square(square) {
//   if (square.classList.contains("Destroyer")) playerShipRemaining++;

//   if (square.classList.contains("taken")) {
//     square.classList.add("boom");
//   } else {
//     square.classList.add("miss");
//   }
//   currentPlayer = "CPU";
//   playGame();
// }

// let cpuShipRemaining = 0;

// function computerGo() {
//   let randomCell = Math.floor(Math.random() * userArray.length);
//   if (!userArray[randomCell].classList.contains("hit")) {
//     if (square.classList.contains("ship")) cpuShipRemaining++;
//   } else computerGo();
//   currentPlayer = "user";
//   turnDisplay = "Your Turn";
// }

// function shipImg() {
//   const cat1 = document.getElementById(`${element1}`)
//   const cat2 = document.createElement("div")
//   cat2.setAttribute("id", `${element1}`);
//   cat1.appendChild(cat2)
// userArray.push(cat2);

// shipImg()

// function createUserBoard(userGrid, square, width) {
//   for (let i = 0; i < width * width; i++) {
//     const inSquare = document.createElement("div");
//     inSquare.setAttribute("id", i);
//     userGrid.appendChild(inSquare);
//     square.push(inSquare);
//     console.log("user board created");
//   }
// }

// Selects random starting square for CPU ships

// function generateCpu(ship) {
//   const generateDirection = Math.floor(
//     Math.random() * ship.orientation.length
//   );
//   const resultantDirection = ship.orientation[generateDirection];

//   if (generateDirection === 0) direction = 1;
//   if (generateDirection === 1) direction = 5;

//   const randomStart = Math.floor(
//     Math.random() * cpuArray.length - ship.orientation[0].length * direction
//   );

//* Exclude problematic squares
// const isOccupied = resultantDirection.some((index) =>
//       cpuGrid[randomStart + index].classList.contains("Occupied")
//     );
//     const isRightmost = resultantDirection.some(
//       (index) => (randomStart + index) % gridWidth === gridWidth - 1
//     );
//     const isLeftmost = resultantDirection.some(
//       (index) => (randomStart + index) % gridWidth === 0
//     );

//     if (!isOccupied && !isRightmost && !isLeftmost)
//       resultantDirection.forEach((index) =>
//         cpuGrid[randomStart + index].classList.add("taken", ship.name)
//       );

// else generate(ship);

// generateCpu(shipArray);

// const shipArray =
//     {
//       name: "DD",
//       orientation: [
//         [0, 1],
//         [0, 5],
//       ],
//     };

//     const cpuArray = [];

// function generateDir(shipArray) {
//   const generateDirection = Math.floor(Math.random() * shipArray.orientation.length)
//   const resultantDirection = shipArray.orientation[generateDirection]

//   // if (generateDirection === 0) {directions = 1};
//   // if (generateDirection === 1) {directions = 5};
//   let randomStart = Math.floor(Math.random() * cpuArray.length)
//   console.log(resultantDirection)

// }

// generateDir(shipArray)

// const shipArray =
//   {
//     name: "DD",
//     orientation: [
//       [0, 1],
//       [0, 5],
//     ],
//   };

// let randomDirection = Math.floor(Math.random() * shipArray.orientation.length);
// let finalDireaction = shipArray.orientation[randomDirection]

// console.log(randomDirection)

// const playerBoard = {
//   A: [1, 2, 3, 4, 5],
//   B: [6, 7, 8, 9, 10],
//   C: [11, 12, 13, 14, 15],
//   D: [16, 17, 18, 19, 20],
//   E: [21, 22, 23, 24, 25],
// }

// console.log(playerBoard.C[2])

// const cpuBoard = {
//     F: [26, 27, 28, 29, 30],
//     G: [31, 32, 33, 34, 35],
//     H: [36, 37, 38, 39, 40],
//     I: [41, 42, 43, 44, 45],
//     J: [46, 47, 48, 49, 50],
// }

// const cpuBoard = [
//     [26, 27, 28, 29, 30],
//     [31, 32, 33, 34, 35],
//     [36, 37, 38, 39, 40],
//     [41, 42, 43, 44, 45],
//     [46, 47, 48, 49, 50],
// ]

// function random_item(items1)
//     {
//   return items[Math.floor(Math.random()*items1.length)];

// }

// console.log(random_item(cpuBoard));

// const cpuBoard = [
//     [[-1, 2], [-1, 2], [0, 2], [1, 2], [2, 2]],
//     [[-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1]],
//     [[-2, 0] [-1, 0] [0, 0] [1, 0] [2, 0]],
//     [[-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1]],
//     [[-2, -2], [-2, -1], [0, -2], [1, -2], [2, -2]]
// ]

// const playerBoard = {
//     A: [1, 2, 3, 4, 5],
//     B: [1, 2, 3, 4, 5],
//     C: [1, 2, 3, 4, 5],
//     D: [1, 2, 3, 4, 5],
//     E: [1, 2, 3, 4, 5],
//   }

//   const board = [
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//   ];

//   const board = [
//     [1, 2, 3, 4, 5],
//     [1, 2, 3, 4, 5],
//     [1, 2, 3, 4, 5],
//     [1, 2, 3, 4, 5],
//     [1, 2, 3, 4, 5],
//   ];

// const x = [1, 2, 3, 4, 5]

//   function random_item(x)
//   {
// return x[Math.floor(Math.random()*x.length)];
//   }

// const y = (arr) => {
//     return (arr[Math.floor(Math.random()*arr.length)])
// }

// console.log(y(x)
