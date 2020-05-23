document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementsByClassName("grid")[0];
  const squares = grid.getElementsByTagName("div");
  const width = 10;
  const nextWindowWidth = 4;
  let currentPos = 4;
  let currentRotation = 0;
  let gameOn = false;
  const nextGrid = document.getElementById("nextGrid");
  const nextSquares = Array.from(nextGrid.getElementsByTagName("div"));
  let scoreSpan = document.getElementById("score");
  let level = 0;
  let score = 0;

  const tetriminoL = [
    [1-2*width, width+1-2*width, width*2+1-2*width, 2-2*width],
    [width-2*width, 1+width-2*width, 2+width-2*width, 2*width+2-2*width],
    [1-2*width, -width*2 + width+1, -width*2 + width*2+1, -width*2 + width*2],
    [ -width*2 +width, -width*2 + width*2, -width*2 + width*2+1, -width*2 + width*2+2]
  ];

  const nextL = [
    [1, nextWindowWidth + 1, nextWindowWidth * 2 + 1 , 2 ],
    [nextWindowWidth, 1+nextWindowWidth, 2+nextWindowWidth, 2*nextWindowWidth+2],
    [1,  nextWindowWidth+1,  nextWindowWidth*2+1,  nextWindowWidth*2],
    [ nextWindowWidth,  nextWindowWidth*2,  nextWindowWidth*2+1,  nextWindowWidth*2+2]
  ]
  
  const tetriminoT = [
    [1-width, width-width, width+1-width, width+2-width],
    [1-width, width+1-width, width*2+1-width, width + 2-width],
    [width*2+1-width, width-width, width+1-width, width+2-width],
    [1-width, width+1-width, width*2+1-width, width-width],
  ];
  
 
  const nextT = [
    [1, nextWindowWidth, nextWindowWidth+1, nextWindowWidth+2],
    [1, nextWindowWidth+1, nextWindowWidth*2+1, nextWindowWidth + 2],
    [nextWindowWidth*2+1, nextWindowWidth, nextWindowWidth+1, nextWindowWidth+2],
    [1, nextWindowWidth+1, nextWindowWidth*2+1, nextWindowWidth],
  ];
  
  const tetriminoO = [
    [1-width,0-width,width+1-width, width+0-width],
    [1-width,0-width,width+1-width, width+0-width],
    [1-width,0-width,width+1-width, width+0-width],
    [1-width,0-width,width+1-width, width+0-width],
  ];

  const nextO = [
    [1 , 0 , nextWindowWidth + 1 , nextWindowWidth + 0 ],
    [1,0,nextWindowWidth+1, nextWindowWidth+0],
    [1,0-nextWindowWidth,nextWindowWidth+1, nextWindowWidth+0],
    [1,0,nextWindowWidth+1, nextWindowWidth+0],
  ];

  const tetriminoZ = [
    [width+1-width, width+2-width, width*2-width, width*2+1-width], 
    [0-width, width-width, width+1-width, width*2+1-width],
    [width+1-width, width+2-width, width*2-width, width*2+1-width], 
    [0-width, width-width, width+1-width, width*2+1-width],
  ];

  const nextZ = [
    [nextWindowWidth+1, nextWindowWidth+2, nextWindowWidth*2, nextWindowWidth*2+1], 
    [0, nextWindowWidth, nextWindowWidth+1, nextWindowWidth*2+1],
    [nextWindowWidth+1, nextWindowWidth+2, nextWindowWidth*2, nextWindowWidth*2+1], 
    [0, nextWindowWidth, nextWindowWidth+1, nextWindowWidth*2+1],
  ];

  const tetriminoI = [
    [1-3*width, width+1-3*width, width*2+1-3*width, width*3+1-3*width],
    [width-3*width, width+1-3*width, width+2-3*width, width+3-3*width],
    [1-3*width, width+1-3*width, width*2+1-3*width, width*3+1-3*width],
    [width-3*width, width+1-3*width, width+2-3*width, width+3-3*width],
  ];

  const nextI = [
    [1, nextWindowWidth+1, nextWindowWidth*2+1, nextWindowWidth*3+1],
    [nextWindowWidth, nextWindowWidth+1, nextWindowWidth+2, nextWindowWidth+3],
    [1, nextWindowWidth+1, nextWindowWidth*2+1, nextWindowWidth*3+1],
    [nextWindowWidth, nextWindowWidth+1, nextWindowWidth+2, nextWindowWidth+3],
  ];

  const tetriminoJ = [
    [1-2*width, width+1-2*width, width*2+1-2*width, -2*width],
    [width-2*width, 1+width-2*width, 2+width-2*width, 2-2*width],
    [1-2*width, -width*2 + width+1, -width*2 + width*2+1, -width*2 + 2 + width*2],
    [ -width*2 +width, -width*2 + 1, -width*2+2, -width*2]
  ];

 
  const nextJ = [
    [1, nextWindowWidth+1, nextWindowWidth*2+1, 0],
    [nextWindowWidth, 1+nextWindowWidth, 2+nextWindowWidth, 2],
    [1, nextWindowWidth+1,  nextWindowWidth*2+1,  2 + nextWindowWidth*2],
    [ nextWindowWidth, 1, 2, 0]
  ];


  const tetriminoS = [
    [width+1-width, width-width, width*2+2-width, width*2+1-width], 
    [2-width, width+2-width, width+1-width, width*2+1-width],
    [width+1-width, width-width, width*2+2-width, width*2+1-width], 
    [2-width, width+2-width, width+1-width, width*2+1-width],
  ]; 

  const nextS =  [
    [nextWindowWidth+1, nextWindowWidth, nextWindowWidth*2+2, nextWindowWidth*2+1], 
    [2, nextWindowWidth+2, nextWindowWidth+1, nextWindowWidth*2+1],
    [nextWindowWidth+1, nextWindowWidth, nextWindowWidth*2+2, nextWindowWidth*2+1], 
    [2, nextWindowWidth+2, nextWindowWidth+1, nextWindowWidth*2+1],
  ]; 

  const tetriminoes = [tetriminoI, tetriminoL, tetriminoO, tetriminoT, tetriminoZ, tetriminoJ, tetriminoS];
  const tetriminoColor = ["tetriminoI", "tetriminoL", "tetriminoO", "tetriminoT", "tetriminoZ", "tetriminoL", "tetriminoZ"];
  const nextTetrominoes = [nextI, nextL, nextO, nextT, nextZ, nextJ, nextS];
  let blockId = 1;
  let currentBlock = [];
  let comingBlockId = Math.floor(Math.random()*tetriminoes.length);
  let scroller;
  

  const draw = () => {
    currentBlock.forEach(idx => {
      if (currentPos + idx >= 0) {
        squares[currentPos + idx].classList.add("fallingBlock");
        squares[currentPos + idx].classList.add(tetriminoColor[blockId]);
      }
    });
  }

  const undraw = () => {
    currentBlock.forEach(idx => {
      if (currentPos + idx >= 0) {
        squares[currentPos + idx].classList.remove("fallingBlock");
        squares[currentPos + idx].classList.remove(tetriminoColor[blockId]);
      }
    });
  }

  const drawNext = () => {
    let nextBlock = nextTetrominoes[comingBlockId][0];
    nextSquares.forEach(sq => {sq.className = "square";});
    nextBlock.forEach(idx => {
      nextSquares[idx].classList.add(tetriminoColor[comingBlockId]);
    }) 
  }

  const moveDown = () => {
    if (!gameOn) return;
    if(currentBlock.some(idx => {
      if (currentPos + idx < 0) return false;
      let btm = squares[currentPos + idx + width].classList.contains("placedBlock") || squares[currentPos + idx + width].classList.contains("bottomRow");
      btm &= ! squares[currentPos+idx+width].classList.contains("fallingBlock");
      return btm;
    })) {
      freeze();
      return;
    }
    undraw();
    currentPos += width;
    draw();
  }

  const moveLeft = () => {
    if (!gameOn) return;
    let isAtLeftEdge = currentBlock.some(idx => (currentPos + idx)%width === 0);
    if (isAtLeftEdge) return ;
    let isLeftFilled = currentBlock.some(idx => {
      if (currentPos + idx -1 < 0) return false;
      return squares[currentPos + idx -1].classList.contains("placedBlock");
    }
    );
    if (isLeftFilled) return;
    undraw();
    currentPos--;
    draw();
  }

  const moveRight = () => {
    if (!gameOn) return;
    let isAtRightEdge = currentBlock.some(idx => (currentPos + idx) % width === width - 1);
    let isRightFilled = currentBlock.some(idx => {
      if (currentPos + idx +1 < 0) return false;
      return squares[currentPos + idx + 1].classList.contains("placedBlock");
    });
    if (isAtRightEdge || isRightFilled) return;
    undraw();
    currentPos++;
    draw();
  }

  const validRotaion = () => {
    let nextBlock = tetriminoes[blockId][(currentRotation+1)%3];
    let overvien = nextBlock.some(idx => (currentPos + idx) % width === width - 1) && nextBlock.some(idx => (currentPos + idx) % width ===  0);
    let isFilled = nextBlock.some(idx => {
      if (currentPos + idx < 0) return false;
      return squares[currentPos + idx].classList.contains("placedBlock");
    });
    if (!(overvien || isFilled)) console.log("Hello");
    return !(overvien || isFilled);
  }

  const rotate = () => {
    if (!validRotaion()) return;
    undraw();
    currentRotation = (currentRotation+1)%4; 
    currentBlock = tetriminoes[blockId][currentRotation];
    draw();
  }

  const dropBlock = () => {
    blockId = comingBlockId;
    comingBlockId = Math.floor(Math.random()*tetriminoes.length);
    currentBlock = tetriminoes[blockId][currentRotation];
    currentPos = 4;
    scoreSpan.innerHTML = score;
    draw();
    scroller = setInterval(moveDown, 1000-level*50/1000);
    if (currentBlock.some(idx => {
      if (currentPos + idx < 0) return false;
      return squares[currentPos + idx].classList.contains("placedBlock");
    })) {
      stopGame();
      return ;
    }
    drawNext();
  }


  const overflowAnimation = () => {
    console.log("OVEEER");
    for (let i=squares.length-1; i>=0; i--) {
      squares[i].classList.add("overflow");
      if (i%10 === 0) setTimeout(()=>{}, 1000);
    }
  }

  const stopGame = () => {
    clearInterval(scroller);
    gameOn = false;
    setTimeout(overflowAnimation, 1000);
  }

  const dropBlockAfterDeletion = (poses) => {
    for (let i=0; i<poses.length; i++) {
      let pos = poses[i] + i*width;
      for (let i = pos + width - 1; i >= width; i--) {
        squares[i].className = squares[i - width].className;
      }
      for (let i = 0; i < width; i++) {
        squares[i].className = "square";
      }
    }
 }

 const addScore = (numRows) => {
    switch (numRows) {
      case 1:
        score += 40 * (level + 1);
        break;
      case 2:
        score += 100 * (level + 1);
        break;
      case 3:
        score += 300 * (level + 1);
        break;
      case 4:
        score += 1200 * (level + 1);
        default:
   }
 }

  const checkRows = () => {
    let isRowFilled = true;
    let deletedRows = [];
    for (let i=squares.length-1; i>=0; i--) {
      if (!squares[i].classList.contains("placedBlock")) isRowFilled = false;
      if (i%width === 0 ) {
        if (isRowFilled) {
          deletedRows.push(i);
        }
        else isRowFilled = true;
      }
    }
    dropBlockAfterDeletion(deletedRows);
    if (deletedRows.length) addScore(deletedRows.length);
  }

  const freeze = () => {
    currentBlock.forEach(idx => {
      if(currentPos+idx>=0) {
        squares[currentPos + idx].classList.remove("fallingBlock");
        squares[currentPos + idx].classList.add("placedBlock");
      }
    })
    checkRows();
    clearInterval(scroller);
    dropBlock();
  }

  const control = (e) => {
    switch(e.keyCode) {
      case 37: moveLeft();
      break;
      case 38: rotate();
      break;
      case 39: moveRight();
      break;
      case 40: moveDown();
      break;
      case 32: if (!gameOn) {
        dropBlock();
        gameOn = true;
      }
      default:
    }
  }
  
  // dropBlock();
  document.addEventListener('keydown', control);
})


//TODO: make next block window
// TODO: add bondry check for all squares[currentPos + idx]