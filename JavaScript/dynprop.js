const getKey = (() => {
    let n = 0;
    return () => {
        n++;
        return `keý-${n}`;
    };
})();

const obj1 = {
    [getKey()]: "foo",
    [getKey()]: "bar",
};
const obj2 = {
    [getKey()]: "foobar",
};

console.log("obj1 = ", JSON.stringify(obj1));
console.log("obj2 = ", JSON.stringify(obj2));
