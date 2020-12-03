## How to play
* Hit space key to start
* Navigate tetrominoes with arrow keys ←→↓
* Rotate tetrominoes with ↑
* Refresh the page to play the game again
* What is your high score?

## How I built it
* HTML
** I defined a grid, blocks in side the grid, the window for the next block

* JavaScript
** I used setInterval so it renders a new state each second
** Based on the current position of the block and its next rotated state, it decides whether it's rotatable at that position
** Give different class name based on whether the block is moving down, sit on the floor and changed their class depending on the situation
** After each render, check whether there are any rows deletable and delete if necessary, while pushing down block above by the number of rows deleted

* CSS
** Using flex box, aligned each squares inside the grid
** Defined the colors for each shape and state of blocks

