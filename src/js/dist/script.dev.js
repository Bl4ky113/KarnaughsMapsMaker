"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Made By Bl4ky113
var get = {
  id: document.getElementById.bind(document),
  "class": document.getElementsByClassName.bind(document)
};
var input = {
  formula: get.id("input_formula"),
  startBtn: get.id("input_start")
};
var output = {
  table: get.id("output_table")
};
var operators = ["+", "*", "-", "(", ")"];
var value_var = ["00", "01", "10", "11"];
var formula_info = {
  raw: "",
  operation: "",
  text: "",
  results: {}
};

function isNumber(_char) {
  if (isNaN(parseInt(_char))) {
    return false;
  } else {
    return true;
  }
}

function isInArray(array, _char2) {
  if (array.indexOf(_char2) >= 0) {
    return true;
  } else {
    return false;
  }
}

function getVariables(raw_formula) {
  var varNum = 0;
  var formulaVar = [];
  raw_formula = raw_formula.split("");

  for (var i = 0; i <= raw_formula.length; i += 1) {
    if (typeof raw_formula[i] === "string" && !isNumber(raw_formula[i])) {
      // Skip if is an operator Or if it is already a variable
      if (!isInArray(operators, raw_formula[i]) && !isInArray(formulaVar, raw_formula[i])) {
        formulaVar.push(raw_formula[i]);
        varNum += 1;
      }
    }
  }

  return [varNum, formulaVar];
} // Change the content of the input in the Formula


function changeFormula(raw_formula) {
  raw_formulaArr = raw_fromula.split("");
}

function changeTableLayout(num_var, varArr) {
  // Delete every single Obj within the table
  for (var i = 1; output.table.childNodes.length >= 1; i += 1) {
    output.table.removeChild(output.table.childNodes[0]);
  }

  output.table.className = "table table--var".concat(num_var);
  var rowNum = 0;
  var colNum = 0;
  var value_div_row = [];
  var value_div_col = [];

  for (var _i = 0; 4 > _i; _i += 1) {
    value_div_row.push(document.createElement("div"));
    value_div_row[_i].className = "value";
    value_div_row[_i].innerHTML = value_var[_i];
    value_div_col[_i] = value_div_row[_i].cloneNode(true);
  }

  var separator = "<div class=\"separator\"></div>";
  var variables_div = document.createElement("div");
  variables_div.className = "variables";

  if (num_var === 2) {
    variables_div.innerHTML = "".concat(varArr[0], " ").concat(separator, " ").concat(varArr[1]);
    rowNum = 2;
    colNum = 2;
  } else if (num_var === 3) {
    variables_div.innerHTML = "".concat(varArr[0], " ").concat(separator, " ").concat(varArr[1]).concat(varArr[2]);
    rowNum = 4;
    colNum = 2;
  } else if (num_var === 4) {
    variables_div.innerHTML = "".concat(varArr[0]).concat(varArr[1], " ").concat(separator, " ").concat(varArr[2]).concat(varArr[3]);
    rowNum = 4;
    colNum = 4;
  }

  output.table.appendChild(variables_div);

  for (var _i2 = 0; rowNum > _i2; _i2 += 1) {
    if (rowNum == 2) {
      value_div_row[_i2].innerHTML = value_div_row[_i2].innerHTML.substring(1);
    }

    output.table.appendChild(value_div_row[_i2]);
  }

  for (var _i3 = 0; colNum > _i3; _i3 += 1) {
    if (colNum == 2) {
      value_div_col[_i3].innerHTML = value_div_col[_i3].innerHTML.substring(1);
    }

    output.table.appendChild(value_div_col[_i3]);

    for (var e = 0; rowNum > e; e += 1) {
      var result_div = document.createElement("div");
      result_div.className = "result";
      result_div.innerHTML = "1";
      output.table.appendChild(result_div);
    }
  }
}

function getBinFormulaValues(num_variables) {
  var binValues = [];
  var dec_num = 0;

  for (var i = 0; i < Math.pow(num_variables, 2); i += 1) {
    dec_num = i;
    var str_num = dec_num.toString(2);
    var arr_num = str_num.split("");

    while (arr_num.length !== num_variables) {
      arr_num = ["0"].concat(_toConsumableArray(arr_num));
    }

    binValues.push(arr_num);
  }

  return binValues;
}

function calcFormula(operation, variables, num_variables) {
  // Change the Formula to a Logial or operational formula
  var binValues = getBinFormulaValues(num_variables);
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

input.formula.oninput = function (event) {
  formula_info.raw = input.formula.value.toUpperCase();
  formula_info.operation = formula_info.raw.split(""); // Check if there's any number in the Formula, which is bad btw

  var formula_rawArr = formula_info.raw.split("");

  for (var i = 0; i < formula_rawArr.length; i += 1) {
    if (!isNumber(formula_rawArr[i])) {
      var variables = getVariables(formula_info.raw);
      formula_info["var"] = {
        num: variables[0],
        var_char: variables[1]
      };
    } else {
      alert("Intenta no Escribir números en la Formula");
    }
  }
};

input.startBtn.onclick = function (event) {
  calcFormula(formula_info.operation, formula_info["var"].var_char, formula_info["var"].num);
  changeTableLayout(formula_info["var"].num, formula_info["var"].var_char);
};
/* Matrices Inversas para solucionar la formula */