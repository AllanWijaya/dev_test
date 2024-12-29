const array = [1, 4, 5, 6];
let targe = 0;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
function findExpression(source, target) {
  const operators = ["+", "-", "*", "/"];

  function helper(numbers, expression) {
    if (numbers.length === 1) {
      if (Math.abs(numbers[0] - target) < 1e-9) {
        return expression;
      }
      return null;
    }

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        if (i !== j) {
          const remaining = numbers.filter(
            (_, index) => index !== i && index !== j
          );

          for (const op of operators) {
            let newNumber;
            let newExpression;
            if (op === "+") {
              newNumber = numbers[i] + numbers[j];
              newExpression = `(${expression[i]} + ${expression[j]})`;
            } else if (op === "-") {
              newNumber = numbers[i] - numbers[j];
              newExpression = `(${expression[i]} - ${expression[j]})`;
            } else if (op === "*") {
              newNumber = numbers[i] * numbers[j];
              newExpression = `(${expression[i]} * ${expression[j]})`;
            } else if (op === "/" && numbers[j] !== 0) {
              newNumber = numbers[i] / numbers[j];
              newExpression = `(${expression[i]} / ${expression[j]})`;
            } else {
              continue;
            }

            const result = helper(
              [newNumber, ...remaining],
              [
                newExpression,
                ...expression.filter((_, index) => index !== i && index !== j),
              ]
            );
            if (result) return result;
          }
        }
      }
    }
    return null;
  }

  const initialExpressions = source.map((num) => num.toString());
  return helper(source, initialExpressions);
}

readline.question("Masukkan angka target? ", (target) => {
  targe = Number(target);
  const res = findExpression(array, targe);
  console.log(res);
  readline.close();
});
