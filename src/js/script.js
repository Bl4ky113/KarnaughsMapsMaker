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
  text: "",
  results: {},
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
  let varNum = 0;
  let resVar = [0, 0];
  let formulaVar = [];

  raw_formula = raw_formula.split("");
  for (let i = 0; i < raw_formula.length; i += 1) {
    if (typeof raw_formula[i] === "string" && !(isNumber(raw_formula[i]))) {
      // Skip if is an operator Or if it is already a variable
      if ( !(isInArray(operators, raw_formula[i])) && !(isInArray(formulaVar, raw_formula[i])) ) { 
        formulaVar.push(raw_formula[i]);
        varNum += 1;
      }
    } else {
      alert("Intenta Ingresar solo Variables y sus Operadores Lógicos");
      break;
    }
  }

  for (let i = 0; i < formulaVar.length; i += 1) {
    if ((i + 1) % 2 == 0) resVar[0] += 2;
    else resVar[1] += 2;
  }

  return [varNum, resVar, formulaVar];
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

function getBinFormulaValues (num_variables, arr_results_num) {
  let binValues = [];
  let dec_num = 0;
  for (let i = 0; i < (arr_results_num[0] * arr_results_num[1]); i += 1) {
    dec_num = i;
    let str_num = (dec_num).toString(2);
    let arr_num = str_num.split("");

    while (arr_num.length !== num_variables) { arr_num = ["0", ...arr_num]; }

    binValues.push(arr_num);
  }
  return binValues;
}

function calcFormula (operation, variables, num_variables, arr_results_num) { 
  // Change the Formula to a Logial or operational formula
  let binValues = getBinFormulaValues(num_variables, arr_results_num);

  for (let i = 0; i < (arr_results_num[0] * arr_results_num[1]); i += 1) {
    let logical_operation = [...operation];
    for (let e = 0; e < logical_operation.length; e += 1) {
      if (isInArray(variables, operation[e])) {
        let index_logical_value = variables.indexOf(logical_operation[e]);
        logical_operation[e] = binValues[i][index_logical_value];
      }
    }
    console.log(logical_operation);
  }

  /* I want to leave this huge peace of code, and shit, as a mistake to learn from */
  // let values_formulas = [];
  // var values_variables = [];
  
  // for (let e = 0; e < num_variables ** 2; e += 1) {
  //   if (values_formulas.length >= 1) {
  //     let while_conditional = true;

  //     while (while_conditional) {
  //       values_variables = [];
  //       for (let i = 0; i < num_variables; i += 1) {
  //         let num = Math.floor(Math.random() * 2);
  //         if (num === 1) values_variables.push(1);
  //         else values_variables.push(0);
  //       }
        
  //       let true_values = []
  //       let equal_values = []

  //       for (let i = 0; i < values_formulas.length; i += 1) {
  //         true_values = []
  //         equal_values = []
  //         for (let o = 0; o < values_formulas[i].length && o < values_variables.length; o += 1) {
  //           true_values.push(true);
  //           if (values_formulas[i][o] == values_variables[o]) equal_values.push(true);
  //           else equal_values.push(false);
  //         }
  //       }

  //       if (!equal_values.every(t => true_values.includes(t))) {
  //         console.log("HELL YES"); 
  //         while_conditional = false;
  //       }
  //     }
  //   } else { for (let i = 0; i < num_variables; i += 1) values_variables.push(0); }
    
  //   // for (let i = 0; i < operation.length; i += 1) {
  //   //   if (isInArray(variables, operation[i])) {
  //   //     operation[i] = values_variables[i];
  //   //   }
  //   // }
  
  //   values_formulas.push(values_variables);
  //   console.log(values_formulas);
  // }
}

input.formula.oninput = (event) => {
  formula_info.raw = input.formula.value.toUpperCase();
  formula_info.operation = formula_info.raw.split("");

  // Check if there's any number in the Formula, which is bad btw
  let formula_rawArr = formula_info.raw.split("");
  let variables =  getVariables(formula_info.raw);
  formula_info.var = {
    num_var: variables[0],
    arr_num_res: variables[1],
    arr_var: variables[2]
  };
}

input.startBtn.onclick = (event) => {
  calcFormula(formula_info.operation, formula_info.var.arr_var, formula_info.var.num_var, formula_info.var.arr_num_res);
  changeTableLayout(formula_info.var.num_var, formula_info.var.arr_var);
}

/* Matrices Inversas para solucionar la formula */