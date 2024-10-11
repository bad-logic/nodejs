// you are give a two dimensional array of potentially unequal height and width containing only 0s and 1s.
// Each 0 represents land, and each 1 represents part of river. A river consists of any number of 1s that are either
// horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 1s forming a river determine its size.

// Note that a river can twist. In other words, it doesn't have to be a straight vertical line or a straight horizontal line.
// it can be a L-shape, for example.

// write a function that returns an array of the sizes of all rivers represented in the input matrix. The sizes
// don't need to be in any particular order.

// sample input

// matrix = [
//     [1,0,0,1,0],
//     [1,0,1,0,0],
//     [0,0,1,0,1],
//     [1,0,1,0,1],
//     [1,0,1,1,0],
// ]

// sample output
// [1,2,2,2,5] // The numbers could be ordered differently

// The rivers can be clearly seen here:
// [
//     [1, , ,1, ],
//     [1, ,1, , ],
//     [ , ,1, ,1],
//     [1, ,1, ,1],
//     [1, ,1,1, ],
// ]

function riverSizes(matrix) {
  const sizes = [];
  const visitedMatrix = matrix.map((row) => row.map((col) => false));
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let currentRiverSize = { value: 0 };
      traverseThroughRiver(matrix, row, col, visitedMatrix, currentRiverSize);
      if (currentRiverSize.value > 0) sizes.push(currentRiverSize.value);
    }
  }
  return sizes;
}

function traverseThroughRiver(
  matrix,
  row,
  col,
  visitedMatrix,
  currentRiverSize
) {
  if (visitedMatrix[row][col]) return;
  visitedMatrix[row][col] = true;
  if (matrix[row][col] === 0) return;
  currentRiverSize.value++;
  const neighbors = getNeighbors(matrix, row, col);
  for (const [nRow, nCol] of neighbors) {
    traverseThroughRiver(matrix, nRow, nCol, visitedMatrix, currentRiverSize);
  }
}

function getNeighbors(matrix, row, col) {
  const neighbors = [];
  if (row !== 0) neighbors.push([row - 1, col]);
  if (col !== 0) neighbors.push([row, col - 1]);
  if (row !== matrix.length - 1) neighbors.push([row + 1, col]);
  if (col !== matrix[0].length - 1) neighbors.push([row, col + 1]);
  return neighbors;
}

console.log(
  riverSizes(
    (matrix = [
      [1, 0, 0, 1, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 0],
    ])
  )
);
