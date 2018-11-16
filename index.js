const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Enter matrix length: ", length => {
  length = +length || false;

  if (length === false || length <= 0) {
    console.log("Please enter valid length!");

    readline.close();

    return;
  }

  const array = new Array(length).fill(1);
  const matrix1 = new Array(length).fill(array);
  const matrix2 = [...matrix1];

  const before = new Date();

  const result = matrix1.map(row => {
    const newRow = [];

    row.forEach((_, colIndex) => {
      const element = row.reduce(
        (acc, curr, index) => acc + curr * matrix2[index][colIndex],
        0
      );
      newRow.push(element);
    });

    return newRow;
  });

  const filename = "result.txt";

  fs.writeFileSync(filename, result.map(row => row.join(" ")).join("\r\n"));

  const after = new Date();

  console.log(
    `Finished in ${(after.getTime() - before.getTime()) /
      1000} s\r\nResult matrix saved in ${filename}`
  );

  readline.close();
});
