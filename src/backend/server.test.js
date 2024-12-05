// ### NOTE: TEST modules that I might wanna use!
// # toHaveBeenCalledWith(arg,...) == toBeCalledWith()
//  - ensure mock function called with specific args
// # toHaveBeenCalled() == toBeCalled()
//  - ensures mock function has been called AT LEAST once
// # toHaveBeenCalledTimes(int) == toBeCalledTimes(int)
//  - ensures mock function is called int number of times
// # toBeCloseTo(number, digits)
//  - compares float number to a digits number of decimal places
// # toBe[Greater,Less]Than(OrEqual)(nmber | bigint)
//  - compares to number and/or bigint as Large integer
// # toBeInstanceOf(Class)
//  - checks that an object is an instance of Class
// # toContain(Equal)(item)
//  - checks that item is in found array
//  - toContainEqual can check that items within a structure is in found array
// # toMatchObject(Object)
//  - checks received JS object matches subset of properties Object
//  - Matches properties NOT in expected Object
// ! toThrow(error)
//  - tests that error is thrown
//  - must be wrapped in function, and is tested with expect(function).toThrow()
//  - error can be matched with RegExp, regex, or wholly
//
// ### Async matchers. Can be used in ones above, or conventional expect().toBe()
// # expect.anything()
//  - matches all but null or undefined
// # expect.any(constructor)
//  - matches anything created with given constructor
// # expect.arrayContaining(arr)
//  - checks that received arrray contains all elements in arr
//  - arr is NOT subset of array
// # closeTo(float, digits)
//  - like toBeCloseTo()
//
// ### Assertion count. For Asyncronous tests. 
// # expect.assertions(int)
//  - Good to verify assertions in a callback are actually called, int times.
//
// ### Extend Utilities. Good extending comparison features to user-defined stuff
// # expect.addEqualityTesters(testers)
//  - add my own methods to test if unique objects, values, etc. are equal

const Database = require('./utils.js');
describe('Testing Database Instance construction', () => {
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
    
    // TODO: Modify Database object
    // class encounters some error and handles it gracefully

    // NOTE: Do we wanna restrict from admin/users??? 
    // optionally: how would we do that if we spawn instances for those sensitive DBs?
    test('DB instance requires specifying collection', () => {
        console.log("Essentially, restrict instance from initializing admin DB");
        function alice() {
            let instance = new Database("admin");
            instance.pull({},{});
        }
        expect(alice).toThrow(); // throw error that it needs a collection specified
    });

    test('DB instance spawing new DB is unacceptable', () => {
        console.log("Basically so users can't maliciously add DBs like \"Admin\"");
        function alice() {
            let instance = new Database("Admin");
            instance.pull({},{});
        }
        expect(alice).toThrow(); // throw error that it needs a collection specified
    });

    test('DB instance spawing new collection is unacceptable', () => {
        console.log("Basically so users can't malicioulsy insert sollections or query DB admin by adding collections");
        function alice() {
            let instance = new Database("admin");
            instance.pull({},{});
        }
        expect(alice).toThrow(); // throw error that it needs a collection specified
    });
});

describe('Testing Database Instance pulling', () => {
    // Now Construction has been handled, we will now test Getting/Setting!
    let instance;
    beforeAll(async () => {
        // assuming limbo, since that's where all posts go and what admins will use to vett
        instance = new Database("Posts", "limbo");
    });

    afterEach(async () => {
        instance = null;
    });

    test("Instance getter for payload works", async () => {
        expect(instance.getPayload()).toStrictEqual([]);
    });

    // Test find() succeeds
    test("Instance can pull all data from database", async () => {
        await instance.pull({}, {});
        expect(instance.getPayload()).toHaveLength(22);
    });

    test("Pull aspects that will be displayed", async () => {
        await instance.pull({}, {id : 0});
        // TODO: resources and advice db's DO NOT retrieve objects with field _id
        expect(instance.getPayload()[0]).not.toHaveProperty('_id');
    });

    // Test find() fields with keywords
    test("Yes data with acceptable of fields we want to search", async () => {
        await instance.pull({tag : "Academic"},{});
        expect(instance.getPayload().length).toBeGreaterThan(0);
    });

    test("No data with acceptable of fields but unacceptable search", async () => {
        await instance.pull({tag : "aaah"},{});
        expect(instance.getPayload()).toBeLength(0);
    });

    test("Instance rejects pulls trying fields we don't wanna search", async () => {
        function alice() {
            instance.pull({thingy: "aah"},{});
        }
        expect(alice).toThrow();
    });

    // Test find() fields with indexing 
    test("Instance pulls data with acceptable indexing and fields", async () => {
        await instance.pull({$text : {$search: "thing"}},{});
        expect(instance.getPayload().length).toBeGreaterThanOrEqual(0);
    });

    test("Instance pulls rejects malicious indexing or indexing unset/unacceptable fields, collections, DBs", async () => {
        function alice() { // TODO: Modify to try and query fields I haven't set to index
            instance.pull({$text : {$search: "aah"}})
        }
        expect(alice()).toThrow();
    });

});

describe('Testing Database Instance pushing', () => {
    console.log("TODO: Write pushing method!");
    // TODO: Test add() success
    // TODO: Test add() fail

    // TODO: Test timeout/retry details
    // - should this go in Database, or server?

    // TODO: test email validation success
    // TODO: test email validation fail
});

describe("Testing Database Instance Post editing", () => {
    console.log("TODO: Write editing method");
    // TODO: test edit() success
    // TODO: test edit() fail
});

describe("Testing Database Delete", () => {
    console.log("TODO: Write delete methods");
    // TODO: test del() success
    // TODO: test del() fail
});

// TODO: Server.js
// - accepts requests ONLY to resources, advice, and limbo
// - throws error 404 for ALL others
// - throws errors in the event Database fails
// - when write is implemeneted
//   - validate/sanitize/ handle user input data
//   - Might be where I do my verification with email, sanitized content, and ObjectId

describe('Handling GET requests', () => {
    const get = require('./server').handleQuery;
    var server;

    beforeEach(async () => {
        // remove all trace of old imports from server.js
        delete require.cache[require.resolve('./server')];
        // imports server variable that is our instance
        server = require('./server').server;
    });

    afterEach(async () => {
        server.close(); // close server instance after each test
    });

    test('Accept connection for resource posts', async () => {
        const instance = new Database("Posts","resources");
        const posts = await get("/api/resources", instance);
        console.log(posts);
    });

    test('Accept connection for limbo posts', async () => {
        const instance = new Database("Posts","limbo");
        const posts = await get("/api/limbo", instance);
        console.log(posts);
        expect(posts).toHaveLength(22);
    });
    
    test('Accept connection for advice posts', async () => {
        const instance = new Database("Posts","advice");
        const posts = await get("/api/limbo", instance);
        console.log(posts);
        expect(posts).toHaveLength(22);
    });
});

describe("Handling POST requests", () => {
    var server;

    beforeEach(async () => {
        // remove all trace of old imports from server.js
        delete require.cache[require.resolve('./server')];
        // imports server variable that is our instance
        server = require('./server').server;
    });

    afterEach(async () => {
        server.close(); // close server instance after each test
    });

    console.log("TODO: Write POST requests!");
});
