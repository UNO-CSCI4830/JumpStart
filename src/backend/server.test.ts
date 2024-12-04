

describe('Creating an instance object', () => {
    const Database = require('./utils.js');
    test('Creating resources DB instance', () => {
        const intent = {
            uri : "mongodb://localhost:27017",
            dbName : "Posts",
            collName : "resources",
        }
        const instance = new Database("Posts", "resources");
        expect(instance.uri).toMatch(intent.uri); // checking strings
        expect(instance.dbName).toMatch(intent.dbName);
        expect(instance.collName).toMatch(intent.collName);
        expect(instance.payload.length).toBe(0); // Checking array initialized as empty
        expect(instance.payload).toBeDefined(); // array must be defined
        expect(instance.errorStack).toBeNull(); // Checking error
    });
    // since the test passed, may wanna do build/teardown per test
});
// TODO: Database object
// class uses find() to fill payload
// class encounters some error and handles it gracefully
// Could be cool to test that the timeouts/retries works properly (IDK if that even should exist in Database(), or if that goes into server.js)
// when write is implemented, make sure it accepts sanitized strings
//   - must also write to limbo and limbo ONLY
//   - must also have an email, and a valid ObjectId that doesn't match others

// TODO: Server.js
// - accepts requests ONLY to resources, advice, and limbo
// - throws error 404 for ALL others
// - throws errors in the event Database fails
// - when write is implemeneted
//   - validate/sanitize/ handle user input data
//   - Might be where I do my verification with email, sanitized content, and ObjectId

describe('Handling GET requests', () => {
    const get = require('./server').handleQuery;
    const Database = require('./utils.js');
    var server;
    beforeAll(() => {
        resources = new Database("Posts","resources");
    });

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
        const get = await handleQuery("/api/resources", resources);
        console.log(get);
        // await expect(handleQuery("/api/admin", resources)).rejects.toBe("failure");
    });
});
