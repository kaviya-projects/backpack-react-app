// ===========================
// JavaScript Tutorial (Node.js)
// ===========================
console.log("Hello, JavaScript from Node!");

// Variables
let name = "Kaviya";
const age = 21;
console.log(`Name: ${name}, Age: ${age}`);

// Simple Function
function greet(user) {
  return `Hello, ${user}!`;
}
console.log(greet(name));

// Array Example
let fruits = ["Apple", "Banana", "Mango"];
fruits.push("Orange");
console.log("Fruits:", fruits);

// Object Example
let student = { name: "Kaviya", course: "AIML", year: 3 };
console.log(student);

// Async Example
async function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve("Data loaded!"), 2000));
}
(async () => {
  console.log("Loading...");
  const data = await fetchData();
  console.log(data);
})();

console.log("✅ Tutorial Completed!");
