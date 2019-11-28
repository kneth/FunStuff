const nearley = require("nearley");
const grammar = require("./grammar.js");

const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

const expr = '1/2 + 4/7';
parser.feed(expr);
console.log(`${expr} = ${parser.results.toString()}`);