"use strict";

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
  text: ""
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

input.formula.oninput = function (event) {
  formula_info.raw = input.formula.value;
  formula_info.operation = formula_info.raw;
  var formula_rawArr = formula_info.raw.split("");

  for (var i = 0; i < formula_rawArr.length; i += 1) {
    if (!isNumber(formula_rawArr[i])) {
      formula_info["var"] = {
        num: getVariables(formula_info.raw)[0],
        var_char: getVariables(formula_info.raw)[1]
      };
    } else {
      alert("Intenta no Escribir números en la Formula");
    }
  }
};

input.startBtn.onclick = function (event) {
  changeTableLayout(formula_info["var"].num, formula_info["var"].var_char);
};
/* Matrices Inversas para solucionar la formula */