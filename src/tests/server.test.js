// TEST goals:
// x Server can accept GET with explicit routes, ignoring all others
// x Server can provide JSON responses to GET requests
// Server can properly sanitize query parameters as GET headers
// Server can properly accept POST requests to explicit routes, ignoring others
// Server can properly respond to POST requests
// Server can provide JSON responses to POST requests
// Server properly sanitizes POST data
// Server can handle Instance failure and share failure with client via JSON format

describe('Handling GET requests', () => {
    const request = require("supertest");
    const express = require("express");
    const queries = require('./backend/queries');

    var server;
    const app = express();
    app.use('/api', queries);

    app.use(function(req, res, next) {
        res.status(404).json({message: "Error 404: Not found"});
        console.log(`Server: User attempted to access ${req.url}`);
    });

    beforeEach(async () => {
        // remove all trace of old imports from server.js
        delete require.cache[require.resolve('./server')];
        // imports server variable that is our instance
        server = require('./backend/server').server;
    });

    afterEach(async () => {
        server.close(); // close server instance after each test
    });

    test('Accept GET for resource posts', async () => {
        const res = await request(app).get('/api/resources');
        expect(res.headers['content-type']).toMatch(RegExp('json'));
        expect(res.status).toBe(200);
        expect(res._body.message).toMatch(RegExp("posts incoming!"));
        expect([...res._body.payload].length).toBeGreaterThan(0);
    });

    test('Accept GET for limbo posts', async () => {
        const res = await request(app).get('/api/limbo');
        expect(res.headers['content-type']).toMatch(RegExp('json'));
        expect(res.status).toBe(200);
        expect(res._body.message).toMatch(RegExp("posts incoming!"));
        expect([...res._body.payload].length).toBeGreaterThan(0);
    });

    test('Accept GET for advice posts', async () => {
        const res = await request(app).get('/api/advice');
        expect(res.headers['content-type']).toMatch(RegExp('json'));
        expect(res.status).toBe(200);
        expect(res._body.message).toMatch(RegExp("posts incoming!"));
        expect([...res._body.payload].length).toBeGreaterThan(0);
    });

    test('Rejects all other GETs', async () => {
        let res = await request(app).get('/api/admin');
        expect(res.headers['content-type']).toMatch(RegExp('json'));
        expect(res.status).toBe(404);

        res = await request(app).get('/api/Admin');
        expect(res.headers['content-type']).toMatch(RegExp('json'));
        expect(res.status).toBe(404);

        res = await request(app).get('/api/fdsa');
        expect(res.headers['content-type']).toMatch(RegExp('json'));
        expect(res.status).toBe(404);
    });
});

// TODO: test for user access when trying to load DB

describe("Handling POST requests", () => {
    // const request = require("supertest");
    // var server;

    // beforeEach(async () => {
    //     // remove all trace of old imports from server.js
    //     delete require.cache[require.resolve('./server')];
    //     // imports server variable that is our instance
    //     server = require('./server').server;
    // });

    // afterEach(async () => {
    //     server.close(); // close server instance after each test
    // });

});
