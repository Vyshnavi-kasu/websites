// Function to perform some data operation (e.g., calculate square of numbers)
function processData() {
    let result = [];
    for (let i = 0; i <= 1000000; i++) {
        result.push(i * i); // Square of each number
    }
    return result.join(", ");
}

// Send the processed data back to the main thread
onmessage = function() {
    const data = processData();
    postMessage(data);
};
