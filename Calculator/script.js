let screen = document.getElementById("screen");
const buttons = document.querySelector(".buttons");
const buttonZero = document.getElementById("zero");
const buttonOne = document.getElementById("one");
const buttonTwo = document.getElementById("two");
const buttonThree = document.getElementById("three");
const buttonFour = document.getElementById("four");
const buttonFive = document.getElementById("five");
const buttonSix = document.getElementById("six");
const buttonSeven = document.getElementById("seven");
const buttonEight = document.getElementById("eight");
const buttonNine = document.getElementById("nine");
const addButton = document.getElementById("plus");
const subtractButton = document.getElementById("minus");
const multiplyButton = document.getElementById("times");
const divideButton = document.getElementById("divide");
const dot = document.getElementById("dot");
const openingParenthesis = document.getElementById("opening-parenthesis");
const closingParenthesis = document.getElementById("closing-parenthesis");
const clearButton = document.getElementById("all-clear");
const equalButton = document.getElementById("equal");
const clearEntryButton = document.getElementById("clear-entry");
const percentButton = document.getElementById("percent");
const sqrtButton = document.getElementById("square-root");

buttons.addEventListener("click", (e)=>{
  if(e.target.matches(".add-string")){
    clearZero();
    screen.textContent += e.target.innerText;
  } else if(e.target.matches(".add-string-space")) {
    clearZero();
    screen.textContent +=  " " + e.target.textContent  + " ";
  }
})

//Answer
equalButton.addEventListener("click", ()=>{
  let string = screen.innerText;
  let array = string.split(" ");
  let error = checkError(array);
  if(error === false){
    findParenthesis(array);
    findSqrt(array);
    findOperation.negative(array);
    findOperation.percent(array);
    findOperation.multiply(array);
    findOperation.divide(array);
    findOperation.add(array);
    findOperation.subtract(array);
    screen.innerText = array;
  } else {
    screen.innerText = "Expression Error";
  }
})

//Operation Object
let operation = {
  add : function(num1, num2){
    return num1 + num2;
  },
  subtract : function(num1, num2){
    return num1 - num2;
  },
  multiply : function(num1, num2){
    return num1 * num2;
  },
  divide : function(num1, num2){
    return num1 / num2;
  },
};

//Operator Finder Object
let findOperation = {
    divide : function(arrayVar){
        while(arrayVar.indexOf("÷") !== -1) {
            const firstCount = arrayVar.indexOf("÷")-1;
            const num1 = parseFloat(arrayVar[arrayVar.indexOf("÷")-1]);
            const num2 = parseFloat(arrayVar[arrayVar.indexOf("÷")+1]);
            const answer = operation.divide(num1, num2);
            arrayVar.splice(firstCount, 3, answer);
        }
    return arrayVar
  },
    multiply : function(arrayVar){
        while(arrayVar.indexOf("*") !== -1) {
            let firstCount = arrayVar.indexOf("*") - 1;
            let num1 = parseFloat(arrayVar[arrayVar.indexOf("*") - 1]);
            let num2 = parseFloat(arrayVar[arrayVar.indexOf("*") + 1]);
            let answer = operation.multiply(num1, num2);
            arrayVar.splice(firstCount, 3, answer);
        }
    return arrayVar;
  },
  add : function(arrayVar){
      while(arrayVar.indexOf("+") !== -1) {
        const firstCount = arrayVar.indexOf("+") - 1;
        const num1 = parseFloat(arrayVar[arrayVar.indexOf("+") - 1]);
        const num2 = parseFloat(arrayVar[arrayVar.indexOf("+") + 1]);
        const answer = operation.add(num1, num2);
        arrayVar.splice(firstCount, 3, answer);
    }
  },
  subtract : function(arrayVar){
      while(arrayVar.indexOf("-") !== -1) {
        const firstCount = arrayVar.indexOf("-") - 1;
        const num1 = parseFloat(arrayVar[arrayVar.indexOf("-") - 1]);
        const num2 = parseFloat(arrayVar[arrayVar.indexOf("-") + 1]);
        const answer = operation.subtract(num1, num2);
        arrayVar.splice(firstCount, 3, answer);
      }
  },
  percent : function(arrayVar){
    if(arrayVar.indexOf("%") != -1 && arrayVar[0] != "%"){
      if(arrayVar[arrayVar.indexOf("%") + 1] == undefined){
        const numBeforePercent = parseFloat(arrayVar[arrayVar.indexOf("%") - 1]);
        const newString = JSON.stringify(numBeforePercent / 100);
        arrayVar.splice((arrayVar.indexOf("%") -1), 2, newString);
      }
      else{
        const numBeforePercent = parseFloat((arrayVar[arrayVar.indexOf("%") - 1]) / 100);
        const numAfterPercent = arrayVar[arrayVar.indexOf("%") + 1];
        const newString = JSON.stringify(numBeforePercent * numAfterPercent);
        arrayVar.splice((arrayVar.indexOf("%") - 1), 3, newString);
      }
      return arrayVar;
    }
  },
  negative : function(arrayVar){
    if(arrayVar[0] == "-"){
      const newString = arrayVar[0] + arrayVar[1];
      arrayVar.splice(arrayVar[0], 2, newString);
    }
  }
}; 

//Clear all
clearButton.addEventListener("click", ()=>{
  screen.innerText = "0";
})

//Clear last index
clearEntryButton.addEventListener("click", ()=>{
  let string = screen.innerText;
  let array = string.split("");
  array.pop();
  let newString = array.toString();
  newString = newString.replace(/,/g, '');
  screen.innerText = newString;
  if(screen.innerText == ""){ screen.innerText = "0"; }
})

