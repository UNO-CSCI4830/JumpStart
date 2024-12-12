const { addEntries, getEntries, deleteEntries, lookEntries } = require('../backend/loadDB');

// Mocking MongoDB Client
jest.mock('mongodb', () => {
    // Creating mock Mongoclient with mock methods
    const mockMongoClient = {
        db: jest.fn().mockReturnValue({
            collection: jest.fn().mockReturnValue({
                deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 })  // Mock successful deletion
                //deleteMany: jest.fn().mockRejectedValue(new Error('Database Error')) - simulate a database error
            }),
        }),
        close: jest.fn(), // Mock close method
        connect: jest.fn().mockResolvedValue(this), // Mock connection to the database
    };

    // Return mocked MongoClient
    return { MongoClient: jest.fn(() => mockMongoClient) };
});


describe('Database Functions', () => {

    // Testing adding multiple documents into the collection with addEntries
    test('addEntries adds multiple documents to the collection', async () => {
        const mockCollection = {
            insertMany: jest.fn().mockResolvedValue({ acknowledged: true, insertedCount: 2 }),
        };

        await addEntries(mockCollection, [{ name: 'Test1' }, { name: 'Test2' }]);
        expect(mockCollection.insertMany).toHaveBeenCalledWith([{ name: 'Test1' }, { name: 'Test2' }]);
    });

    // Testing adding entries with empty input with addEntries
    test('addEntries handles empty input', async () => {
        const mockCollection = {
            insertMany: jest.fn().mockResolvedValue({ acknowledged: true, insertedCount: 0 }),
        };

        const result = await addEntries(mockCollection, []);
        expect(mockCollection.insertMany).toHaveBeenCalledWith([]);
        expect(result).toBeUndefined();  // No entries inserted
    });

    // Tesing for handling invalid data within the addEntries
    test('addEntries handles invalid data', async () => {
        const mockCollection = {
            insertMany: jest.fn().mockResolvedValue({ acknowledged: false, insertedCount: 0 }),
        };

        const result = await addEntries(mockCollection, [{ name: '' }]);  // Invalid data
        expect(mockCollection.insertMany).toHaveBeenCalledWith([{ name: '' }]);
        expect(result).toBeUndefined();  // Expect no result due to validation failure
    });

    // Testing retrieving documents using getEntries
    test('getEntries retrieves documents from the collection', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([{ _id: 1, name: 'Test' }]),
            }),
        };

        const result = await getEntries(mockCollection);
        expect(result).toEqual([{ _id: 1, name: 'Test' }]);
    });

    // Testing no matching results with getEntries
    test('getEntries handles no matching results', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([]),  // No results
            }),
        };

        const result = await getEntries(mockCollection);
        expect(result).toEqual([]);  // No entries found
    });

    // Testing invalid entries with getEntries
    test('getEntries handles invalid query', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Invalid Query')),  // Simulate error
            }),
        };

        try {
            await getEntries(mockCollection);
        } catch (error) {
            expect(error.message).toBe('Invalid Query');
        }
    });

    // Testing deleting documents from the collection with deleteEntries
    test('deleteEntries deletes documents from the collection', async () => {
        const mockCollection = {
            deleteMany: jest.fn().mockResolvedValue({ deletedCount: 2 }),
        };

        const result = await deleteEntries(mockCollection, { status: 'pending' });
        expect(mockCollection.deleteMany).toHaveBeenCalledWith({ status: 'pending' });
        expect(result.deletedCount).toBe(2);  // Ensure two entries were deleted
    });

    // Testing no matches with deleteEntries
    test('deleteEntries handles no matching entries', async () => {
        const mockCollection = {
            deleteMany: jest.fn().mockResolvedValue({ deletedCount: 0 }),  // No documents deleted
        };

        const result = await deleteEntries(mockCollection, { status: 'nonexistent' });
        expect(result.deletedCount).toBe(0);  // No entries deleted
    });

    // Testing database error with deleteEntries
    test('deleteEntries handles database error', async () => {
        const mockCollection = {
            deleteMany: jest.fn().mockRejectedValue(new Error('Database Error')),  // Simulate deletion failure
        };

        try {
            await deleteEntries(mockCollection, { status: 'pending' });
        } catch (error) {
            expect(error.message).toBe('Database Error');
        }
    });

    // Testing looking up entries with specific criteria with lookEntries
    test('lookEntries retrieves documents with specific criteria', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([{ _id: 1, name: 'Test' }]),
            }),
        };

        const result = await lookEntries(mockCollection, { name: 'Test' });
        expect(result).toEqual([{ _id: 1, name: 'Test' }]);
    });

    // Testing no matches found with lookEntries
    test('lookEntries handles no matching entries', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([]),  // No results
            }),
        };

        const result = await lookEntries(mockCollection, { name: 'Nonexistent' });
        expect(result).toEqual([]);  // No entries found
    });

    // Testing for invalid query criteria with lookEntries
    test('lookEntries handles invalid query criteria', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error('Invalid Query Criteria')),  // Simulate error
            }),
        };

        try {
            await lookEntries(mockCollection, { invalidField: 'value' });
        } catch (error) {
            expect(error.message).toBe('Invalid Query Criteria');
        }
    });

    // Testing large data input with addEntries
    test('addEntries handles large data input', async () => {
        const largeData = new Array(1000).fill({ name: 'Test' });
        const mockCollection = {
            insertMany: jest.fn().mockResolvedValue({ acknowledged: true, insertedCount: 1000 }),
        };

        await addEntries(mockCollection, largeData);
        expect(mockCollection.insertMany).toHaveBeenCalledWith(largeData);
    });

    // Testing multiple errors with addEntries
    test('addEntries handles multiple errors', async () => {
        const mockCollection = {
            insertMany: jest.fn().mockRejectedValue(new Error('Multiple Errors Occurred')),
        };

        try {
            await addEntries(mockCollection, [{ name: 'Test' }]);
        } catch (error) {
            expect(error.message).toBe('Multiple Errors Occurred');
        }
    });

    // Testing network failure with addEntries
    test('addEntries handles network failure', async () => {
        const mockCollection = {
            insertMany: jest.fn().mockRejectedValue(new Error('MongoNetworkError: failed to connect')),
        };

        try {
            await addEntries(mockCollection, [{ name: 'Test' }]);
        } catch (error) {
            expect(error.message).toBe('MongoNetworkError: failed to connect');
        }
    });

    // Testing deleted count with deletedEntries
    test('deleteEntries returns correct deleted count', async () => {
        const mockCollection = {
            deleteMany: jest.fn().mockResolvedValue({ deletedCount: 3 }),
        };

        const result = await deleteEntries(mockCollection, { status: 'pending' });
        expect(result.deletedCount).toBe(3);
    });

    // Testing handling invalid query with lookEntries
    test('lookEntries handles invalid query argument', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([]),
            }),
        };

        const result = await lookEntries(mockCollection, null);
        expect(result).toEqual([]);
    });

    // Testing looking up entries with partical keywork match with lookEntries
    test('lookEntries retrieves documents with partial keyword match', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([
                    { _id: 1, name: 'Test One' },
                    { _id: 2, name: 'Test Two' }
                ]),  // Matching the partial "Test"
            }),
        };
    
        const result = await lookEntries(mockCollection, { name: 'Test' });
        expect(result).toEqual([
            { _id: 1, name: 'Test One' },
            { _id: 2, name: 'Test Two' }
        ]);
    });
    
    // Testing case-insensitive partical matches with lookEntries
    test('lookEntries handles case-insensitive partial match', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([
                    { _id: 1, name: 'Test One' },
                    { _id: 2, name: 'test two' }
                ]),  // Case-insensitive matching "test"
            }),
        };
    
        const result = await lookEntries(mockCollection, { name: 'test' });
        expect(result).toEqual([
            { _id: 1, name: 'Test One' },
            { _id: 2, name: 'test two' }
        ]);
    });
    
    // Testing empty string match with lookEntries
    test('lookEntries handles empty string match', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([]),  // No results
            }),
        };
    
        const result = await lookEntries(mockCollection, { name: '' });
        expect(result).toEqual([]);  // No matching entries
    });
    
    // Testing invalid or missing query with lookEntries
    test('lookEntries handles invalid or missing query', async () => {
        const mockCollection = {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([]),  // No results
            }),
        };
    
        try {
            await lookEntries(mockCollection, { name: null });
        } catch (error) {
            expect(error.message).toBe('Invalid Query Criteria');
        }
    });
    
});
    