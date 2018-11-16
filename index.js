const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Enter matrix length: ", length => {
  length = +length;

  if (!length || length < 0) {
    console.log("Please enter valid length!");

    return readline.close();
  }

  const array = new Array(length).fill(1);
  const matrix1 = new Array(length).fill(array);
  const matrix2 = [...matrix1];

  const before = new Date();

  const result = matrix1.map(row =>
    row.map((_, colIndex) =>
      row.reduce((acc, curr, index) => acc + curr * matrix2[index][colIndex], 0)
    )
  );

  const filename = "result.txt";

  fs.writeFileSync(filename, result.map(row => row.join(" ")).join("\r\n"));

  console.log(
    `Finished in ${(new Date().getTime() - before.getTime()) /
      1000} s\r\nResult matrix saved in ${filename}`
  );

  readline.close();
});
