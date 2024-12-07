const {MongoClient} = require('mongodb');
const Database = require('./utils.js').Instance;

let maliciousData = [
    {
        // _id is created by instance
        "title" : "New Post",
        "uploader" : "your.mom@school",
        "content" : "lor^em ipsum",
        "link" : 'https://havibeenpwnd.com/',
        "tags" : "sch$ool",
        "cate.gory" : "",
        "type" : "resource",
        "anonymous" : false,
        // pending is added by instance
    }
]

let data = [
    {
        // _id is created by instance
        title : "New Post",
        uploader : "your.momschool",
        "con.tent" : "lorem ipsum",
        link : 'https://havibeenpwnd.com/',
        tags : "school",
        category : "",
        type : "resource",
        anonymous : false,
        // pending is added by instance
    }
]

let data2 = [
    { "_id": 1, "color": "red" },
    { "_id": 2, "color": "purple" },
    { "_id": 1, "color": "yellow" },
    { "_id": 3, "color": "blue" }
]

let params = {"color" : "purple"};
let projs = {};

async function get() {
    const instance = new Database("Posts", "limbo");
    await instance.pull(params);
    console.log(instance.getPayload());
}

async function post() {
    const instance = new Database("Posts", "limbo");
    await instance.push(maliciousData);
    console.log(instance.getPayload());
}

async function wipe() {
    const instance = new Database("Posts", "limbo");
    await instance.del(params);
    console.log(instance.getPayload());
}

// data2.forEach((i) => {
//     Object.keys(i).forEach((key) => {
//         console.log(key);
//         console.log(key.match(/^[0-9a-zA-Z]+$/) === null);
//     });
// });

// post();
wipe();

// get();
