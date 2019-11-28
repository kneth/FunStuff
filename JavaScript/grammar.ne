@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives

@{%
const Fraction = require('./fraction');
%}

expr -> fraction _ "+" _ fraction {% (data) => {
    let f = data[0].add(data[4]);
    return f;
}
%}
fraction -> int _ "/" _ int {% (data) => {
    return new Fraction(data[0], data[4]);
}
%}
