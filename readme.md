1) Difference between var, let, and const:

a. var is the old way to declare variables. It has function scope and can be redeclared.

b.let is newer. It has block scope (only works inside { }) and cannot be redeclared in the same scope.

c.const is also block scoped but the value cannot be changed (constant).



2) Difference between map(), forEach(), and filter():

a.forEach() just loops through an array and lets you do something with each item, but it doesn’t return a new array.

b.map() also loops, but it creates and returns a new array with the results.

c.filter() checks each item and only keeps the ones that match the condition, returning a new array.



3) Arrow functions in ES6:
Arrow functions are a shorter way to write functions. for example:

const add = (a, b) => a + b;
It is cleaner, and it also does not create its own this keyword, it uses the parent one.


4) Destructuring assignment in ES6:
This is a way to take values from arrays or objects and put them into variables easily. for example:


const [a, b] = [1, 2];   // a = 1, b = 2
const {name, age} = {name: "Ali", age: 20};  // name = "Ali", age = 20


5) Template literals in ES6:
Template literals use backticks (`). They allow you to add variables directly inside a string with ${ }. for example: 

let name = "Ali";
console.log(`Hello, my name is ${name}`);

This is easier and cleaner than normal string concatenation like "Hello, my name is " + name.



