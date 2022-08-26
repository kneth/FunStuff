let arr = [
	{ u: "foo", time: new Date(1646839715511) },
	{ u: "bar", time: new Date(1646839719183) },
	{ u: "foobar", time: new Date(1646839716997) }
];

let winner = arr.reduce((prev, current) => prev.time.getTime() > current.time.getTime() ? prev : current);
console.log(winner);
