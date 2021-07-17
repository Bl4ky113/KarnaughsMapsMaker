"use strict";

// Made By Bl4ky113
var get = {
  id: document.getElementById.bind(document),
  "class": document.getElementsByClassName.bind(document)
};
var input = {
  formula: get.id("input_formula"),
  varNum: get.id("input_num-variables"),
  startBtn: get.id("input_start")
};

input.formula.onchange = function (event) {
  var obj = event.target;
  var val = obj.value;
  getVariables(val);
};

function getVariables(obj_val) {}