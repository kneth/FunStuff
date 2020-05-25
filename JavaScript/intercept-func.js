const handler = {
	get(target, prop) {
		return (...args) => {
			console.log(`${JSON.stringify(prop)}:${JSON.stringify(args)}`);
		}
	}
};

let mainObject = {
	functions: new Proxy({}, handler)
};

mainObject.functions.fun1('Hello, World');
let c = mainObject.functions.fun2(1, 2);
mainObject.functions.fun3('Oops');
