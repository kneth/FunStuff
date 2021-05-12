const fs = require("fs");

const dir = fs.readdirSync("/tmp");
for (let dirent of dir) {
    console.log(`${dirent}`);
}
