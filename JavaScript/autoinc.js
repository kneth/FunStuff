const autoInc = (() => {
    counter = 0;
    return () => counter++;
})();

for(let i = 0; i < 10; i++) {
    console.log(autoInc());
}