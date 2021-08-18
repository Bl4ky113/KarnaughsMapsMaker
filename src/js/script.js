// Made By Bl4ky113

const get = {
  id: document.getElementById.bind(document),
  class: document.getElementsByClassName.bind(document)
};

const input = {
  formula: get.id("input_formula"),
  startBtn: get.id("input_start")
};

let output = {
  table: get.id("output_table")
};

const operators = [
  "+",
  "*",
  "-",
  "(",
  ")"
];

const value_var = [
  "00", 
  "01", 
  "10", 
  "11"
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

// Change the content of the input in the Formula
function changeFormula (raw_formula) {
  raw_formulaArr = raw_fromula.split("");
}

function changeTableLayout (num_var, varArr) {
  // Delete every single Obj within the table
  for (let i = 1; output.table.childNodes.length >= 1; i += 1) {
    output.table.removeChild(output.table.childNodes[0]);
  }

  output.table.className = `table table--var${num_var}`;
  
  let rowNum = 0;
  let colNum = 0;

  let value_div_row = [];
  let value_div_col = [];

  for (let i = 0; 4 > i; i += 1) {
    value_div_row.push(document.createElement("div"));
    value_div_row[i].className = "value";
    value_div_row[i].innerHTML = value_var[i];
    
    value_div_col[i] = value_div_row[i].cloneNode(true);
  }

  let separator = `<div class="separator"></div>`;
  let variables_div = document.createElement("div");
  variables_div.className = "variables";

  if (num_var === 2) {
    variables_div.innerHTML = `${varArr[0]} ${separator} ${varArr[1]}`

    rowNum = 2;
    colNum = 2;
  } else if (num_var === 3) {
    variables_div.innerHTML = `${varArr[0]} ${separator} ${varArr[1]}${varArr[2]}`

    rowNum = 4;
    colNum = 2;
  } else if (num_var === 4) {
    variables_div.innerHTML = `${varArr[0]}${varArr[1]} ${separator} ${varArr[2]}${varArr[3]}`

    rowNum = 4;
    colNum = 4;
  }
  output.table.appendChild(variables_div);

  for (let i = 0; rowNum > i; i += 1) {
    if (rowNum == 2) {
      value_div_row[i].innerHTML = value_div_row[i].innerHTML.substring(1);
    }
    output.table.appendChild(value_div_row[i]);
  }
  
  for (let i = 0; colNum > i; i += 1) {
    if (colNum == 2) {
      value_div_col[i].innerHTML = value_div_col[i].innerHTML.substring(1);
    }
    output.table.appendChild(value_div_col[i]);

    for (let e = 0; rowNum > e; e += 1 ) {
      let result_div = document.createElement("div");
      result_div.className = "result";
      result_div.innerHTML = "1";
      output.table.appendChild(result_div);
    }
  }
}

input.formula.oninput = (event) => {
  formula_info.raw = input.formula.value;
  formula_info.operation = formula_info.raw;

  let formula_rawArr = formula_info.raw.split("");
  for ( let i = 0; i < formula_rawArr.length; i += 1 ) {
    if ( !( isNumber(formula_rawArr[i]) ) ) {
      formula_info.var = {
        num: getVariables(formula_info.raw)[0],
        var_char: getVariables(formula_info.raw)[1],
      }
    } else {
      alert("Intenta no Escribir números en la Formula");
    }
  }
}

input.startBtn.onclick = (event) => {
  changeTableLayout(formula_info.var.num, formula_info.var.var_char);
}

/* Matrices Inversas para solucionar la formula */