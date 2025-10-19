const obj = {
    "a": 1,
    "b": true,
    "c": {
        "d": 3,
        "e": "test"
    }
};

function flatten(obj) {
	result = {};
	Object.keys(obj).forEach(key => {
		if (typeof obj[key] === "object") {
			Object.entries(flatten(obj[key])).forEach(elem => result[`${key}.${elem[0]}`] = elem[1]);
		} else {
			result[key] = obj[key];
		}
	});
	return result;
}

console.log(JSON.stringify(flatten(obj)));
