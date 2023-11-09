let initialInterval = 5000; // 1 minute in milliseconds
let decreaseIntervalBy = 1000; // Decrease interval by 1 second (1000 milliseconds)
let initialIntervalTotal = 1000; // Decrease interval by 1 second (1000 milliseconds)
let decreaseInterva2lBy = 200; // Decrease interval by 1 second (1000 milliseconds)
let interavalId 
let counter = 0  
function executeFunction() {
  console.log("Function executed!");

  // Decrease the interval
  clearInterval(interavalId);
  counter = 0
  if (initialInterval > decreaseIntervalBy) {
    initialIntervalTotal -= decreaseInterva2lBy;
    if(initialIntervalTotal < 200 ) initialIntervalTotal = 200;
    
  } else {
    initialInterval = 1000; // Set a minimum interval to avoid extremely high frequency executions
    initialIntervalTotal = 200; // Set a minimum interval to avoid extremely high frequency executions
  }
  interavalId  = setInterval(() => {
    console.log(++counter);
  }, initialIntervalTotal);

  // Schedule the next execution
  setTimeout(executeFunction, initialInterval);
}

// Start the first execution
setTimeout(executeFunction, initialInterval);
