const Database = require('./utils.js');
const get = require('./server').handleQuery;
const server = require('./server').server;

async function posts() {
    let params = {};
    let projs = {};
    const instance = new Database("advice", "");
    const request = await get('/api/advice', instance);
    console.log(request);
    server.close();
    // await instance.pull(params,projs);
}

posts();
