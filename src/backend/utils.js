const {MongoClient, ObjectId} = require('mongodb');

class Instance{
    uri = "mongodb://localhost:27017"; // URI to mongoDB instacne. Be good to put this as a proxy and/or obfuscate lol
    dbName; // Generic string for identifying DB to interact with
    collName; // Igualmente for colllection name
    payload = []; // Where I'm expecting post data to go. Dunno if I wanna seperate incoming/outgoing payloads but that seems like a good idea
    errorStack = null; // How I'm currently passing along error codes from MongoDB to other sources for debugging atm
    retries = 3; // Maximum number of retry attemps for reading and writing
    delay = 1; // Delay inbetween retries (counts in milliseconds)

    // Constructors
    constructor(dbname, collname) {
        this.client = new MongoClient(this.uri, {
            serverSelectionTimeoutMS: 5000, //Time out for server - set for 5 seconds
        });
        this.dbName = dbname;
        this.collName = collname;
    }

    // Setters
    setDB(name) {
        if (typeof(name) === "string")
            this.dbName = name;
        else
            throw TypeError("Instance: DB name provided unnacceptable.");
    }

    setColl(name) {
        if (typeof(name) === "string")
            this.collName = name;
        else
            throw TypeError("Instance: Collection name provided unnacceptable.");
    }

    reset() {
        if (this.payload.length > 0)
            this.payload = [];
        if (this.errorStack !== null)
            this.errorStack = null;
    }

    async connect(){
        console.log("Instance: Attempting to connect to DB...");

        if ((this.collName === undefined) || (this.dbName === undefined))
            throw new Error("Instance: No DB or collection provided. Cannot connect to MongoDB.");

        await this.client.connect();
        console.log(`Instance: Connected to DB!`);

        return await this.client.db(this.dbName).collection(this.collName);
    }

