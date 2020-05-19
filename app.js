document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementsByClassName("grid")[0];
  const squares = grid.getElementsByTagName("div");
  const width = 10;
  const height = 20;
  let currentPos = 4;
  let currentRotation = 0;
  let gameOn = false;

  const tetriminoL = [
    [1-2*width, width+1-2*width, width*2+1-2*width, 2-2*width],
    [width-2*width, 1+width-2*width, 2+width-2*width, 2*width+2-2*width],
    [1-2*width, -width*2 + width+1, -width*2 + width*2+1, -width*2 + width*2],
    [ -width*2 +width, -width*2 + width*2, -width*2 + width*2+1, -width*2 + width*2+2]
  ]
  
  const tetriminoT = [
    [1-width, width-width, width+1-width, width+2-width],
    [1-width, width+1-width, width*2+1-width, width + 2-width],
    [width*2+1-width, width-width, width+1-width, width+2-width],
    [1-width, width+1-width, width*2+1-width, width-width],
  ]
  
  const tetriminoO = [
    [1-width,0-width,width+1-width, width+0-width],
    [1-width,0-width,width+1-width, width+0-width],
    [1-width,0-width,width+1-width, width+0-width],
    [1-width,0-width,width+1-width, width+0-width],
  ]

  const tetriminoZ = [
    [width+1-width, width+2-width, width*2-width, width*2+1-width], 
    [0-width, width-width, width+1-width, width*2+1-width],
    [width+1-width, width+2-width, width*2-width, width*2+1-width], 
    [0-width, width-width, width+1-width, width*2+1-width],
  ]

  const tetriminoI = [
    [1-3*width, width+1-3*width, width*2+1-3*width, width*3+1-3*width],
    [width-3*width, width+1-3*width, width+2-3*width, width+3-3*width],
    [1-3*width, width+1-3*width, width*2+1-3*width, width*3+1-3*width],
    [width-3*width, width+1-3*width, width+2-3*width, width+3-3*width],
  ]
  const tetriminoes = [tetriminoI, tetriminoL, tetriminoO, tetriminoT, tetriminoZ];
  const tetriminoColor = ["tetriminoI", "tetriminoL", "tetriminoO", "tetriminoT", "tetriminoZ"];
// TODO: add J and S tetrominoes
  // let blockId = Math.floor(Math.random()*tetriminoes.length);
  // let currentBlock = tetriminoes[blockId][currentRotation];
  let blockId = 1;
  let currentBlock = [];
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
    // let isAtRightEdge = currentBlock.some(idx => (currentPos + idx) % width === width - 1);
    // let isRightFilled = currentBlock.some(idx => squares[currentPos + idx + 1].classList.contains("placedBlock"));
    let isAtLeftEdge = nextBlock.some(idx => (currentPos + idx)%width === 0);
    let isLeftFilled = nextBlock.some(idx => squares[currentPos + idx].classList.contains("placedBlock"));
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
    
    blockId = Math.floor(Math.random()*tetriminoes.length);
    console.log(blockId);
    currentBlock = tetriminoes[blockId][currentRotation];
    currentPos = 4;
    draw();
    scroller = setInterval(moveDown, 1000);
    if (currentBlock.some(idx => {
      if (currentPos + idx < 0) return false;
      return squares[currentPos + idx].classList.contains("placedBlock");
    })) {
      stopGame();
      return ;
    }
    // if (currentBlock.some(idx => squares[currentPos + idx].classList.contains("placedBlock"))) {
    //   stopGame();
    //   return ;
    // }
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
    console.log(deletedRows);
    dropBlockAfterDeletion(deletedRows);
  }

    const freeze = () => {
    currentBlock.forEach(idx => {
      if(currentPos+idx>=0) {
        squares[currentPos + idx].classList.remove("fallingBlock");
        squares[currentPos + idx].classList.add("placedBlock");
      }
    })
    // if (currentBlock.some(idx => squares[currentPos + idx].classList.contains("topRow"))) {
    //   stopGame();
    // }
    checkRows();
    clearInterval(scroller);
    // if (checkTopRow()) {}
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