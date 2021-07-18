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
var operators = ["+", "*", "-", "(", ")"];

function getVariables(obj_val) {
  var varNum = 0;
  var formulaVar = [];
  obj_val = obj_val.split("");

  for (var i = 0; i <= obj_val.length; i += 1) {
    if (typeof obj_val[i] === "string") {
      if (!(operators.indexOf(obj_val[i]) >= 0)) {
        // Skip if is an operator
        formulaVar.push(obj_val[i]);
        varNum += 1;
      }
    }
  }

  return [varNum, formulaVar];
}

input.formula.oninput = function (event) {};

input.formula.onchange = function (event) {
  var obj = event.target;
  var val = obj.value;
  var varInfo = getVariables(val);
};