    async read(params = {}, projs = [], sort = {}, group) {
        // NOTE: Blindly finds data
        // NOTE: group doesn't do shit rn!
        this.reset();
        let pipeline = [{$match : params}];
        if (projs.length > 0) pipeline.push({$unset : projs});
        if (Object.entries(sort).length > 0) pipeline.push({$sort : sort});
        if (group !== undefined) console.log("Get Prankd!"); 

        try {
            const coll = await this.connect();
            const cursor = await coll.aggregate(pipeline);
            this.payload = await cursor.toArray();

            console.log(`Instance: Posts pulled with aggregate!!`);

        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured when retrieving posts from DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async write(data, concern = {}) {
        /*
         * data = array of objects to be inserted
         * concern = object where we can define "write concern" {w, j, wtimeout}
         *  w: (int) how many (specified) instances need to confirm their write
         *  j: (boolean) whether or not write has been written to on-disk journal
         *  wtimeout: (int) representing timelimit on waiting for prev 2 confirms in ms 
         */
        // NOTE: Blindly inserts data
        if (Object.entries(concern).length > 0) console.log("Get rekt");
        this.reset();

        try {
            if ((typeof(data) !== "object") || (typeof(concern) !== "object"))
                throw TypeError("Instance: push(): arguments are of incorrect type");
            
            if (data.length === 0) throw new Error("Instance: No entries to add.");

            console.log("Instance: data received: ");
            console.log(data);

            const coll = await this.connect();
            this.payload = [await coll.insertMany(data)]; // Payload contains result object
            console.log(`Instance: ${this.payload[0].insertedCount} Posts inserted!`);
        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured when pushing posts to DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async del(params = {}) {
        this.reset();
        try {
            const coll = await this.connect();
            this.payload = [await coll.deleteMany(params)];
            console.log(`Instance: ${this.payload[0].deletedCount} Posts deleted!`);
        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured trying to remove posts from DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async edit(target, edits){
        this.reset();
        try {
            if (target === undefined || edits === undefined)
                throw new Error("Undefined target or edits");

            const coll = await this.connect();

            console.log(`Instance: performing the following edits on ${target}:`);
            console.log(edits);

            this.payload = [await coll.updateOne({_id : new ObjectId(target)}, {$set: edits})];

        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured while modifying post in DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    async move(target) {
        this.reset();
        try {
            if (target === undefined)
                throw new Error("Undefined target identifier");

            const coll = await this.connect();

            // pulling post from limbo
            var cursor = await coll.find({_id : new ObjectId(target)});
            var post = await cursor.toArray();
            post = post[0]; // I'm so fucking tired

            // Constructing your average migration pipeline
            let pipeline = [
                {$match : {_id: post._id}},
                {$project : {
                    type : 0,
                    status : 0 
                }},
                {$merge : {
                    into: post.type === "resource" ? "resources" : post.type,
                    on : "_id",
                    whenNotMatched: "insert",
                    whenMatched: 'fail'
                }}
            ];
             /* if advice is being migrated, do a whole bunch of field mapping 
              * because I can't be fucked to refactor all documents in a collection rn  */
            if (post.type === 'advice') {
                pipeline.splice(1, 0, {$set : {
                    author : post.anon === "anon" ? "Anonymous" : post.uploader,
                    content : post.description,                        
                    timeAgo : post.uploadDate,
                    tag : post.tags
                }});
            }
            // Perform the move
            cursor = await coll.aggregate(pipeline);

            this.payload.push(await cursor.toArray());

            // And now we delete the post from Limbo b/c apparently aggregate doesn't do so?
            this.payload.push(await coll.deleteOne({_id : post._id}));

        } catch (e) {
            this.errorStack = e;
            console.error(`Instance: An error occured while moving post in DB:\n${e}`);
        } finally {
            this.client.close();
        }
    }

    // async retryOperation(operation) {
    //     while (attempt < retries){
    //         try{
    //             return await operation();
    //         } catch (error){
    //             attempt++;
    //             console.error(`Attempt ${attempt} failed: ${error.message}`);
    //             if (attemtp >= retries){
    //                 throw new Error(`Operation failed aftedr ${retries} attempts: ${error.message}`);
    //             }
    //             console.log(`Retrying in ${delay}ms...`);
    //             await new Promise(res => setTimeout(res, delay)); //wait befor trying again
    //         }
    //     }
    // }


    // Getters
    getPayload() { return this.payload; }
    getErrorMsg() { return (this.errorStack !== null) ? this.errorStack.message : null}
}

async function pullReq(instance, req, res) {
    // Parsing incoming parameters object to construct query parameter
    const query = {}; // Defines parameters in which to pull data
    const projs = []; // Defines fields that will be sent to client
    const sort = {}; // Defines order in which to send to client

    // TODO: SANITIZE
    for (const[key, value] of Object.entries(req.query)) {
        if (key === "search") {
            query['$text'] = {$search:value};
        } else if (key === "process" && value) {
        } else if (key === "sort") {
            // console.log(`Sort by ${value}`);
            switch (value) {
              case "mostRecent":
                sort["timeAgo"] = 1;
                break;

              case "mostLiked":
                sort["likes"] =  -1;
                break;

              default:
                    // Respond back to client that sort criteria wasn't recognized
                    res.json({
                        message : "Failed to display posts :(",
                        errorMsg : "Error: sort criteria unrecognized.",
                    });
                break;
            }

        }else query[key] = value;
    }

    // Passing query parameter to pull() method
    await instance.read(query, projs, sort);

    if (instance.getErrorMsg() !== null) {
        res.status(500).json({ // Changed to handle other additonal sever errors
            message : "Failed retrieving posts :(",
            errMsg : instance.getErrorMsg()
        });
        console.log("pullReq: Error retrieving posts from DB.");
    } else {
        res.json({
            message: "posts incoming!",
            payload: instance.getPayload()
        });
        console.log(`Server: ${instance.getPayload().length} posts successfully sent to client.`);
    }
};

async function postReq(instance, req, res) {

    if (Object.keys(req.body).includes("edits")) { /* Incoming data is an edit */
        console.log(`Edit reqeuest on ${req.body}`);
        await instance.edit(req.body.post, req.body.edits);

    } else if (Object.keys(req.body).includes('status')) { /* a post has been accepted or rejected */
        console.log(`postReq: Incoming post ${req.body.post} was ${req.body.status}`);
        if (req.body.status === "rejected") {
            console.log(`Deleting object ${req.body.post}`);
            await instance.del({_id : new ObjectId(req.body.post)});

        } else if (req.body.status === "approved") {
            // TODO: instance.move()
            console.log(`Moving object ${req.body.post}!`);
            await instance.move(req.body.post);
        }

    } else { /* Incoming data is a new post */
        // NOTE: THIS FUNCTION HAS NOT BEEN CONFIRMED TO PERFORM INPUT SANITATION
        // TODO: SANITIZE!
        let entry = {};
        Object.entries(req.body).forEach(([key,value]) => {
            entry[key] = value;
        });

        entry["status"] = "pending";

        // Passing data to push to DB
        await instance.write([entry]);
    }

    /* constructing response */
    if (instance.getErrorMsg() !== null) {
        res.status(500).json({ // Changed to handle other additonal sever errors
            message : "Failed writing posts :(",
            errMsg : instance.getErrorMsg()
        });
        console.log("postReq: Error writing posts to Limbo.");
    } else {
        res.json({
            message: "posts written!",
            payload: instance.getPayload()
        });
        console.log(`Server: ${instance.getPayload()[0].insertedCount} posts successfully written to DB.`);
    }
}

module.exports = {Instance, pullReq, postReq};
