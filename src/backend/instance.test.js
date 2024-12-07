// TEST Goals:
// x Instance can be loaded without issue
// x Instance can access be loaded and fail gracefully when missing parameters
// x Instance can pull from database with valid parameters
// x Instance can properly modify its attributes
// x Instance can perform operations according to assigned instance permissions
// x Instance can push to database with data of expected types
// Instance can properly delete existing data
// Instance can gracefully handle invalid fields
// Instance can gracefully handle invalid indexing
// Instance can gracefully handle malicious indexing

const Database = require('./utils').Instance;
describe('Testing Instance construction', () => {
    test('Creating resources DB instance', () => {
        const intent = {
            uri : "mongodb://localhost:27017",
            dbName : "Posts",
            collName : "limbo",
        }
        const instance = new Database("Posts", "limbo");
        expect(instance.uri).toMatch(intent.uri); // checking strings
        // Expecting tokens to exist in string:
        // toMatch(new RegExp("string"))!
        // toMatch("/string/");
        expect(instance.dbName).toMatch(intent.dbName);
        expect(instance.collName).toMatch(intent.collName);
        expect(instance.payload).toHaveLength(0); // Checking array initialized as empty
        expect(instance.payload).toBeDefined(); // array must be defined
        expect(instance.errorStack).toBeNull(); // Checking error
    });

    test('DB instance for advice is acceptable', () => {
        const instance = new Database("Posts", "advice");
        expect(instance.collName).toMatch("advice");
        // NOTE: or would it be better to do expect.any(Database), expect.any(), or check properties?
    });

    test('DB instance for resources is acceptable', () => {
        const instance = new Database("Posts", "resources");
        expect(instance.collName).toMatch("resources");
    });
    
    test('Instance requires specifying collection', async () => {
        // Essentially, restrict instance from accessing admin DB
        const instance = new Database("admin");
        await instance.pull({},{});
        expect(instance.getErrorMsg()).toMatch(new RegExp("collection"));
        expect(instance.getPayload()).toHaveLength(0);
    });
});

describe('Testing Instance operations', () => {
    // Now Construction has been handled, we will now test Getting/Setting!
    let instance;
    beforeEach(async () => {
        // assuming limbo, since that's where all posts go and what admins will use to vett
        instance = new Database("Posts", "limbo");
        await new Promise(r => setTimeout(r, 50)); // sleep
    });

    afterEach(() => {
        instance = null;
    });

    test("Changing Instance DB", () => {
        function alice () {
            instance.setDB("myDB");
        }
        function bob () {
            instance.setDB(42);
        } 
        expect(alice).not.toThrow();
        expect(bob).toThrow();
    });

    test("Changing Instance Collection", () => {
        function alice () {
            instance.setColl("myDB");
        }
        function bob () {
            instance.setColl(42);
        } 
        expect(alice).not.toThrow();
        expect(bob).toThrow();
    });


    test("Instance getter for payload works", async () => {
        expect(instance.getPayload()).toHaveLength(0);
        instance.payload = [1,2,3,4,5,6,7,8,9,0];
        expect(instance.getPayload()).toHaveLength(10);
    });

    test("Instance resets itself", () => {
        instance.payload = [1,2,3,4,5,6,7,8,9,0];
        expect(instance.getPayload()).toHaveLength(10);
        instance.errorStack = "Some error";
        expect(instance.errorStack).toBeDefined();
        instance.reset();
        expect(instance.getPayload()).toHaveLength(0);
        expect(instance.errorStack).toBeNull();

    });

    // Test find() succeeds
    test("Instance can pull all data from database", async () => {
        await instance.pull({},{});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload()).toHaveLength(22);
    });

    test("Instance pulls correct fields to be displayed", async () => {
        await instance.pull({}, {_id : 0});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload().length).toBeGreaterThan(0);
        expect(instance.getPayload()[0]).not.toHaveProperty('_id');
    });

    // Test find() fields with keywords
    test("Yes data with acceptable terms for acceptable fields", async () => {
        await instance.pull({tags : "Study tips"},{});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload().length).toBeGreaterThan(0);
        
        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.pull({category : "Academic"},{});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload().length).toBeGreaterThan(0);
    });

    test("No data with acceptable of fields but unacceptable search", async () => {
        await instance.pull({tags : "study tips"},{});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload()).toHaveLength(0);

        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.pull({category : "academic"},{});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload()).toHaveLength(0);

        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.pull({Cateogory : "aah"},{});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload()).toHaveLength(0);

        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.pull({tag : "aah"},{});
        expect(instance.errorStack).toBeNull();
        expect(instance.getPayload()).toHaveLength(0);
    });
});

describe('Testing Database Instance pushing', () => {
    const {MongoClient} = require('mongodb');
    let instance;
    const badData = [
        { "_id": 1, "color": "red" },
        { "_id": 2, "color": "purple" },
        { "_id": 1, "color": "yellow" },
        { "_id": 3, "color": "blue" }
    ];
    const data = [
        {
            // _id is created by instance
            "title" : "New Post",
            "uploader" : "your.mom@school",
            "content" : "lor^em ipsum",
            "link" : 'https://havibeenpwnd.com/',
            "tags" : "sch$ool",
            "category" : "",
            "type" : "resource",
            "anonymous" : false,
            // pending is added by instance
        }
    ];
    const maliciousData = [
        {
            // _id is created by instance
            "ti(tle" : "New Post",
            "uplo&ader" : "your.mom@school",
            "co!nte$nt" : "lor^em ipsum",
            "li*nk" : 'https://havibeenpwnd.com/',
            "t)ags" : "sch$ool",
            "cate.gory" : "",
            "ty#pe" : "resource",
            "anon@ymous" : false,
            // pending is added by instance
        }
    ];

    let params = {title: "New Post"};

    beforeEach(() => {
        instance = new Database("Posts", "limbo");
    });

    afterEach(async () => {
        instance = null;
        const client = new MongoClient('mongodb://localhost:27017');
        try{
            await client.connect();
            await client.db("Posts").collection("limbo").deleteMany(params);
            await client.db("Posts").collection("limbo").deleteMany({"color" : "red"});
            await client.db("Posts").collection("limbo").deleteMany({"color" : "purple"});
        } catch (e) {
            console.log(`No deletions performed. Encountered error:\n${e}`);
        } finally {
            client.close();
        }
    });

    test('Instance accepts correct args to be pushed', async () => {
        await instance.push(data);
        expect(instance.getErrorMsg()).toBeNull();
        
        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.push([]);
        expect(instance.getErrorMsg()).toMatch(new RegExp('No entries to add'));

        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.push("data!");
        expect(instance.getErrorMsg()).toMatch(new RegExp('incorrect type'));
    });

    test('Instance can push an entry successfully', async () => {
        await instance.push(data);
        expect(instance.getErrorMsg()).toBeNull();
        expect(instance.getPayload()).toHaveLength(1);
        expect(instance.getPayload()[0].insertedCount).toBe(1);
        expect(instance.getPayload()[0].acknowledged).toBeTruthy();
        
        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.pull(params);
        expect(instance.getPayload()).toContainEqual(data[0]);
    });
    
    test('Instance can handle failing on a push', async () => {
        await instance.push(badData);
        expect(instance.getErrorMsg()).toMatch(new RegExp("error"));

    });

});
