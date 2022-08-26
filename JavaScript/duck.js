function Person(name, age) {
  this.name = name;
  this.age = age;
}

let obj= Object.create({});
Object.setPrototypeOf(obj, new Person());

console.log(typeof(obj));
