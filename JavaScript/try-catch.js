try {
  console.log("Hello");
  throw "World";
  console.log("Universe");
} catch (err) {
  console.log(err);
}