//Clear index[0]
function clearZero(){
  const screenValue = screen.innerText;
  if(screenValue.charAt(0) == "0" 
  || screenValue == "Expression Error" 
  || screenValue == "null" 
  || screenValue == "NaN"){
    screen.innerText = "";
  }
}

//Checking all errors
function checkError(arrayVar){
  const arrayOperator = ["÷", "*", "+", "-", "%"];
  const parenthesisError = ["÷", "*", "+"];
  let firstCount = 0;
  let secondCount;
  let operatorIndex;
  let boolean = false;
  const openingIndex = arrayVar.indexOf("(");
  const closingIndex = arrayVar.indexOf(")");
  
  while(firstCount < arrayOperator.length){
    if(openingIndex !== -1 && closingIndex !== -1){
      if((arrayVar[openingIndex + 1] === parenthesisError[firstCount] 
        || arrayVar[closingIndex - 1] === parenthesisError[firstCount]) 
        || (arrayVar[closingIndex- 1] === "-")) {
          boolean = true;
        }
    }
    if(arrayVar[0] === parenthesisError[firstCount]){
      boolean = true;
    }
    let counterOpening = 0;
    let counterClosing = 0;
    for(parenthesis of arrayVar) {
      if (parenthesis == "(") { 
        counterOpening++;
      } else if(parenthesis === ")") {
        counterClosing++;
      }
    }
    if(counterOpening !== counterClosing){
      boolean = true;
    }
    secondCount = 0;
    if(arrayVar.indexOf(arrayOperator[firstCount]) !== -1){
      while(secondCount < arrayOperator.length){
        operatorIndex = arrayVar.indexOf(arrayOperator[firstCount]);
        if((arrayVar[operatorIndex + 1]) == arrayOperator[secondCount]){
          boolean = true;
        }
        secondCount++;
      }
    }
    firstCount++;
  }
  if((openingIndex !== -1 && closingIndex === -1) || (openingIndex === -1 && closingIndex !== -1)){
   boolean = true;
  }
  if(arrayVar[0] === "%" 
  || arrayVar[arrayVar.indexOf("%") - 1] === "(" 
  || arrayVar[arrayVar.length - 1] === "√"){
    boolean = true;
  }
  return boolean;
}

//Finding Parenthesis 
function findParenthesis(arrayVar){
  while((arrayVar.indexOf("(") != -1) && (arrayVar.indexOf(")") != -1)){
    let boolAdd = true;
    let boolDivide = true;
    let boolMultiply = true;
    let boolSubtract = true;
    const length = ((arrayVar.indexOf(")") - 1) - (arrayVar.indexOf("(") + 1) + 1);
    const openingIndex = arrayVar.indexOf("(");
    const closingIndex = arrayVar.indexOf(")");
    let newArray = [];
    for(let i = 0; i < length; i++){
      newArray[i] = arrayVar[arrayVar.indexOf("(") + (i + 1)]; 
    } 
    findOperation.negative(newArray);
    findSqrt(newArray)
    findOperation.percent(newArray);
    findOperation.multiply(newArray, boolMultiply);
    findOperation.divide(newArray, boolDivide);
    findOperation.add(newArray, boolAdd);
    findOperation.subtract(newArray, boolSubtract);
    if ((arrayVar[openingIndex - 1] === "+" ||  arrayVar[openingIndex - 1] === "-" ||  arrayVar[openingIndex - 1] === "*" || 
         arrayVar[openingIndex - 1] === "÷" ||  arrayVar[openingIndex - 1] === "√" ||  arrayVar[openingIndex - 1] === undefined) 
    &&  (arrayVar[closingIndex + 1] === "+" ||  arrayVar[closingIndex + 1] === "-" ||  arrayVar[closingIndex + 1] === "*" ||  
        arrayVar[closingIndex + 1] === "÷"  ||  arrayVar[closingIndex + 1] === undefined)) {
      arrayVar.splice(openingIndex, (closingIndex + 2) - (openingIndex + 1), newArray);
    }
    else if((arrayVar[(openingIndex - 1)] !== undefined) && (arrayVar[closingIndex + 1] !== undefined)){   
      arrayVar[openingIndex] = "*";
      arrayVar[closingIndex] = "*";
      arrayVar.splice(openingIndex + 1, (closingIndex) - (openingIndex + 1), newArray);
      console.log(`${arrayVar[openingIndex + 1]}, ${ arrayVar[(closingIndex) - (openingIndex + 1)]}, ${newArray}`)
    }
    else if(arrayVar[openingIndex - 1] !== undefined){
      arrayVar[openingIndex] = "*";
      arrayVar.splice(openingIndex + 1, (closingIndex + 1) - (openingIndex + 1), newArray)
    }
    else {
      arrayVar[closingIndex] = "*";
      arrayVar.splice(openingIndex, (closingIndex + 1) - (openingIndex + 1), newArray)
    }
  } 
  return arrayVar;  
}
//Finding Square Root
function findSqrt(arrayVar){
  while(arrayVar.indexOf("√") !== -1){
    let sqrtIndex = arrayVar.indexOf("√");
    let sqrt = Math.sqrt(arrayVar[sqrtIndex+1]);
    if(arrayVar[0] === "√"
    || arrayVar[sqrtIndex - 1] === "+"
    || arrayVar[sqrtIndex - 1] === "÷"
    || arrayVar[sqrtIndex - 1] === "*"
    || arrayVar[sqrtIndex - 1] === "-"){
      arrayVar.splice(sqrtIndex, 2, sqrt);
    }
    else{
      arrayVar.splice(sqrtIndex + 1, 1, sqrt);
      arrayVar.splice(sqrtIndex, 1 , "*");
    }
  }
  findOperation.negative(arrayVar);
  return arrayVar;
}

