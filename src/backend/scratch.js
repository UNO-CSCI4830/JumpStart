const {MongoClient} = require('mongodb');
const Database = require('./utils.js').Instance;


async function get(params, projs, sort, group){
    const instance = new Database("Posts", "limbo");
    await instance.pull(params, projs, sort, group);
    console.log(instance.getPayload());
    console.log(instance.getPayload().length);
}

async function post(data) {
    const instance = new Database("Posts", "limbo");
    await instance.push(data);
    console.log(instance.getPayload());
}

async function wipe(params) {
    const instance = new Database("Posts", "limbo");
    await instance.del(params);
    console.log(instance.getPayload());
}

let maliciousData = [
    {
        // _id is created by instance
        "ti.tle" : "New Post",
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

// data2.forEach((i) => {
//     Object.keys(i).forEach((key) => {
//         console.log(key);
//         console.log(key.match(/^[0-9a-zA-Z]+$/) === null);
//     });
// });

// post();
// wipe();

// get({color:"red"});
// get({color:"purple"});
// get({title:"New Post"});
// get({"ti.tle":"New Post"});
get({"type": "resource"}, [], {uploadDate: -1});
// get({});
