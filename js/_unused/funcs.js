const numbers = [1,2,3,4];
console.log(numbers);

const twice = numbers.map(n => n * 2);
console.log(twice);

let sum1 = 0;
numbers.forEach(n => sum1 = sum1 + n);
console.log(sum1);

// first "a" is first element, first "n" is second element
const sum2 = numbers.reduce((a, n) => a + n);
console.log(sum2);

// multiply each number by 3
// multiply all of those numbers
const tripleProd = numbers.map(n => n * 3).reduce((a, n) => {
    console.log(`a=${a}, n=${n}`);
    return a * n;
});
console.log(tripleProd);

// concatenate all numbers in a string
// first "txt" is second parameter to reduce()
const text = numbers.reduce((txt, n) => `${txt} (${n})`, 'Numbers:');
console.log(text);
