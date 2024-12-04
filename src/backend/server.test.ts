const handleQuery = require('./server');
const Database = require('./utils.js');

describe('Creating an instance object', () => {
    test('Creating resources DB instance', () => {
        const instance = new Database("Posts", "resources");
        expect(instance.uri).toMatch("mongodb://localhost:27017"); // checking strings
        expect(instance.dbName).toMatch("Posts");
        expect(instance.collName).toMatch("resources");
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

describe('properly handles GET request', () => {
    // Might want to do build/teardown per test
    test('Accept connection for resource posts', () => {

    });
});
