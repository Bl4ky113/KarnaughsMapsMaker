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

function getVariables (obj_val) {
  let varNum = 0;
  let formulaVar = [];

  obj_val = obj_val.split("");
  for (let i = 0; i <= obj_val.length; i += 1) {
    if (typeof obj_val[i] === "string") {
      if ( !(operators.indexOf(obj_val[i]) >= 0) ) { // Skip if is an operator
        formulaVar.push(obj_val[i]);
        varNum += 1;
      }
    }
  }

  return [varNum, formulaVar];
}

input.formula.oninput = (event) => {
  
}

input.formula.onchange = (event) => {
  let obj = event.target;
  let val = obj.value;

  var varInfo = getVariables(val);
}