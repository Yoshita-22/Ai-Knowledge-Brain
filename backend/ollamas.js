const response = await fetch("http://127.0.0.1:11434/api/tags");

console.log("Status:", response.status);
console.log("Response:", await response.text());