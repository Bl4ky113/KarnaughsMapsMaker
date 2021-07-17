// Made By Bl4ky113

const get = {
  id: document.getElementById.bind(document),
  class: document.getElementsByClassName.bind(document)
};

const input = {
  formula: get.id("input_formula"),
  varNum: get.id("input_num-variables"),
  startBtn: get.id("input_start")
}

input.formula.onchange = (event) => {
  let obj = event.target;
  let val = obj.value;

  getVariables(val)
}

function getVariables (obj_val) {
  
}