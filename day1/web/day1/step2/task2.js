function square(number) {
  return number * number;
}

console.log(square(5));


const add = (a, b) => a + b;

console.log(add(3, 4));


function toUpper(text) {
  return text.toUpperCase();
}

console.log(toUpper("hello"));


function doubleArray(array) {
  return array.map(n => n * 2);
}

console.log(doubleArray([1, 2, 3]));


function useFunction(array, func) {
  return array.map(func);
}

console.log(useFunction([1, 2, 3], square));