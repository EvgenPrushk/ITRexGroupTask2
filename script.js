console.log(
  Potentials(
    [
      ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

      ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

      ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

      ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

      ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

      ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

      ["#", "#", "+", "#", "#", "#", "#", "#", "#"],

      ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "+", "#", "#", "#", "#", "#", "#"],
      ["#", "#", "+", "+", "#", "#", "#", "#", "#"],
      ["#", "#", "#", "+", "#", "#", "#", "#", "#"],
    ],
    [3, 12]
  )
);
function Potentials(stringMatrix, [x2, y2]) {
  // Перевод матрицицу в двоичную систему
  const matrix = [];
  const Start = [];
  for (let y = 0; y < stringMatrix.length; y++) {
    row = [];

    for (let x = 0; x < stringMatrix[y].length; x++) {
      if (stringMatrix[y][x] === "#") {
        row.push(1);
      } else if (stringMatrix[y][x] === "+") {
        row.push(0);
      } else if (stringMatrix[y][x] === "0") {
        row.push(0);
        Start.push(x, y);
      }
    }

    matrix.push(row);
  }
  [x1, y1] = Start;

  potentials = getPotentialMatrix(matrix, [x1, y1], [x2, y2]);

  console.log(potentials);

  let potential = potentials[y1][x1];

  let path = [[x1, y1]];

  while (potential !== 0) {
    // отнимаем от текущего потенциала 1
    potential--;

    // ячейка сверху, равна ли она текущему потенциалу минус 1
    if (y1 > 0 && potentials[y1 - 1][x1] === potential) {
      path.push([x1, y1 - 1]);
      y1--;
      continue;
    }

    // ячейка снизу, равна ли она текущему потенциалу минус 1
    if (y1 < matrix.length - 1 && potentials[y1 + 1][x1] === potential) {
      path.push([x1, y1 + 1]);
      y1++;
      continue;
    }

    // ячейка слева, равна ли она текущему потенциалу минус 1
    if (x1 > 0 && potentials[y1][x1 - 1] === potential) {
      path.push([x1 - 1, y1]);
      x1--;
      continue;
    }

    // ячейка справа, равна ли она текущему потенциалу минус 1
    if (x1 < matrix[y1].length && potentials[y1][x1 + 1] === potential) {
      path.push([x1 + 1, y1]);
      x1++;
      continue;
    }
  }
  
  const arrayPathString = [];

  for (let i = 1; i < path.length; i++) {
    if (
      path[i - 1][1] - path[i][1] === 0 &&
      path[i - 1][0] - path[i][0] === 1
    ) {
      arrayPathString.push("left");
    } else if (
      path[i - 1][1] - path[i][1] === 1 &&
      path[i - 1][0] - path[i][0] === 0
    ) {
      arrayPathString.push("top");
    } else if (
      path[i - 1][0] - path[i][0] === -1 &&
      path[i - 1][1] - path[i][1] === 0
    ) {
      arrayPathString.push("right");
    } else {
      arrayPathString.push("bottom");
    }
  }
  console.log(path);

  return arrayPathString;
}

// использую волновую функцию для нохождения выхода из лабиринта
function getPotentialMatrix(matrix, [x1, y1], [x2, y2]) {
  const potentials = [];

  for (let y = 0; y < matrix.length; y++) {
    const row = [];
    for (let x = 0; x < matrix[y].length; x++) {
      row.push(null);
    }
    potentials.push(row);
  }
  // та часть лабиринта, которая темная, отмечаем ее false
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === 1) {
        potentials[y][x] = false;
      }
    }
  }
  // при работе с матрицами мы сначала обращаемся к у координате, а потом к х
  potentials[y2][x2] = 0;

  while (potentials[y1][x1] === null) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (potentials[y][x] === false || potentials[y][x] === null) {
          continue;
        }

        const number = potentials[y][x] + 1;

        // верхняя ячейка
        if (y > 0 && potentials[y - 1][x] !== false) {
          if (potentials[y - 1][x] === null) {
            potentials[y - 1][x] = number;
          } else {
            potentials[y - 1][x] = Math.min(potentials[y - 1][x], number);
          }
        }
        // нижняя ячейка
        if (y < matrix.length - 1 && potentials[y + 1][x] !== false) {
          if (potentials[y + 1][x] === null) {
            potentials[y + 1][x] = number;
          } else {
            potentials[y + 1][x] = Math.min(potentials[y + 1][x], number);
          }
        }
        // левая ячейка
        if (x > 0 && potentials[y][x - 1] !== false) {
          if (potentials[y][x - 1] === null) {
            potentials[y][x - 1] = number;
          } else {
            potentials[y][x - 1] = Math.min(potentials[y][x - 1], number);
          }
        }
        // правая ячейка
        if (x < matrix[0].length - 1 && potentials[y][x + 1] !== false) {
          if (potentials[y][x + 1] === null) {
            potentials[y][x + 1] = number;
          } else {
            potentials[y][x + 1] = Math.min(potentials[y][x + 1], number);
          }
        }
      }
    }
  }
  console.log(potentials);
  return potentials;
}
