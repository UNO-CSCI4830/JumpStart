// TEST Goals:
// x Instance can be loaded without issue
// x Instance can access be loaded and fail gracefully when missing parameters
// x Instance can pull from database with valid parameters
// x Instance can properly modify its attributes
// Instance can perform operations according to assigned instance permissions
// Instance can push to database with valid, sanitized data
// Instance can properly delete existing data
// Instance can gracefully handle invalid fields
// Instance can gracefully handle invalid indexing
// Instance can gracefully handle malicious indexing

// TODO: Test timeout/retry details???
// - should this go in Database, or server?

// TODO: test email validation success
// TODO: test email validation fail

// TODO: ADD TEST TO HANDLE SUCCESS/FAIL BASED OFF PERMISSION PROFILE

const Database = require('./utils.js').Instance;
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
        expect(instance.getErrorMsg()).toMatch(new RegExp("Error"), new RegExp("collection"));
    });
});


describe('Testing Instance operations', () => {
    // Now Construction has been handled, we will now test Getting/Setting!
    let instance;
    beforeEach(() => {
        // assuming limbo, since that's where all posts go and what admins will use to vett
        instance = new Database("Posts", "limbo");
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
        await instance.pull({}, {});
        expect(instance.getPayload()).toHaveLength(22);
    });

    test("Instance pulls correct fields to be displayed", async () => {
        await instance.pull({}, {_id : 0});
        expect(instance.getPayload()[0]).not.toHaveProperty('_id');
    });

    // Test find() fields with keywords
    test("Yes data with acceptable terms for acceptable fields", async () => {
        await instance.pull({tags : "Study tips"},{});
        expect(instance.getPayload().length).toBeGreaterThan(0);
        
        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.pull({category : "Academic"},{});
        expect(instance.getPayload().length).toBeGreaterThan(0);
    });

    test("No data with acceptable of fields but unacceptable search", async () => {
        await instance.pull({tags : "study tips"},{});
        expect(instance.getPayload()).toHaveLength(0);

        await new Promise(r => setTimeout(r, 50)); // sleep

        await instance.pull({category : "academic"},{});
        expect(instance.getPayload()).toHaveLength(0);

        await instance.pull({Cateogory : "aah"},{});
        expect(instance.getPayload()).toHaveLength(0);

        await instance.pull({tag : "aah"},{});
        expect(instance.getPayload()).toHaveLength(0);
    });
    // TODO: Throw some mockCollection stuff in here to simulate errors to handle!
    // - Refer to Yolvin's unittests
});

// Mocking MongoDB Client
jest.mock('mongodb', () => {
    // Creating mock Mongoclient with mock methods
    const mockMongoClient = {
        db: jest.fn().mockReturnValue({ // Define a mock DB
            collection: jest.fn().mockReturnValue({ // Define a mock collection
                // deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 })  // Mock successful deletion
                //deleteMany: jest.fn().mockRejectedValue(new Error('Database Error')) - simulate a database error. Might be good to see what kind of errors I need to catch!
            }),
        }),
        close: jest.fn(), // Mock close method
        connect: jest.fn().mockResolvedValue(this), // Mock connection to the database
    };

    // Return mocked MongoClient
    return { MongoClient: jest.fn(() => mockMongoClient) };
});
// TODO: See if I can integrate mock MongoDB client to emulate a DB error

describe('Testing Database Instance pushing', () => {
    test('Instance accepts the proper format for entry', async () => {
        //TODO: THIS IS IMPORTANT NOT TO SKIP!!
    });

    // TODO: Test push() success
    test('Instance can push a fresh entry successfully', async () => {
        const mockCollection = {
            insertMany : jest.fn().mockResolvedValue({aknowledged: true, insertedCount: 1}), // Simulates one entry to be successfully added
        };

        result = await addEntries(mockCollection, []);
        expect(mockCollection.insertMany).toHaveBeenCalledWith([]); // guessing this confirms insertMany was actually called
        expect(result).toBe(1); // B/c insertedCount = 1;
    });
    
    // TODO: Test push() fail
    test('Instance can handle failing on a push', async () => {
    });

});

describe("Testing Database Delete", () => {
    // TODO: test del() success
    test('Instance can successfully delete an object', async () => {
        const mockCollection = {
            insertMany : jest.fn().mockResolvedValue({aknowledged: true, insertedCount: 1}), // Simulates one entry to be successfully added
            deleteMany : jest.fn().mockResolvedValue({deletedCount : 2}),
        };

        const result = await deleteEntries(mockCollection, {status: 'pending'});
        expect(mockCollection.deleteMany).toHaveBeenCalledWith({status: 'pending'});
        expect(result.deletedCount).toBe(2); // since we called mockCollection call which has an assigned count of 2
    });
    
    // TODO: test del() fail
    test('Instance can gracefully handle a deletion error', async () => {
    });
});
