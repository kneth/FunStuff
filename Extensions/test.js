var funstuff = require('funstuff');

var book = new funstuff.Book();

var p1 = new funstuff.Person();
p1.firstname = 'Arthur';
p1.lastname  = 'Clarke';
p1.birthday  = new Date(1917, 11, 16);  // month is zero-based
console.log(p1.firstname + " " + p1.lastname + ": "+ p1.birthday);

book[0] = ['Peter', 'Hamilton', new Date(1960, 02, 02)];
console.log(book.length());

book.add(p1);
console.log(book.length());


// Enumerator
for (i in book) {
    if (typeof(book[i]) != 'function') {
        console.log(book[i].firstname);
    }
}

// Apply
var s = book.apply(function (b) {
    return b.length();
});    
console.log("Length: "+s);

// Apply with exception
try {
    var s = book.apply(function (b) {
        throw { msg: "Error" };
    });
    console.log("Length: "+s);
}
catch (e) {
    console.log("Exception caught: "+e.msg);
}


// Anonymous function
book.each(function (p) {
    console.log(p.lastname+", "+p.firstname)
});


// Wrong arguments
console.log("Wrong arguments");
try {
    book.add();
}
catch (e) {
    console.log("Error: " + e);
}


var p3 = book.lookup("Peter");
console.log("Peter's last name is "+p3.lastname);

console.log("Deleting Peter");
delete book[0];
console.log(book.length());

