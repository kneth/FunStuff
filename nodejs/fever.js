const sleep = (ms) => new Promise(() => setTimeout(() => Promise.resolve(), ms));
const fever = async () => {
    await sleep(1000);
    const temperature = Math.random()*5 + 37;
    console.log(temperature);
    if (temperature < 38) {
        return Promise.resolve();
    }
    await fever();
};

await fever();
