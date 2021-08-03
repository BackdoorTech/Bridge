// import { Parser } from 'expr-eval-ex'
const Parser = require("expr-eval-ex").Parser;

let _stringOperator = new Parser({
  operators: {
    // These default to true, but are included to be explicit
    add: true,
    concatenate: true,
    conditional: true,
    divide: true,
    factorial: true,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,

    // Disable and, or, not, <, ==, !=, etc.
    logical: true,
    comparison: true,

    // The in operator is disabled by default in the current version
    'in': true
  }
});


let _valueParser = new Parser({
  operators: {
    // These default to true, but are included to be explicit
    add: true,
    concatenate: true,
    conditional: true,
    divide: true,
    factorial: true,
    multiply: true,
    power: true,
    remainder: true,
    subtract: true,

    // Disable and, or, not, <, ==, !=, etc.
    logical: false,
    comparison: false,

    // The in operator is disabled by default in the current version
    'in': true
  }
});

_stringOperator
export const stringOperator = (opration: string, data: any) =>  _stringOperator.evaluate(opration, data)
export const valueParser = (opration: string, data: any) =>  _valueParser.evaluate(opration, data)


// window['stringOperator'] = stringOperator
// window['valueParser'] = valueParser
