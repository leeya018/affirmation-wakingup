// const isValid = (thrill) => {
//   return eval(thrill) !== NaN && eval(thrill) >= 0 && eval(thrill) !== Infinity;
// };

import moment from "moment";

// export const createThrill = () => {
//   let thrill;
//   const actions = ["+", "-", "*"];
//   do {
//     const randAction = actions[Math.floor(Math.random() * actions.length)];
//     const randNumber1 = Math.floor(Math.random() * 10);
//     const randNumber2 = Math.floor(Math.random() * 10);
//     thrill = `${randNumber1} ${randAction} ${randNumber2} `;
//   } while (!isValid(thrill));
//   return thrill;
// };
export const formatSeconds = (second) => {
  const date = new Date(null);
  date.setSeconds(second); // specify value for SECONDS here
  const result = date.toISOString().slice(11, 19);
  return result;
};
export const getTime = (date) => {
  return moment(date).format("hh:mm:ss a");
};
function generateDivisibleNumbers(level) {
  function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  const firstNumber = getRandomNumberConstrain(level); // You can set any max value
  const multiplier = getRandomNumber(10); // You can set any max value
  const secondNumber = firstNumber * multiplier;
  if (firstNumber === 0) return generateDivisibleNumbers(level);
  return [secondNumber, firstNumber];
}
function getRandomNumberConstrain(digits) {
  const min = digits === 1 ? 0 : Math.pow(10, digits - 1);
  const max = Math.pow(10, digits);
  return Math.floor(Math.random() * (max - min) + min);
}

export const generateRandomNumbers = (input) => {
  console.log("input is : " + input);

  function getRandomOperator() {
    const operators = ["/", "*", "-", "+"];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
  }

  let firstNumber, secondNumber;

  switch (parseInt(input)) {
    case 1:
      firstNumber = getRandomNumberConstrain(1);
      secondNumber = getRandomNumberConstrain(1);
      break;
    case 2:
      firstNumber = getRandomNumberConstrain(1);
      secondNumber = getRandomNumberConstrain(2);
      break;
    case 3:
      firstNumber = getRandomNumberConstrain(2);
      secondNumber = getRandomNumberConstrain(2);
      break;
    case 4:
      firstNumber = getRandomNumberConstrain(3);
      secondNumber = getRandomNumberConstrain(2);
      break;
    case 5:
      firstNumber = getRandomNumberConstrain(3);
      secondNumber = getRandomNumberConstrain(3);
      break;

    // You can add more cases as needed
    default:
      throw new Error("Invalid Input! Input must be between 1 and 5." + input);
  }

  const operator = getRandomOperator(); // getting a random operator
  if (operator === "/") {
    [firstNumber, secondNumber] = generateDivisibleNumbers(parseInt(input));
  } else if (operator === "-" && firstNumber < secondNumber) {
    let temp = firstNumber;
    firstNumber = secondNumber;
    secondNumber = temp;
  }
  return { firstNumber, operator, secondNumber };
};

export const sleep = async (time) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, time)
  );

export const randLeft = () => Math.random() * 65 + "vw";

export const minLevel = 600;

//===============================HABITS ======================

export const getDateStr = (date) => {
  try {
    const resDate = new Date(date).toISOString().split("T")[0];
    return resDate;
  } catch (error) {
    console.log(error.message, date);
  }
};
export const getDateStrIsrael = (date) => {
  try {
    const dateStr = getDateStr(date);
    const dateStrIsrael = dateStr.split("-").reverse().join("-");

    return dateStrIsrael;
  } catch (error) {
    console.log(error.message, date);
  }
  return;
};
export const getFullDateStr = (date) => {
  return new Date(date).toISOString();
};
export const datesAreEquals = (d1, d2) => {
  return getDateStr(new Date(d1)) === getDateStr(new Date(d2));
};
export const fullDatesAreEquals = (d1, d2) => {
  return getFullDateStr(new Date(d1)) === getFullDateStr(new Date(d2));
};
export const getDaysDiff = (d1, d2) => {
  return Math.floor((new Date(d1) - new Date(d2)) / (1000 * 60 * 60 * 24));
};

export const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION;
};
export const daysToExpired = 7;
