// Made By Bl4ky113

const get = {
  id: document.getElementById.bind(document),
  class: document.getElementsByClassName.bind(document),
  inArr: (arr, val) => { return arr.indexOf(val) >= 0 ? true : false; }
};

const input = {
  formula: get.id("input_formula"),
  startBtn: get.id("input_start")
};

let output = {
  table: get.id("output_table")
};

var formula_info = {
  raw: "",
  operation: "",
  text: "",
  results: {},
  ready_to_go: true
};

const operators = ["+", "*", "-", "(", ")"],
      gate = {
        or: (value_1, value_2) => { let operation = value_1 + value_2; return (operation >= 1 ? "1" : "0"); },
        and: (value_1, value_2) => { let operation = value_1 + value_2; return (operation > 1 ? "1" : "0"); },
        not: (value_1) => { return (value_1 == 1 ? "0" : "1"); }
      };

// Change the content of the input in the Formula
function changeFormula (raw_formula) {
  raw_formulaArr = raw_fromula.split("");
}

function getVariables (arr_formula) {
  let var_obj = {
    num_variables: 0,
    formula_variables: [],
    num_results: {
      row: 0,
      col: 0,
    }
  };

  arr_formula.forEach(element => {
    let conditional_1 = typeof element === "string" && isNaN(parseInt(element)),
        conditional_2 = !get.inArr(operators, element) && !get.inArr(var_obj.formula_variables, element);
    if (conditional_1 && conditional_2) {
      var_obj.formula_variables.push(element);
      var_obj.num_variables += 1;
    }
  });

  var_obj.formula_variables.forEach((element, index) => { ((index + 1) % 2 == 0) ? var_obj.num_results.row += 2 : var_obj.num_results.col += 2; })
  var_obj.num_results.num = var_obj.num_results.row * var_obj.num_results.col;

  return var_obj;
}

