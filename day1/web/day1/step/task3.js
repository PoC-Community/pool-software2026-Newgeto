let numbers = [10, 5, 8, 20, 3, 12];
let min = numbers[0];

for (let i = 1; i < numbers.length; i++) {

  if (numbers[i] < min) {
    min = numbers[i];
  }

}

console.log(min);