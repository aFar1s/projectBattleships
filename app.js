//* BATTLESHIP
//* ==========
window.addEventListener("DOMContentLoaded", (event) => {
  // Integer Variables
  const gridWidth = 5;
  const totalGridSize = gridWidth * gridWidth;
  const shipCount = 3;
  let playerShip = 3;
  let cpuShip = 3;
  let player1Score = 0;
  let player2Score = 0;

  // Array Variables
  const userArray = [];
  const cpuArray = [];
  const shipArray = [];

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
  let currentPlayer = "player1";
  const player1Text = "PLAYER 1 Turn. Select A Square On Player 2 Board!";
  const player2Text = "PLAYER 2 Turn. Select A Square On Player 1 Board!";

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
      userCell.addEventListener("click", changePlayerColorOnClick, true);
    }
  }
  function changePlayerColorOnClick(event) {
    event.target.style.backgroundColor = "red";
    event.target.style.zIndex = "(1)";
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
      cpuCell.addEventListener("click", changeCpuColorOnClick, true);
      console.log(cpuCell);
    }
  }

  createCpuBoard(cpuGrid, cpuArray, gridWidth);

  console.log("cpu board created");

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // Selects random starting square for ships and render ships on grid

  // Takes the random number from below, creates and appends a div to a div with that number as and id
  // GENERATE SHIP 1
  function shipPlayerImg1(placeHolder1) {
    const grabCell1 = document.getElementById(`${placeHolder1.id}`);
    let createCell1 = document.createElement("div");

    createCell1.setAttribute("id", "Ship1");
    createCell1.setAttribute("class", "shipActual");
    grabCell1.appendChild(createCell1);

    shipArray.push(createCell1);
  }
  // Select random number from 0-24
  const element1 = userArray[Math.floor(Math.random() * userArray.length)];

  function createPlayerShip1() {
    shipPlayerImg1(element1);
  }
  console.log(`ship1 ok ` + `${element1.id}`);
  // ============================================================================================

  // GENERATE SHIP 2
  function shipPlayerImg2(placeHolder2) {
    let grabCell2 = document.getElementById(`${placeHolder2.id}`);
    let createCell2 = document.createElement("div");

    createCell2.setAttribute("id", "Ship2");
    createCell2.setAttribute("class", "shipActual");
    grabCell2.appendChild(createCell2);

    shipArray.push(createCell2);
  }

  let element2 = userArray[Math.floor(Math.random() * userArray.length)];

  function createPlayerShip2() {
    while (element1.id === element2.id) {
      element2 = userArray[Math.floor(Math.random() * userArray.length)];
    }
    shipPlayerImg2(element2);
  }
  console.log(`ship2 ok ` + `${element2.id}`);
  // ============================================================================================

  // GENERATE SHIP 3
  function shipPlayerImg3(placeHolder3) {
    let grabCell3 = document.getElementById(`${placeHolder3.id}`);
    let createCell3 = document.createElement("div");

    createCell3.setAttribute("id", "Ship3");
    createCell3.setAttribute("class", "shipActual");
    grabCell3.appendChild(createCell3);

    shipArray.push(createCell3);
  }

  let element3 = userArray[Math.floor(Math.random() * userArray.length)];

  function createPlayerShip3() {
    while (element3.id === element1.id || element3.id === element2.id) {
      element3 = userArray[Math.floor(Math.random() * userArray.length)];
    }
    shipPlayerImg3(element3);
  }
  console.log(`ship3 ok ` + `${element3.id}`);
  console.log("PLAYER ships generated");

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // GENERATE SHIP 4
  function shipCpuImg1(placeHolder4) {
    const grabCell1 = document.getElementById(`${placeHolder4.id}`);
    let createCell1 = document.createElement("div");

    createCell1.setAttribute("id", "Ship4");
    createCell1.setAttribute("class", "shipActual");
    grabCell1.appendChild(createCell1);

    shipArray.push(createCell1);
  }

  // Select random number from 25-49
  const element4 = cpuArray[Math.floor(Math.random() * cpuArray.length)];

  function createCpuShip1() {
    shipCpuImg1(element4);
  }
  console.log(`ship4 ok ` + `${element4.id}`);
  // ============================================================================================

  // GENERATE SHIP 5
  function shipCpuImg2(placeHolder5) {
    let grabCell2 = document.getElementById(`${placeHolder5.id}`);
    let createCell2 = document.createElement("div");

    createCell2.setAttribute("id", "Ship5");
    createCell2.setAttribute("class", "shipActual");
    grabCell2.appendChild(createCell2);

    shipArray.push(createCell2);
  }

  let element5 = cpuArray[Math.floor(Math.random() * cpuArray.length)];

  function createCpuShip2() {
    while (element5.id === element4.id) {
      element5 = cpuArray[Math.floor(Math.random() * cpuArray.length)];
    }
    shipCpuImg2(element5);
  }
  console.log(`ship5 ok ` + `${element5.id}`);
  // ============================================================================================

  // GENERATE SHIP 6
  function shipCpuImg3(placeHolder6) {
    let grabCell3 = document.getElementById(`${placeHolder6.id}`);
    let createCell3 = document.createElement("div");

    createCell3.setAttribute("id", "Ship6");
    createCell3.setAttribute("class", "shipActual");
    grabCell3.appendChild(createCell3);

    shipArray.push(createCell3);
  }

  let element6 = cpuArray[Math.floor(Math.random() * cpuArray.length)];

  function createCpuShip3() {
    while (element6.id === element5.id || element6.id === element4.id) {
      element6 = cpuArray[Math.floor(Math.random() * cpuArray.length)];
    }
    shipCpuImg3(element6);
  }

  console.log(`ship6 ok ` + `${element6.id}`);
  console.log("CPU ships generated");

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // START GAME

  startButton.addEventListener("click", () => {
    createPlayerShip1();
    createPlayerShip2();
    createPlayerShip3();
    createCpuShip1();
    createCpuShip2();
    createCpuShip3();
    turnDisplay.innerHTML = `${player1Text}`;
    console.log(shipArray);

    function changeShipColorOnClick(event) {
      event.target.style.backgroundColor = "green";
      event.target.style.zIndex = "5";
      event.target.style.opacity = "1";
    }

    document
      .getElementById("Ship1")
      .addEventListener("click", changeShipColorOnClick, true);
    document
      .getElementById("Ship2")
      .addEventListener("click", changeShipColorOnClick, true);
    document
      .getElementById("Ship3")
      .addEventListener("click", changeShipColorOnClick, true);
    document
      .getElementById("Ship4")
      .addEventListener("click", changeShipColorOnClick, true);
    document
      .getElementById("Ship5")
      .addEventListener("click", changeShipColorOnClick, true);
    document
      .getElementById("Ship6")
      .addEventListener("click", changeShipColorOnClick, true);
  });

  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================

  // Game Logic

  // Logic for Player 1 Turn
  document.getElementById("grid1").addEventListener("click", playerTurn);

  document.getElementById("grid0").addEventListener("click", cpuTurn);

  function playerTurn(event) {
    if (currentPlayer === "player1") {
      turnDisplay.innerHTML = `${player1Text}`;
    }
    console.log(event.target.id);
    if (
      event.target.id === "Ship4" ||
      event.target.id === "Ship5" ||
      event.target.id === "Ship6"
    ) {
      infoDisplay.innerHTML = "PLAYER 2 ship was destroyed!";
      player1Score++;
      playerScoreText.innerHTML = `${player1Score}`;
    } else infoDisplay.innerHTML = "PLAYER 1 MISSED!";
    if (player1Score === 3) {
      isGameOver = true;
      if (isGameOver) {
        turnDisplay.innerHTML = "PLAYER 1 WON!";
      }
      return;
    } else {
      turnDisplay.innerHTML = "Player 2 Turn!";
      currentPlayer = "player2";
    }
  }

  // Logic For Player 2 Turn
  function cpuTurn(event) {
    if (currentPlayer === "player2") {
      turnDisplay.innerHTML = `${player2Text}`;
    };
    console.log(event.target.id);
    if (
      event.target.id === "Ship1" ||
      event.target.id === "Ship2" ||
      event.target.id === "Ship3"
    ) {
      infoDisplay.innerHTML = "PLAYER 1 ship was destroyed!";
      player2Score++;
      cpuScoreText.innerHTML = `${player2Score}`;
    } else infoDisplay.innerHTML = "Player 2 MISSED!";
    if (player2Score === 3) {
      isGameOver = true;
      if (isGameOver) {
        turnDisplay.innerHTML = "PLAYER 2 WON!";
      }
      return;
    } else {
      turnDisplay.innerHTML = "PLAYER 1 Turn!";
      currentPlayer = "player1";
    }
  }

  //? Color Changes

  // Add change color on click to created element
  function changeCpuColorOnClick(event) {
    event.target.style.backgroundColor = "red";
  }
  //* ============================================================================================
  //* ============================================================================================
  //* ============================================================================================
});
