// Made By Bl4ky113

const get = {
  id: document.getElementById.bind(document),
  class: document.getElementsByClassName.bind(document)
};

const input = {
  formula: get.id("input_formula"),
  startBtn: get.id("input_start")
}

const operators = [
  "+",
  "*",
  "-",
  "(",
  ")"
];

var formula_info = {
  raw: "",
  operation: "",
  text: ""
};

function isNumber (char) {
  if ( isNaN( parseInt(char) ) ) { 
    return false; 
  } else { 
    return true; 
  }
} 

function isInArray (array, char) {
  if ( array.indexOf(char) >= 0) {
    return true;
  } else {
    return false;
  }
}

function getVariables (raw_formula) {
  var varNum = 0;
  var formulaVar = [];

  raw_formula = raw_formula.split("");
  for (let i = 0; i <= raw_formula.length; i += 1) {
    if (typeof raw_formula[i] === "string" && !(isNumber(raw_formula[i]))) {
      // Skip if is an operator Or if it is already a variable
      if ( !(isInArray(operators, raw_formula[i])) && !(isInArray(formulaVar, raw_formula[i])) ) { 
        formulaVar.push(raw_formula[i]);
        varNum += 1;
      }
    }
  }
  return [varNum, formulaVar];
}

function changeFormula (raw_formula) {
  raw_formulaArr = raw_fromula.split("");
}

input.formula.oninput = (event) => {
  formula_info.raw = input.formula.value;
  formula_info.operation = input.formula.value;

  let formula_rawArr = formula_info.raw.split("");
  for ( let i = 0; i < formula_rawArr.length; i += 1) {
    if ( !( isNumber(formula_rawArr[i]) ) ) {
      formula_info.var = {
        num: getVariables(formula_info.raw)[0],
        var_char: getVariables(formula_info.raw)[1],
      }
      console.log(formula_info);
    } else {
      alert("Intenta no Escribir números en la Formula");
    }
  }
}

/* Matrices Inversas para solucionar la formula */