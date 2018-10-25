function addition(a, b){
  return a + b;
}

function subtraction(a, b){
  return a - b;
}

function multiplication(a, b){
  return a * b;
}

function division(a, b){
  if (b == 0){
    return "Error";
  }else {
    return a / b;
  }
}

function operate(operand, a, b){
  switch(operand){
    case '+':
        return addition(a, b);
    break;
    case '-':
      return subtraction(a, b);
    break;
    case '*':
      return multiplication(a, b);
    break;
    case '/':
      return division(a, b);
    break;
  }
}

let nums = [];
let opers = [];
let newLine = false;
const btns = document.querySelectorAll("button");
btns.forEach(btn => addEventListener("click", handleInput));

function updateDisplay(symbol, newLine = false){
  let currentValue = document.getElementById("displayInput").innerHTML;
  let digitCount = currentValue.split('');;

  if(currentValue == "0" || newLine){
    document.getElementById("displayInput").innerHTML = symbol;
  }else{
    if(digitCount.length<9){
      document.getElementById("displayInput").innerHTML += symbol;
    }
  }
}

function handleInput(e){
  const btnSym = e.target.innerText;
  const btnClass = e.target.className;
  const displayValue = document.getElementById('displayInput').innerHTML;

  if(btnClass == "digit"){
    updateDisplay(btnSym, newLine);
    newLine = false;
  }else if(btnClass == "operation"){
    nums.push(parseFloat(displayValue));
    opers.push(btnSym);
    newLine = true;
    updateDisplay(btnSym, newLine);
    if(nums.length > 1){
      let result = 0;
      result = operate(opers[opers.length-2], nums[nums.length-2], nums[nums.length-1]);
      if (result != undefined){
        let resultDigits = result.toString().split('');
        if (resultDigits.length > 8){
          updateDisplay(numRound(result), newLine);
        }else{
          updateDisplay(result, newLine);
        }
        nums.push(result);
      }
    }
  }else if(btnClass == "dot"){
    let dotPresent = decimalChecker(displayValue);
    if(!dotPresent){
      updateDisplay(btnSym);
    }
  }else if(btnClass == "clear") {
    nums.length = 0;
    opers.length = 0;
    document.getElementById('displayInput').innerHTML = "0";
  }
}

function decimalChecker(displayValue){
  let re = /\./;
  return re.test(displayValue);
}

function numRound(num){
  let sciNum = num.toExponential();
  let reBeforeDec = /\d{1}/;
  let reAfterDec = /\d{1,4}(?!\.)/;
  let strResult = sciNum.toString();
  let wholeNumbers = strResult.match(reBeforeDec);
  let decimals = strResult.match(reAfterDec);
  let exponential = strResult.substr(-4);

  return (wholeNumbers + "." + decimals + exponential);
}