function calcFormula (operation, variables, num_variables, num_results) { 
  // Change the Formula to a Logial or operational formula
  let binValues = getBinFormulaValues(num_variables, num_results.num),
      results_arr = [],
      results_obj = {};

  binValues.forEach((binArr) => {
    if (formula_info.ready_to_go === false) { return; }

    let logical_operation = [...operation];

    logical_operation.forEach((element, index) => {
      if (get.inArr(variables, element)) {
        let index_logical_value = variables.indexOf(element);
        logical_operation[index] = binArr[index_logical_value];
      }
    })
    
    // Calculate the Logical Operation in the PEMDAS System.
    let logical_not_output = calcGate(logical_operation, gate.not, 2),
        logical_and_output = calcGate(logical_not_output, gate.and, 1),
        logical_or_output = calcGate(logical_and_output, gate.or, 0);
    
    if (logical_or_output != logical_operation) { logical_operation = [...logical_or_output]; }
    
    if (logical_operation.length > 1 && formula_info.ready_to_go === true) {
      alert("Debes ingresar una Formula con Operadores Lógicos Validos");
      formula_info.ready_to_go = false;
      return;
    } else {
      logical_operation = logical_operation.join();
      results_arr.push(logical_operation);
    }  
  })

  // Return the results from the operation in order (row_i: col_1 col_2... col_i) 
  let row_index = 0;
  for (let i = 0; i < num_results.row; i += 1) {
    let results_columns = [];

    for (let e = 0; e < num_results.col; e += 1) results_columns.push(results_arr[e + row_index]);

    results_obj[`row_${i}`] = [...results_columns];

    row_index += num_results.col;
  }

  return results_obj;
  
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

function getBinFormulaValues (num_variables, num_results) {
  let binValues = [],
      dec_num = 0;
  for (let i = 0; i < num_results; i += 1) {
    dec_num = i;

    let str_num = (dec_num).toString(2),
        arr_num = str_num.split("");

    while (arr_num.length !== num_variables) { arr_num = ["0", ...arr_num]; }

    binValues.push(arr_num);
  }
  return binValues;
}

function calcGate (logical_operation, logical_gate_function, logical_operator_index) {
  const gate_info = checkForGates(logical_operator_index, logical_operation);
  let result_operation = [...logical_operation];
  
  if (gate_info.thereIsGates === true) {
    let current_operation = [],
        correction_index = 1,
        increment_correction_index = 2,
        num_to_del = 3;
    
    if (logical_operator_index === 2) {
      correction_index = 0,
      increment_correction_index = 1,
      num_to_del = 2;
    }

    // Get Every single individual operation in the formula
    gate_info.index_gates.forEach(element => {
      current_operation = [...result_operation];
      current_operation = current_operation.splice(element - correction_index, num_to_del);

      // Do the operation
      let result = 0;

      if (logical_operator_index === 2) {
        let val_1 = parseInt(current_operation[1]);

        result = logical_gate_function(val_1);
      } else {
        let val_1 = parseInt(current_operation[0]),
            val_2 = parseInt(current_operation[2]);

        result = logical_gate_function(val_1, val_2);
      }

      result_operation.splice(element - correction_index, num_to_del, result),
      correction_index += increment_correction_index;
    })
  }
  return result_operation;
}

function checkForGates (index_gate, logical_operation) {
  let gate_operation = [...logical_operation],
      info_obj = {
        thereIsGates: false,
        numGates: 0,
        index_gates: []
      };

  gate_operation.forEach(element => { if (element === operators[index_gate]) { 
    info_obj.thereIsGates = true;
    info_obj.numGates += 1;
    info_obj.index_gates.push(gate_operation.indexOf(element));
    gate_operation[gate_operation.indexOf(element)] = null;
  }});
  return info_obj;
}

function changeTableLayout (num_var, var_arr, num_results, results_obj) {
  // Delete every single Obj within the table
  while (output.table.childNodes.length > 0) { output.table.removeChild(output.table.childNodes[0]); }
  output.table.className = `table table--var${num_var}`;

  // Add the Variables Cell
  let separator = `<div class="separator"></div>`;

  var_arr.splice(Math.floor(var_arr.length / 2), 0, separator),
  var_arr = var_arr.join("");
  
  let variables_div = document.createElement("div");
      variables_div.className = "variables";
      variables_div.innerHTML = var_arr;

  output.table.appendChild(variables_div);

  // Add the Column Values of the Variables
  let bin_val = {
    col: getBinFormulaValues(num_results.col / 2, num_results.col),
    row: getBinFormulaValues(num_results.row / 2, num_results.row)
  };

  for (let i = 0; num_results.col > i; i += 1) {
    let value_div = document.createElement("div");
        value_div.className = "value";
        value_div.innerHTML = bin_val.col[i].join("");

    output.table.appendChild(value_div);
  }
  
  // Add the Row Values of the Variables
  for (let i = 0; num_results.row > i; i += 1) {
    let value_div = document.createElement("div");
        value_div.className = "value";
        value_div.innerHTML = bin_val.row[i].join("");

    output.table.appendChild(value_div);

    // Add the Results of the Operation
    results_obj[`row_${i}`].forEach(element => {
      let result_div = document.createElement("div");
          result_div.className = "result";
          result_div.innerHTML = element;

      output.table.appendChild(result_div);
    })
  }
}

input.formula.oninput = (event) => {
  formula_info.raw = input.formula.value.toUpperCase();
  formula_info.operation = formula_info.raw.split("");
  formula_info.ready_to_go = true;
}

input.startBtn.onclick = (event) => {
  formula_info.var = getVariables(formula_info.operation);

  if (input.formula.value === "") {
    alert("Primero debes ingresar una formula valida");
    formula_info.ready_to_go = false;
  } else {
    if (formula_info.var.num_variables < 2 || formula_info.var.num_variables > 4) {
      alert("Debes Ingresar una formula que tenga entre 2 y 4 variables");
      formula_info.ready_to_go = false;
    }
  }

  formula_info.results = calcFormula(
    formula_info.operation, 
    formula_info.var.formula_variables, 
    formula_info.var.num_variables, 
    formula_info.var.num_results
  );

  if (formula_info.ready_to_go === true) {
    changeTableLayout(
      formula_info.var.num_variables, 
      formula_info.var.formula_variables, 
      formula_info.var.num_results, 
      formula_info.results
    );
  }
}

/* Matrices Inversas para solucionar la formula */